import React from 'react';
import './PrPreview.css';
import cx from 'classnames';
import { pinItem } from '../helperFunc';
import Badge from '../Badge/Badge';

function PrPreview({pr, setPinnedItems, className}) {
  const classnames = cx('PrPreview', className);

  function handlePinButton (event) {
    pinItem(event.currentTarget.getAttribute('prid'));
    setPinnedItems(JSON.parse(localStorage.getItem('pinnedItems')));
  }

  if(!pr) {
    return null;
  }

  return (
    <div className={classnames}>
      <header className='PrPreview-header'>
      <div className='PrPreview-header-avatar'>
        <img src='' width='50' height='50'/>
      </div>
      <div className='PrPreview-header-title'>
        <h3>
          {pr.repository.name}
        </h3>
        <h1>
          {pr.title}
        </h1>
      </div>
      <div className='PrPreview-header-details'>
        <Badge className='PrPreview-header-badge' type={pr.state}/>
      </div>
      <div className='PrPreview-header-actions'>
          Button
          {/*PrPreview-header-actions != PrPreview-header-details-actions for the sake of simplicity */}
        </div>
      </header>
    </div>
  );
}

export default PrPreview;