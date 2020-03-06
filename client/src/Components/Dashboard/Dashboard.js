import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import './Dashboard.css';
import PrList from '../PrList/PrList';
import { GET_PRS, GET_REPOS } from '../../ApiClient/ApiClient';
import Filter from '../Filter/Filter';
import { groupPRs, filterByRepos, groupAllRepos } from './utils';
import TransitionPage from '../TransitionPage/TransitionPage';

library.add(fas);

function Dashboard({ className, username }) {
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
	const [selectedOwner, setSelectedOwner] = useState(
		localStorage.getItem('selectedOwner')
			? JSON.parse(localStorage.getItem('selectedOwner'))
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

	// FILTER OPTIONS
	let options = [];
	let allOptions = [];
	let ownerOptions = []; // this variable is necessary to filter options (above) by owner
	let authors = [];

	if (reposData) {
		allOptions = groupAllRepos(reposData).map(element => {
			return {
				value: element.id,
				label: element.nameWithOwner,
				ownerId: element.owner.id,
				login: element.owner.login,
			};
		});

		ownerOptions = Array.from(
			new Set(allOptions.map(element => element.ownerId))
		).map(id => {
			return {
				value: id,
				label: allOptions.find(element => element.ownerId === id).login,
			};
		});
	}

	// TRANSITION PAGES
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

	// DATA MANIPULATION -OPTIONS
	if (selectedOwner && selectedOwner.length) {
		const selectedIds = selectedOwner.map(element => element.value);
		options = allOptions.filter(element =>
			selectedIds.includes(element.ownerId)
		);
	} else {
		options = [...allOptions];
	}

	// DATA MANIPULATION -PRS
	const allPRs = data ? groupPRs(data) : [];
	const filteredByRepos = filterByRepos(allPRs, selectedRepos);

	const notPinned = filteredByRepos.filter(
		element => !pinnedItems.includes(element.id)
	);
	const pinned = filteredByRepos.filter(element =>
		pinnedItems.includes(element.id)
	);
	const prs = [...pinned, ...notPinned];

	// DATA MANIPULATION AUTHORS
	if (data) {
		console.log('allPrs :', allPRs);
		authors = allPRs.map(element => {
			return {
				a: 'hello',
			};
		});
	}

	return (
		<div className={cx('Dashboard', className)}>
			<div className='Dashboard-title'>Your PRs dashboard</div>
			<div className='Dashboard-navBar'>
				<Filter
					options={ownerOptions}
					className='Dashboard-filter'
					value={selectedOwner}
					placeholder='Select the owner'
					onChange={value => {
						setSelectedOwner(value);
						localStorage.setItem(
							'selectedOwner',
							JSON.stringify(value)
						);
					}}
				/>
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
			</div>
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
	);
}

export default Dashboard;
