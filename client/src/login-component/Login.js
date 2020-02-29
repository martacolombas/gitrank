import React, { useState } from 'react';
import './Login.css';

function Login({assignToken}) {
  const [token, setToken] = useState ('');

  function handleChange ({target}) {
    setToken(target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    localStorage.setItem('token', token);
    assignToken(token);
  }
    return (
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <input
          placeholder='Here goes your gitHub Token'
          value={token}
          type='text'
          className='input-container'
          onChange={handleChange}/>
        <button type='Submit' className='input-button'>Go!</button>
        </form>
      </div>
    );
  }

export default Login;