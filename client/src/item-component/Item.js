import React from 'react';
import Status from '../status-component/Status';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, dateDiff, statusDetails } from '../helperFunc';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { pinItem } from '../helperFunc';


function Item({pr, setPinnedItems}) {
  function handlePinButton (event) {
    pinItem(event.currentTarget.getAttribute('prid'));
    setPinnedItems(JSON.parse(localStorage.getItem('pinnedItems')));
  }

  if(pr) {
    return (
      <div className='pr-container'>
        <div className='pin-container'>
          <button className='button no-background' onClick={handlePinButton} prid={pr.id}>
            <div className='icon' >
             <FontAwesomeIcon icon='thumbtack'/>
            </div>
          </button>
        </div>
        <div className='item-body-container'>
          <div className='title-container' >
            <a href={`${pr.url}`} target='_blank' rel='noopener noreferrer'>{pr && pr.title}</a>
          </div>
          <div className='information-container'>
            <div className='detail-container'>
              <div className='detail-title-container'>
                Author
              </div>
              <div className='gitInfo-container'>
                {pr && pr.author.name ? pr.author.name : `You`}
              </div>
            </div>
            <div className='detail-container'>
              <div className='detail-title-container'>
                Status
              </div>
              <div className='gitInfo-container'>
                <Status statusDet={statusDetails(pr.reviews.nodes)} state={pr.state}/>
              </div>
            </div>
            <div className='detail-container'>
              <div className='detail-title-container'>
                Repository
              </div>
              <div className='gitInfo-container'>
                <a href={`${pr.repository.url}`} target='_blank' rel='noopener noreferrer'>{pr && pr.repository.name}</a>
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
          <CopyToClipboard text={pr.url}>
            <button className='button'>
              <FontAwesomeIcon icon='copy' className='icon'/>
            </button>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default Item;