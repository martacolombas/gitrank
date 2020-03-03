import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import PrList from '../PrList/PrList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRS } from '../ApiClient';

library.add(fas);

function Dashboard({ token, username }) {
	const [credentials, setCredentials] = useState({});
	const [pinnedItems, setPinnedItems] = useState(
		localStorage.getItem('pinnedItems') || []
	);

	useEffect(() => {
		setCredentials({ token, username });
	}, []);

	let resultCall = [];
	const { loading, data, error } = useQuery(GET_PRS, {
		variables: {
			login: `${credentials.username}`,
		},
		pollInterval: 40000,
	});

	if (error) return <p>Error</p>; // todo make an error page
	if (loading) return <p>loading</p>;

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
		<div className='leaderboard'>
			<div className='mainTitle-container'>Your PRs dashboard</div>
			{<PrList prs={prs} setPinnedItems={setPinnedItems} />}
		</div>
	);
}

export default Dashboard;
