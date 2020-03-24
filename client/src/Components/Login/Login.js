import React, { useState, useEffect } from 'react';
import './Login.css';
import Button from '../Button/Button';
import cx from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { GithubLoginButton } from 'react-social-login-buttons';
import { useHistory, useLocation } from 'react-router-dom';

//TODO(marta) create a form component

function Login({ className, assignCredentials }) {
  const classnames = cx('Login', className);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isEnterprise, setEnterprise] = useState(false);
  const [enterpriseUrl, setEnterpriseUrl] = useState('');
  const [isFormEnabled, setEnableForm] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/dashboard' } };

  function handleTokenChange({ target }) {
    setToken(target.value);
  }

  function handleUsernameChange({ target }) {
    setUsername(target.value);
  }

  function handleEnterprise({ target }) {
    setEnterprise(target.checked);
  }

  function handleEnterpriseUrl({ target }) {
    setEnterpriseUrl(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('isEnterprise', JSON.stringify(isEnterprise));
    if (isEnterprise) {
      localStorage.setItem('enterpriseUrl', JSON.stringify(enterpriseUrl));
    }
    assignCredentials(username, token);
    history.replace(from);
  }

  useEffect(() => {
    if (username && token) {
      if (!isEnterprise) {
        setEnableForm(true);
      } else if (isEnterprise && !enterpriseUrl) {
        setEnableForm(false);
      } else if (isEnterprise && enterpriseUrl) {
        setEnableForm(true);
      }
    } else if (isFormEnabled) {
      setEnableForm(false);
    }
  }, [username, token, isEnterprise, enterpriseUrl]);

  return (
    <div className={classnames}>
      <img
        src='https://cdn.sparkfun.com/assets/home_page_posts/1/4/7/0/femalecodertocat.png'
        className='pic'
        alt='login femalecodercat'
      ></img>
      <a href='http://localhost:8080/oauth/github'>
        <GithubLoginButton />
      </a>
      <form onSubmit={handleSubmit} className='Login-form'>
        <input
          placeholder='Username'
          value={username}
          type='text'
          className='Login-input'
          required
          onChange={handleUsernameChange}
        />
        <input
          placeholder='Here goes your gitHub Token'
          value={token}
          type='text'
          className='Login-input'
          required
          onChange={handleTokenChange}
        />
        <a
          href='https://github.com/martacolombas/gitrank#github-token'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='Login-link'>
            Click here to find out how to create one!
          </p>
        </a>
        <Checkbox
          checked={isEnterprise}
          className='Login-input'
          onChange={handleEnterprise}
          text='GitHub Enterprise'
        />
        {isEnterprise && (
          <input
            placeholder='GraphQL endpoint'
            required
            value={enterpriseUrl}
            type='text'
            className='Login-input'
            onChange={handleEnterpriseUrl}
          />
        )}
        <Button
          type='Submit'
          disabled={!isFormEnabled}
          children={'Go!'}
          className={
            isFormEnabled
              ? `Login-button`
              : `Login-button Login-button--disabled`
          }
        />
      </form>
    </div>
  );
}

export default Login;
