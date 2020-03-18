import React, { useState } from 'react';
import './Status.css';
import cx from 'classnames';
import Avatar from '../Avatar/Avatar';

function Status({ className, reviewers, assignees }) {
  const classnames = cx('Status', className);
  const [imageError, setImageError] = useState(false);
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

  const classnamesAssignees = cx('Status-avatar', {
    'Status-avatar--error': imageError,
  });

  const getClassnames = id => {
    const classnamesReviewers = cx(
      'Status-avatar',
      avatarStatus[id.state].classname,
      { 'Status-avatar--error': imageError }
    );
    return classnamesReviewers;
  };

  return (
    <div className={classnames}>
      <div className='Status-roles'>
        <span className='Status-text'>
          {reviewers.length ? 'Reviewers' : 'No reviewers'}
        </span>
        <div
          className={
            !imageError
              ? 'Status-reviewers-avatars'
              : 'Status-reviewers-avatars--usernames'
          }
        >
          {reviewers.map(id => {
            return id.__typename === 'User' ? (
              <Avatar
                key={id.author_id}
                avatarUrl={id.avatarUrl}
                size={24}
                author={id.author}
                onError={() => {
                  if (!imageError) {
                    setImageError(true);
                  }
                }}
                title={
                  id.author
                    ? `${id.author} ${avatarStatus[id.state].statusname}`
                    : `You ${avatarStatus[id.state].statusname}`
                }
                className={getClassnames(id)}
              />
            ) : (
              <Avatar
                className={getClassnames(id)}
                avatarUrl={'https://octodex.github.com/images/Robotocat.png'}
                author={'Bot'}
                size={24}
              />
            );
          })}
        </div>
      </div>
      <div className='Status-roles'>
        <span className='Status-text'>
          {assignees.length ? 'Assignees' : 'No assignees'}
        </span>
        <div className='Status-assignees-avatars'>
          {assignees.map(assignee => {
            return (
              <Avatar
                key={assignee.id}
                avatarUrl={assignee.avatarUrl}
                size={24}
                author={assignee.login}
                title={assignee.login ? assignee.login : `You`}
                className={classnamesAssignees}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Status;
