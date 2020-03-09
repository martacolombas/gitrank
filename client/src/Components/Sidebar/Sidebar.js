import React, { useState } from 'react';
import cx from 'classnames';
import Button from '../Button/Button';
import SidebarContent from '../SidebarContent/SidebarContent';
import './Sidebar.css';

function Sidebar({ className, ...props }) {
	const classnames = cx('Sidebar', className);
	const [isOpen, toggleSidebar] = useState(false);

	function toggleBar() {
		toggleSidebar(!isOpen);
	}
	return (
		<div className='Sidebar'>
			<Button
				className='Sidebar-button'
				icon={isOpen ? 'times' : 'bars'}
				onClick={toggleBar}
				size={45}
			/>
			<SidebarContent isOpen={isOpen} content={props.content} />
		</div>
	);
}

export default Sidebar;
