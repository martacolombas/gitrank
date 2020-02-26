import React from 'react';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Item() {
  return (
    <div className='pr-container'>
      <div className='pin-container'>
        <button>
        <FontAwesomeIcon icon='thumbtack' />
        </button>
      </div>
      <div className='item-body-container'>
        <div className='title-container'>
          Added pinned items to the Dashboard
        </div>
        <div className='information-container'>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Author
            </div>
            <div className='gitInfo-container'>
              Steve Jobs
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Status
            </div>
            <div className='gitInfo-container'>
              Bill gates requested changes
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Repository
            </div>
            <div className='gitInfo-container'>
              GitRank
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
            Date created
            </div>
            <div className='gitInfo-container'>
              dd/mm/yyy
            </div>
            <div className='gitInfo-container light'>
              13 days ago
            </div>
          </div>
        </div>
      </div>
      <div className='actions-container'>
        <button>
          <FontAwesomeIcon icon='eye'/>
        </button>
        <button>
          <FontAwesomeIcon icon='copy'/>
        </button>
        <button>
          <FontAwesomeIcon icon='trash'/>
        </button>
      </div>
    </div>
  );
}

export default Item;