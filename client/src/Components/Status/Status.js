import React from 'react';
import './Status.css';
import cx from 'classnames';
import Avatar from '../Avatar/Avatar';

function Status({ className, reviewers, assignees }) {
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
		PENDING: {
			classname: 'Status-avatar--pending',
			statusname: 'pending',
		},
		DISMISSED: {
			classname: 'Status-avatar--dismissed',
			statusname: 'dismissed',
		},
	};

	return (
		<div className={classnames}>
			<div className='Status-reviewers'>
				{reviewers.map(id => {
					return (
						<Avatar
							key={id.author_id}
							avatarUrl={id.avatarUrl}
							size={24}
							author={id.author}
							title={
								id.author
									? `${id.author} ${avatarStatus[id.state].statusname}`
									: `You ${avatarStatus[id.state].statusname}`
							}
							className={`Status-avatar ${avatarStatus[id.state].classname}`}
						/>
					);
				})}
			</div>
			<div className='Status-assignees'>
				{assignees.map(assignee => {
					return (
						<Avatar
							key={assignee.id}
							avatarUrl={assignee.avatarUrl}
							size={24}
							author={assignee.login}
							title={assignee.login ? assignee.login : `You`}
							className={`Status-avatar Status-avatar--assignee`}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Status;
