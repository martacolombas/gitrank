import React, { Component, useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 1000;

const sidebarStyle = {
	transition: `width ${duration}ms`,
};
const sidebarTransitionStyles = {
	entering: { width: 0 },
	entered: { width: '200px' },
	exiting: { width: '200px' },
	exited: { width: 0 },
};
const linkStyle = {
	transition: `opacity ${duration}ms`,
};
const linkTransitionStyles = {
	entering: { opacity: 0 },
	entered: { opacity: 1 },
	exiting: { opacity: 1 },
	exited: { opacity: 0 },
};

function sidebarContent({ className, content, isOpen, ...props }) {
	const classnames = cx('SidebarContent', className);
	function renderContent() {
		return (
			<Transition in={isOpen} timeout={duration}>
				{state => (
					<div
						style={{
							...linkStyle,
							...linkTransitionStyles[state],
						}}
						className={'SidebarContent'}
					>
						{content}
					</div>
				)}
			</Transition>
		);
	}
	return (
		<Transition in={isOpen} timeout={duration}>
			{state => (
				<div
					className='sidebar'
					style={{
						...sidebarStyle,
						...sidebarTransitionStyles[state],
					}}
				>
					{renderContent()}
					<div className='sidebar-link'>Home</div>
					<div className='sidebar-link'>About</div>
					<div className='sidebar-link'>Contact</div>
				</div>
			)}
		</Transition>
	);
}

export default sidebarContent;
