import React from 'react';
import './Login.css';

function Login({setAllowed}) {
    return (
      <div className='login-container'>
        <form>
          <input placeholder='here goes your gitHub Token' type='text' className='input-container'/>
        </form>
        <input type='Submit' value='Go!' className='input-button' onClick={() => setAllowed(true)}></input>
      </div>
    );
  }

export default Login;