import React from 'react';
import cx from 'classnames';
import Button from '../Button/Button';
import './Feedback.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function Feedback({ className }) {
	const classnames = cx('Feedback', className);
	return (
		<div className={classnames}>
			<div className='Feedback-github'>
				<Button
					icon={faGithub}
					style={{ width: 25, height: 25 }}
					iconSize={16}
					className='Feedback-button'
					onClick={() => {
						window.open('https://github.com/martacolombas/gitrank/issues/new');
					}}
				/>
				<span
					role='img'
					aria-label='purple-heart'
					className={'Feedback-github-text'}
				>
					Any suggestion or ideas? We absolutely 💜 them.
					<br />
					Open an issue 😊
				</span>
			</div>
			<div className='Feedback-twitter'>
				<Button
					icon={faTwitter}
					style={{ width: 25, height: 25 }}
					iconSize={16}
					className='Feedback-button'
					onClick={() => {
						window.open('https://twitter.com/martacolombas');
					}}
				/>
				<span
					role='image'
					aria-label='purple-heart'
					className='Feedback-twitter-text'
				>
					Or tweet me now 💌
				</span>
			</div>
		</div>
	);
}

export default Feedback;
