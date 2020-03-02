import React, { useState } from 'react';
import './Login.css';

function Login({assignCredentials}) {
  const [token, setToken] = useState ('');
  const [username, setUsername] = useState ('');
  const [isEnterprise, setEnterprise] = useState(false);

  function handleTokenChange ({target}) {
    setToken(target.value);
  }

  function handleUsernameChange ({target}) {
    setUsername(target.value);
  }

  function handleEnterprise ({target}) {
    setEnterprise(target.checked);
  }

  function handleSubmit (event) {
    event.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('isEnterprise', JSON.stringify(isEnterprise));
    assignCredentials(username, token);
  }

    return (
      <div className='login-container'>
        <img src="https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png" className='pic'>
        </img>
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
          <p>Click here to find out how to create one!</p>
          GitHub Enterprise <input type='checkbox'
          checked={isEnterprise}
          onChange={handleEnterprise}
          />
          <input
          placeholder='GraphQL endpoint'
          // value={token}
          type='text'
          className='input-container'
          // onChange={handleEnterprise}
          />
        <button type='Submit' className='input-button'>Go!</button>
        </form>
      </div>
    );
  }

export default Login;