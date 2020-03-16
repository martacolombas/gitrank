import React from 'react';
import './Button.css';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ className, children, icon, iconSize = 12, ...props }) {
  const classnames = cx('Button', className);
  return (
    <button className={classnames} {...props}>
      {children || ''}
      {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: iconSize }} />}
    </button>
  );
}

export default Button;
