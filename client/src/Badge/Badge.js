import React from 'react';
import './Badge.css';
import cx from 'classnames';

function Badge({className, type=''}){
  const typeClassName = type.toLowerCase().replace(/_/,'-');
  const classnames = cx('Badge', className, `Badge--${typeClassName}`);
  return (
    <div className={classnames}>
      {type}
    </div>
  );
}

export default Badge;