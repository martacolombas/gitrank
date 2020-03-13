import React from 'react';
import cx from 'classnames';
import SidebarContent from '../SidebarContent/SidebarContent';
import './Sidebar.css';

function Sidebar({ className, ...props }) {
	const classnames = cx('Sidebar', className);

	return (
		<div className='Sidebar'>
			<SidebarContent isOpen={props.isOpen} content={props.content} />
		</div>
	);
}

export default Sidebar;
