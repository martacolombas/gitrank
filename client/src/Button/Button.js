import React from 'react';
import './Button.css';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button ({className, children, icon, ...props }){
const classnames = cx('Button', className);
  return (
    <button className={classnames} {...props}>
      {children || ''}
      {icon && <FontAwesomeIcon icon={icon} className='Button-icon'/>}
    </button>
  );
}

export default Button;