import React from 'react';
import './LoginPage.css';
import Login from '../Login/Login';
import cx from 'classnames';
import Badge from '../Badge/Badge';

function LoginPage({ className, assignCredentials, offline }) {
  const classnames = cx('LoginPage', className);
  return (
    <div className={classnames}>
      {offline && <Badge type={offline} className='LoginPage-offlineBadge' />}
      <Login assignCredentials={assignCredentials} />
    </div>
  );
}

export default LoginPage;
