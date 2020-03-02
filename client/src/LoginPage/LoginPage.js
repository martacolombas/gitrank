import React from 'react';
import './LoginPage.css';
import Login from '../Login/Login';

function LoginPage({assignCredentials}) {
    return (
      <div className='loginPage-container'>
        <Login assignCredentials={assignCredentials} />
      </div>
    );
  }

export default LoginPage;