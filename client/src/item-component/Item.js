import React from 'react';
import Status from '../status-component/Status';
import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, dateDiff, statusDetails } from '../helperFunc';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function Item({pr}) {
  return (
    <div className='pr-container'>
      <div className='pin-container'>
        <button className='button no-background'>
        <FontAwesomeIcon icon='thumbtack' className='icon'/>
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
        <button className='button'>
          <FontAwesomeIcon icon='eye' className='icon'/>
        </button>
        <CopyToClipboard text={pr.url}>
          <button className='button'>
            <FontAwesomeIcon icon='copy' className='icon'/>
          </button>
        </CopyToClipboard>
        <button className='button'>
          <FontAwesomeIcon icon='trash' className='icon'/>
        </button>
      </div>
    </div>
  );
}

export default Item;