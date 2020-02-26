import React, {useEffect, useState} from 'react';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Item() {
  return (
    <div>
      <div className='pin-container'>
        <button>
        <FontAwesomeIcon icon='thumbtack' />
        </button>
      </div>
      <div className='title-container'>
        Added pinned items to the Dashboard
      </div>
      <div className='information-container'>
        <div className='status-title-container'>
          Author
        </div>
        <div className='author-container'>
          Steve Jobs
        </div>
        <div className='status-title-container'>
          Status
        </div>
        <div className='status-container'>
          Bill gates requested changes
        </div>
        <div className='status-title-container'>
          Repository
        </div>
        <div className='repository-container'>
          GitRank
        </div>
        <div className='status-title-container'>
        Date created
          <div className='date-created'>
            dd/mm/yyy
          </div>
          <div className='time-elapsed'>
            13 days ago
          </div>
        </div>
      </div>
      <div className='actions-container'>
        <button>
          <FontAwesomeIcon icon='eye'/>
          <FontAwesomeIcon icon='copy'/>
          <FontAwesomeIcon icon='trash'/>
        </button>
      </div>
    </div>
  );
}

export default Item;