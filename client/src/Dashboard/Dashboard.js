import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import PrList from '../PrList/PrList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRS, GET_REPOS } from '../ApiClient';
import Filter from '../Filter/Filter';
import cx from 'classnames';

library.add(fas);

function Dashboard({ className, token, username }) {
	const classnames = cx('Dashboard', className);
	const [credentials, setCredentials] = useState({});
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

	useEffect(() => {
		setCredentials({ token, username });
	}, []);

	let resultCall = [];
	const { loading, data, error } = useQuery(GET_PRS, {
		variables: {
			login: `${credentials.username}`,
		},
		// pollInterval: 40000, //todo uncomment
	});

	const {
		loading: reposLoading,
		data: reposData,
		error: reposError,
	} = useQuery(GET_REPOS, {
		variables: {
			login: `${credentials.username}`,
		},
	});

	let options = [];

	if (reposData) {
		options = reposData.user.repositories.nodes.map(element => {
			return { value: element.id, label: element.nameWithOwner };
		});
	}

	if (error) return <p>Error</p>; // todo make an error page
	if (loading) return <p>loading</p>; //todo add stylying

	if (data) {
		data.user.repositories.nodes
			.map(element => {
				return {
					prs: element.pullRequests,
				};
			})
			.map(element => {
				return {
					prs: element.prs.nodes,
				};
			})
			.filter(element => {
				return element.prs.length > 0;
			})
			.map(element => {
				return element.prs;
			})
			.forEach(element => {
				resultCall.push(...element);
			});
	}

	let notPinned = resultCall
		.filter(element => !pinnedItems.includes(element.id))
		.sort((a, b) => a.createdAt - b.createdAt);

	let pinned = resultCall
		.filter(element => pinnedItems.includes(element.id))
		.sort((a, b) => a.createdAt - b.createdAt);

	let prs = [...pinned, ...notPinned];

	return (
		<div className='Dashboard'>
			<div className='Dashboard-title'>Your PRs dashboard</div>
			<Filter
				options={options}
				className='Dashboard-filter'
				value={selectedRepos}
				onChange={value => {
					setSelectedRepos(value);
					localStorage.setItem('selectedRepos', JSON.stringify(selectedRepos));
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
