import React from 'react';
import './LoginPage.css';
import Login from '../login-component/Login';

function LoginPage({isLoggedIn}) {
    return (
      <div className='loginPage-container'>
        <Login isLoggedIn={isLoggedIn}/>
      </div>
    );
  }

export default LoginPage;