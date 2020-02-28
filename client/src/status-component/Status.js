import React from 'react';
import './Status.css';

function Status({status}) {
  console.log(status);
  if(status){
    return (
      <div className='status-container'>
        {
          'hello'
      })}
      </div>
    );
  }
}

export default Status;