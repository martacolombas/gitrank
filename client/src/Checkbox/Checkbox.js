import React from 'react';
import './Checkbox.css';
import cx from 'classnames';

function Checkbox({ className, text, size = 12, ...props }) {
	const classnames = cx('Checkbox', className);
	return (
		<div className='input-container'>
			<input
				type='checkbox'
				className={classnames}
				style={{ width: size, height: size }}
				{...props}
			></input>
			<p className='Checkbox-text'>{text || ''}</p>
		</div>
	);
}

export default Checkbox;
