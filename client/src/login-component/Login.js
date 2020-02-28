import React from 'react';
import './Login.css';

function Login() {
    return (
      <div className='login-container'>
        <form>
          <input placeholder='here goes your gitHub Token' type='text' className='input-container'/>
        </form>
        <input type='Submit' value='Go!' className='input-button'></input>
      </div>
    );
  }

export default Login;