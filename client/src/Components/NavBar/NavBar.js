import React from 'react';
import cx from 'classnames';
import './NavBar.css';
import Button from '../Button/Button';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERINFO } from '../../ApiClient/Queries';
import TransitionPage from '../TransitionPage/TransitionPage';

function NavBar({ className }) {
	const classnames = cx('NavBar', className);
	const username = localStorage.getItem('username');
	const { loading, data, error } = useQuery(GET_USERINFO, {
		variables: {
			login: `${username}`,
		},
	});

	if (error) {
		localStorage.getItem('token') && localStorage.removeItem('token');
		localStorage.getItem('username') && localStorage.removeItem('username');
		console.error(error);
		return (
			<TransitionPage
				src='https://octodex.github.com/images/deckfailcat.png'
				children='Something went wrong... Please, refresh the page'
			/>
		);
	}

	if (loading) {
		return (
			<TransitionPage src='https://octodex.github.com/images/hula_loop_octodex03.gif' />
		);
	}

	data && console.log(data);
	return (
		data && (
			<div className='NavBar'>
				<div className='NavBar-title'>gitRank</div>
				<img
					src='https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png'
					className='NavBar-title-pic'
					alt='login femalecodercat'
				/>
				<button className='NavBar-user-button'>
					<img
						src={data.user.avatarUrl}
						alt={username}
						className='NavBar-user-pic'
					/>
				</button>
				<Button
					icon={faGithub}
					iconSize={12}
					className='NavBar-title-pic github'
					onClick={() => {
						window.open('https://github.com/martacolombas/gitrank');
					}}
					alt='Open the repo!'
				/>
			</div>
		)
	);
}

export default NavBar;
