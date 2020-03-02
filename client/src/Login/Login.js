import React, { useState, useEffect } from 'react';
import './Login.css';
import Button from '../Button/Button';
import cx from 'classnames';
import { useDebounce } from 'use-debounce'

//TODO(marta) create a form component

function Login({className, assignCredentials}) {
  const classnames = cx('Login', className);
  const [token, setToken] = useState ('');
  const [username, setUsername] = useState ('');
  const [isEnterprise, setEnterprise] = useState(false);
  const [enterpriseUrl, setEnterpriseUrl] = useState('');
  const [isFormEnabled, setEnableForm] = useState(false);

  useEffect(() => {

  })

  function handleTokenChange ({target}) {
    setToken(target.value);
  }

  function handleUsernameChange ({target}) {
    setUsername(target.value);
  }

  function handleEnterprise ({target}) {
    setEnterprise(target.checked);
  }

  function handleEnterpriseUrl({target}){
    setEnterpriseUrl(target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('isEnterprise', JSON.stringify(isEnterprise));
    if(isEnterprise){
      localStorage.setItem('enterpriseUrl', JSON.stringify(enterpriseUrl));
    }
    assignCredentials(username, token);
  }

  useEffect(() => {
    if(username && token){
      if(!isEnterprise){
        setEnableForm(true);
      }
      if(isEnterprise && enterpriseUrl) {
        setEnableForm(true);
      }
    } else if (isFormEnabled) {
      setEnableForm(false);
    }
  }, [username, token])

    return (
      <div className={classnames}>
        <img src="https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png" className='pic'>
        </img>
        <form onSubmit={handleSubmit} className='Login-form'>
        <input
          placeholder='Username'
          value={username}
          type='text'
          className='Login-input'
          required
          onChange={handleUsernameChange}/>
          <input
          placeholder='Here goes your gitHub Token'
          value={token}
          type='text'
          className='Login-input'
          required
          onChange={handleTokenChange}/>
          <p>Click here to find out how to create one!</p>
          <input type='checkbox'
          checked={isEnterprise}
          className='Login-input Login-input--checkbox'
          onChange={handleEnterprise}
          /> GitHub Enterprise
          {isEnterprise  && <input
          placeholder='GraphQL endpoint'
          required
          value={enterpriseUrl}
          type='text'
          className='Login-input'
          onChange={handleEnterpriseUrl}
          /> }
        <Button type='Submit'
        disabled={!isFormEnabled}
        children={'Go!'}
        className={isFormEnabled ? `Login-button`: `Login-button Login-button--disabled`}/>
        </form>
      </div>
    );
  }

export default Login;