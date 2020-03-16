import React from 'react';
import { Transition } from 'react-transition-group';
import cx from 'classnames';
import './SidebarContent.css';

const duration = 200;

const sidebarStyle = {
	transition: `width ${duration}ms`,
};
const sidebarTransitionStyles = {
	entering: { width: 0 },
	entered: { width: '400px' },
	exiting: { width: '400px' },
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
							backgroundColor: 'white',
						}}
						className={classnames}
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
					className={classnames}
					style={{
						...sidebarStyle,
						...sidebarTransitionStyles[state],
						padding: '0px',
					}}
				>
					{renderContent()}
				</div>
			)}
		</Transition>
	);
}

export default sidebarContent;
