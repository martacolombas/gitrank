import React from 'react';
import './Status.css';
import cx from 'classnames';
import Avatar from '../Avatar/Avatar';


function Status ({className, reviewers }){
const classnames = cx('Status', className);
const avatarStatus = {
  APPROVED: 'Status-avatar--approved',
  CHANGES_REQUESTED: 'Status-avatar--changes',
  COMMENTED: 'Status-avatar--commented'
};

  return (
    <div className={classnames}>
      {reviewers.map(id => {
        return (<Avatar
          avatarUrl={id.avatarUrl}
          size={32}
          author={id.author}
          className={`Status-avatar ${avatarStatus[id.state]}`}/>)
      })}
    </div>
  );
}

export default Status;