import React from 'react';
import cx from 'classnames';
import './NavBar.css';
import Button from '../Button/Button';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function NavBar({ className }) {
	const classnames = cx('NavBar', className);
	return (
		<div className='NavBar'>
			<div className='NavBar-title'>gitRank</div>
			<img
				src='https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png'
				className='NavBar-title-pic'
				alt='login femalecodercat'
			/>
			<Button
				icon={faGithub}
				iconSize={12}
				className='NavBar-title-pic github'
				onClick={() => {
					window.open('https://github.com/martacolombas/gitrank');
				}}
			/>
		</div>
	);
}

export default NavBar;
