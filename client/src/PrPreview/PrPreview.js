import React from 'react';
import './PrPreview.css';
import cx from 'classnames';
import { pinItem } from '../helperFunc';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
          <Avatar avatarUrl={pr.author.avatarUrl} author={pr.author.name}/>
        </div>
        <div className='PrPreview-header-title'>
          <h3>
            {pr.repository.name}
          </h3>
          <h2>
            {pr.title}
          </h2>
        </div>
        <div className='PrPreview-header-details'>
          <Badge className='PrPreview-header-badge' type={pr.state}/>
        </div>
        <div className='PrPreview-header-actions'>
            <Button icon={'star'} onClick={handlePinButton} prid={pr.id}/>
            <CopyToClipboard text={pr.url}>
              <Button icon={'copy'}/>
            </CopyToClipboard>
        </div>
      </header>
    </div>
  );
}

export default PrPreview;