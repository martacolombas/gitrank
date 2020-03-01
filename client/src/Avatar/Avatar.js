import React from 'react';
import './Avatar.css';
import cx from 'classnames';

function Avatar ({className, avatarUrl, size=48, author}){
  const classnames = cx('Avatar', className);
  return (
    <div className={classnames} style={{width: size, height: size}}>
      <img src={avatarUrl} alt={author} title={author || 'You'}/>
    </div>
  )
}

export default Avatar;