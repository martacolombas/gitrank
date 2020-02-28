import React from 'react';
import Status from '../status-component/Status';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, dateDiff, statusDetails } from '../helperFunc';


function Item({pr}) {
  return (
    <div className='pr-container'>
      <div className='pin-container'>
        <button>
        <FontAwesomeIcon icon='thumbtack' />
        </button>
      </div>
      <div className='item-body-container'>
        <div className='title-container' >
          {pr && pr.title}
        </div>
        <div className='information-container'>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Author
            </div>
            <div className='gitInfo-container'>
              {pr && pr.author.name ? pr.author.name : `YOU`}
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Status
            </div>
            <div className='gitInfo-container'>
              {<Status status={statusDetails(pr.reviews.nodes)}/>}
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
              Repository
            </div>
            <div className='gitInfo-container'>
              {pr && pr.repository.name}
            </div>
          </div>
          <div className='detail-container'>
            <div className='detail-title-container'>
            Date created
            </div>
            <div className='gitInfo-container'>
              {pr && formatDate(pr.createdAt)}
            </div>
            <div className='gitInfo-container light'>
              {pr && `(last updated ${dateDiff(pr.updatedAt)})`}
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