import React from 'react';
import './TransitionPage.css';
import cx from 'classnames';
import Button from '../Button/Button';

function TransitionPage({ className, size = 300, image, children, ...props }) {
	if (props.type === 'error token') {
		return (
			<div className={cx('TransitionPage', className)}>
				<img
					src={image}
					style={{ width: size, height: size }}
					alt='loading'
					{...props}
					className='TransitionPage-image'
				/>
				<p className='TransitionPage-text'>{children}</p>
				<div className='TransitionPage-errorToken'>
					<Button
						onClick={() => {
							localStorage.getItem('token') && localStorage.removeItem('token');
							localStorage.getItem('username') &&
								localStorage.removeItem('username');
							window.location.reload();
						}}
						children={'Wrong token? Try again!'}
						className='TransitionPage-errorButton'
					/>
				</div>
			</div>
		);
	}
	return (
		<div className={cx('TransitionPage', className)}>
			<img
				src={image}
				style={{ width: size, height: size }}
				alt='loading'
				{...props}
				className='TransitionPage-image'
			/>
			<p className='TransitionPage-text'>{children}</p>
		</div>
	);
}

export default TransitionPage;
