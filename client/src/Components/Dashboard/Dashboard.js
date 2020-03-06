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

	let options = [];

	if (reposData) {
		options = groupAllRepos(reposData).map(element => {
			return { value: element.id, label: element.nameWithOwner };
		});
	}

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

	const allPRs = data ? groupPRs(data) : [];
	const filteredByRepos = filterByRepos(allPRs, selectedRepos);

	const notPinned = filteredByRepos.filter(
		element => !pinnedItems.includes(element.id)
	);
	const pinned = filteredByRepos.filter(element =>
		pinnedItems.includes(element.id)
	);
	const prs = [...pinned, ...notPinned];

	return (
		<div className={cx('Dashboard', className)}>
			<div className='Dashboard-title'>Your PRs dashboard</div>
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
			<PrList
				prs={prs}
				setPinnedItems={setPinnedItems}
				className={'Dashboard-list'}
			/>
		</div>
	);
}

export default Dashboard;
