import React from 'react';
import './LoginPage.css';
import Login from '../login-component/Login';

function LoginPage({setAllowed, ...props}) {
    return (
      <div className='loginPage-container'>
        <Login setAllowed={setAllowed}/>
      </div>
    );
  }

export default LoginPage;