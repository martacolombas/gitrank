import React, { useState } from 'react';
import cx from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import './Dashboard.css';
import PrList from '../PrList/PrList';
import { GET_PRS } from '../../ApiClient/ApiClient';
import Filter from '../Filter/Filter';
import { groupPRs, filterById } from './utils';
import TransitionPage from '../TransitionPage/TransitionPage';
import Sidebar from '../Sidebar/Sidebar';

library.add(fas);

function Dashboard({ className, username }) {
	// COMPONENT STATE
	const [pinnedItems, setPinnedItems] = useState(
		localStorage.getItem('pinnedItems')
			? JSON.parse(localStorage.getItem('pinnedItems'))
			: []
	);
	const [selectedAuthors, setSelectedAuthors] = useState(
		localStorage.getItem('selectedAuthors')
			? JSON.parse(localStorage.getItem('selectedAuthors'))
			: []
	);
	const [selectedRepos, setSelectedRepos] = useState(
		localStorage.getItem('selectedRepos')
			? JSON.parse(localStorage.getItem('selectedRepos'))
			: []
	);

	let filteredIds = [];
	if (Array.isArray(selectedAuthors) && Array.isArray(selectedRepos)) {
		if (selectedAuthors.length && selectedRepos.length) {
			filteredIds = [...selectedAuthors, ...selectedRepos].map(
				element => {
					return element.prId;
				}
			);
		} else if (selectedAuthors.length) {
			filteredIds = [...selectedAuthors].map(element => {
				return element.prId;
			});
		} else if (selectedRepos.length) {
			filteredIds = [...selectedRepos].map(element => {
				return element.prId;
			});
		}
	}

	// API CALLS
	const { loading, data, error } = useQuery(GET_PRS, {
		variables: {
			login: `${username}`,
		},
		// pollInterval: 40000, //todo uncomment
	});

	// DATA ORDERING AND MANIPULATION - ALL PRS

	const allPRs = data ? groupPRs(data) : [];

	const allAuthors = allPRs.map(element => {
		return {
			id: element.author.id,
			username: element.author.login,
			prId: element.id,
		};
	});
	const allRepos = allPRs.map(element => {
		return {
			id: element.repository.id,
			nameWithOwner: element.repository.nameWithOwner,
			prId: element.id,
		};
	});

	// FILTER OPTIONS
	let authorsOptions = [];
	let filteredAuthorOptions = [];

	authorsOptions = allAuthors.map(element => {
		return {
			value: element.id,
			label: element.username,
			prId: element.prId,
		};
	});

	if (filteredIds.length) {
		filteredAuthorOptions = authorsOptions.filter(
			element => !filteredIds.includes(element.prId)
		);
	} else {
		filteredAuthorOptions = [...authorsOptions];
	}

	let reposOptions = [];
	let filteredReposOptions = [];

	reposOptions = allRepos.map(element => {
		return {
			value: element.id,
			label: element.nameWithOwner,
			prId: element.prId,
		};
	});
	if (filteredIds.length) {
		filteredReposOptions = reposOptions.filter(
			element => !filteredIds.includes(element.prId)
		);
	} else {
		filteredReposOptions = [...reposOptions];
	}

	// ERROR AND LOADING HANDLING

	if (error) {
		console.error(error);
		return (
			<TransitionPage
				src='https://octodex.github.com/images/deckfailcat.png'
				children='Something went wrong fetching your Prs... '
			/>
		);
	}

	if (loading) {
		return (
			<TransitionPage
				src='https://octodex.github.com/images/hula_loop_octodex03.gif'
				children='Fetching your PRs...'
			/>
		);
	}

	// FINAL PRS SELECTION
	const filteredByIds = filterById(allPRs, filteredIds);

	const notPinned = filteredByIds.filter(
		element => !pinnedItems.includes(element.id)
	);
	const pinned = filteredByIds.filter(element =>
		pinnedItems.includes(element.id)
	);
	const prs = [...pinned, ...notPinned];

	return (
		<div className={cx('Dashboard', className)}>
			<Sidebar
				className='Dashboard-sidebar'
				content={
					<>
						<Filter
							options={filteredAuthorOptions}
							className='Dashboard-filter'
							value={selectedAuthors}
							placeholder='Select authors..'
							onChange={value => {
								setSelectedAuthors(value);
								localStorage.setItem(
									'selectedAuthors',
									JSON.stringify(value)
								);
							}}
						/>
						<Filter
							options={filteredReposOptions}
							className='Dashboard-filter'
							value={selectedRepos}
							placeholder='Select your repos...'
							onChange={value => {
								setSelectedRepos(value);
								localStorage.setItem(
									'selectedRepos',
									JSON.stringify(value)
								);
							}}
						/>
					</>
				}
			/>
			<div className='Dashboard-content'>
				<div className='Dashboard-title'>Your PRs dashboard</div>
				{prs.length ? (
					<PrList
						prs={prs}
						setPinnedItems={setPinnedItems}
						className={'Dashboard-list'}
					/>
				) : (
					<TransitionPage
						className='Dashboard-list'
						image='https://octodex.github.com/images/monroe.jpg'
						children={'No open Prs 🎵'}
					/>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
