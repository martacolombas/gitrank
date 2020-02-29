import React from 'react';
import './LoginPage.css';
import Login from '../login-component/Login';

function LoginPage({assignToken}) {
    return (
      <div className='loginPage-container'>
        <Login assignToken={assignToken} />
      </div>
    );
  }

export default LoginPage;