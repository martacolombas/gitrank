import React from 'react';
import cx from 'classnames';
import './NavBar.css';
import Button from '../Button/Button';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERINFO } from '../../ApiClient/Queries';
import TransitionPage from '../TransitionPage/TransitionPage';

function NavBar({ className, ...props }) {
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

	return (
		data && (
			<div className='NavBar'>
				<Button
					className='Sidebar-button'
					icon={props.isOpen ? 'times' : 'bars'}
					onClick={props.toggleBar}
					size={60}
					iconSize={16}
				/>
				<div className='NavBar-title'>
					gitRank
					<img
						src='https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png'
						className='NavBar-title-pic'
						alt='login femalecodercat'
					/>
				</div>
				<div className='NavBar-details'>
					<div className='NavBar-user-details'>
						<button className='NavBar-user-button'>
							<img
								src={data.user.avatarUrl}
								alt={username}
								className='NavBar-user-pic'
							/>
						</button>
						{data.user.login}
					</div>
					<Button
						icon={faGithub}
						iconSize={16}
						className='NavBar-title-pic github'
						onClick={() => {
							window.open('https://github.com/martacolombas/gitrank');
						}}
						title='Open the repo!'
					/>
				</div>
			</div>
		)
	);
}

export default NavBar;
