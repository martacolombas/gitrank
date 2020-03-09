import React, { Component, useState } from 'react';
import cx from 'classnames';
import Button from '../Button/Button';
import SidebarContent from '../SidebarContent/SidebarContent';

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
				icon={isOpen ? 'close' : 'bars'}
				isOpen={isOpen}
				onClick={toggleBar}
			/>
			<SidebarContent isOpen={isOpen} />
		</div>
	);
}

export default Sidebar;
