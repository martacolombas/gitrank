import React from 'react';
import './TransitionPage.css';
import cx from 'classnames';

function TransitionPage({ className, size = 300, image, children, ...props }) {
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
