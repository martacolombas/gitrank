import React from 'react';
import './LoginPage.css';
import Login from '../Login/Login';
import cx from 'classnames';

function LoginPage({ className, assignCredentials, offline }) {
  const classnames = cx('LoginPage', className);
  return (
    <div className={classnames}>
      <Login assignCredentials={assignCredentials} />
    </div>
  );
}

export default LoginPage;
