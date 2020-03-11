import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import './Dashboard.css';
import PrList from '../PrList/PrList';
import { GET_PRS, GET_REPOS, GET_AUTHORS } from '../../ApiClient/ApiClient';
import Filter from '../Filter/Filter';
import { groupPRs, filterByRepos, groupAllRepos } from './utils';
import TransitionPage from '../TransitionPage/TransitionPage';
import Feedback from '../Feedback/Feedback';
import Sidebar from '../Sidebar/Sidebar';

library.add(fas);

function Dashboard({ className, username, offline }) {
	// STATES
	const [pinnedItems, setPinnedItems] = useState(
		localStorage.getItem('pinnedItems')
			? JSON.parse(localStorage.getItem('pinnedItems'))
			: []
	);
	const [selectedRepos, setSelectedRepos] = useState(
		localStorage.getItem('selectedRepos')
			? JSON.parse(localStorage.getItem('selectedRepos'))
			: []
	);
	const [selectedAuthor, setSelectedAuthor] = useState(
		localStorage.getItem('selectedAuthor')
			? JSON.parse(localStorage.getItem('selectedAuthor'))
			: []
	);

	// API CALLS
	const { loading, data, error } = useQuery(GET_PRS, {
		variables: {
			login: `${username}`,
		},
		// pollInterval: 40000, //todo uncomment
	});

	const {
		loading: reposLoading,
		data: reposData,
		error: reposError,
	} = useQuery(GET_REPOS, {
		variables: {
			login: `${username}`,
		},
	});

	const {
		loading: authorsLoading,
		data: authorsData,
		error: authorsError,
	} = useQuery(GET_AUTHORS, {
		variables: {
			login: `${username}`,
		},
	});

	// FILTER OPTIONS
	let options = [];
	let authorOptions = [];

	if (reposData) {
		options = groupAllRepos(reposData).map(element => {
			return {
				value: element.id,
				label: element.nameWithOwner,
			};
		});
	}

	if (authorsData) {
		authorOptions = groupPRs(authorsData)
			.map(element => {
				return {
					value: element.author.id,
					label: element.author.login,
				};
			})
			.reduce((acc, current) => {
				const x = acc.find(item => item.value === current.value);
				if (!x) {
					return acc.concat([current]);
				} else {
					return acc;
				}
			}, []);
	}

	// TRANSITION PAGES
	if (error || authorsError || reposError) {
		localStorage.getItem('token') && localStorage.removeItem('token');
		localStorage.getItem('username') && localStorage.removeItem('username');
		console.error(error);
		return (
			<TransitionPage
				src='https://octodex.github.com/images/deckfailcat.png'
				children='Something went wrong fetching your PRs... Please, refresh the page'
			/>
		);
	}

	if (loading || authorsLoading || reposLoading) {
		return (
			<TransitionPage
				src='https://octodex.github.com/images/hula_loop_octodex03.gif'
				children='Fetching your PRs...'
			/>
		);
	}

	// DATA MANIPULATION -PRS
	const allPRs = data ? groupPRs(data) : [];
	const filteredByRepos = filterByRepos(
		allPRs,
		selectedRepos,
		selectedAuthor
	);

	const notPinned = filteredByRepos.filter(
		element => !pinnedItems.includes(element.id)
	);
	const pinned = filteredByRepos.filter(element =>
		pinnedItems.includes(element.id)
	);
	const prs = [...pinned, ...notPinned].sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	return (
		<div className={cx('Dashboard', className)}>
			<Sidebar
				className='Dashboard-sidebar'
				content={
					<>
						{
							<Filter
								options={authorOptions}
								className='Dashboard-filter'
								value={selectedAuthor}
								placeholder='Select the PR author'
								onChange={value => {
									setSelectedAuthor(value);
									localStorage.setItem(
										'selectedAuthor',
										JSON.stringify(value)
									);
								}}
							/>
						}
						<Filter
							options={options}
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
						<Feedback />
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
