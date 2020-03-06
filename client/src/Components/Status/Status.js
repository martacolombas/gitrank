import React from 'react';
import './Status.css';
import cx from 'classnames';
import Avatar from '../Avatar/Avatar';

function Status({ className, reviewers }) {
	const classnames = cx('Status', className);
	const avatarStatus = {
		APPROVED: {
			classname: 'Status-avatar--approved',
			statusname: 'approved',
		},
		CHANGES_REQUESTED: {
			classname: 'Status-avatar--changes',
			statusname: 'requested changes',
		},
		COMMENTED: {
			classname: 'Status-avatar--commented',
			statusname: 'commented',
		},
	};

	return (
		<div className={classnames}>
			{reviewers.map(id => {
				return (
					<Avatar
						key={id.author_id}
						avatarUrl={id.avatarUrl}
						size={24}
						author={id.author}
						title={
							id.author
								? `${id.author} ${
										avatarStatus[id.state].statusname
								  }`
								: `You ${avatarStatus[id.state].statusname}`
						}
						className={`Status-avatar ${
							avatarStatus[id.state].classname
						}`}
					/>
				);
			})}
		</div>
	);
}

export default Status;
