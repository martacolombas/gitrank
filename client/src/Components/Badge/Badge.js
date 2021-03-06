import React from 'react';
import './Badge.css';
import cx from 'classnames';
import Emoji from 'a11y-react-emoji';

function Badge({ className, type = '', ...props }) {
  const emojis = {
    OPEN: <Emoji symbol='👋' label='open' className='emoji' />,
    MERGED: <Emoji symbol='👍' label='open' className='emoji' />,
    CLOSED: <Emoji symbol='👎' label='open' className='emoji' />,
  };

  const typeClassName = type.toLowerCase().replace(/_/, '-');
  const classnames = cx('Badge', className, `Badge--${typeClassName}`);
  return props.emoji ? (
    <div className={classnames}>
      {emojis[type]} {type}
    </div>
  ) : (
    <div className={classnames}>{type}</div>
  );
}

export default Badge;
