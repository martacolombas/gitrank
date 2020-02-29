import React, { useState } from 'react';
import './Login.css';

function Login({assignCredentials}) {
  const [token, setToken] = useState ('');
  const [username, setUsername] = useState ('');

  function handleTokenChange ({target}) {
    setToken(target.value);
  }

  function handleUsernameChange ({target}) {
    setUsername(target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    assignCredentials(username, token);
  }
    return (
      <div className='login-container'>
        <form onSubmit={handleSubmit} className='form-container'>
        <input
          placeholder='Username'
          value={username}
          type='text'
          className='input-container'
          onChange={handleUsernameChange}/>
          <input
          placeholder='Here goes your gitHub Token'
          value={token}
          type='text'
          className='input-container'
          onChange={handleTokenChange}/>
        <button type='Submit' className='input-button'>Go!</button>
        </form>
      </div>
    );
  }

export default Login;