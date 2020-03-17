import React from 'react';
import './PrPreview.css';
import cx from 'classnames';
import { pinItem } from '../../helperFunc';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PrDetails from '../PrDetails/PrDetails';
import Assign from '../Assign/Assign';

function PrPreview({ pr, setPinnedItems, className, userId }) {
  const classnames = cx('PrPreview', className);
  const assignees = pr.assignees.nodes.map(element => element.id);
  const isAssignedToUser = assignees.includes(userId);

  function handlePinButton(event) {
    pinItem(event.currentTarget.getAttribute('prid'));
    setPinnedItems(JSON.parse(localStorage.getItem('pinnedItems')));
  }

  function isFavorite(id = 0) {
    return localStorage.getItem('pinnedItems')
      ? JSON.parse(localStorage.getItem('pinnedItems')).includes(id)
      : false;
  }

  if (!pr) {
    return null;
  }

  return (
    <div className={classnames}>
      <header className='PrPreview-header'>
        <div className='PrPreview-header-avatar'>
          {pr.author.__typename === 'User' ? (
            <Avatar avatarUrl={pr.author.avatarUrl} author={pr.author.login} />
          ) : (
            <Avatar
              avatarUrl={'https://octodex.github.com/images/Robotocat.png'}
              author={'Bot'}
            />
          )}
        </div>
        <div className='PrPreview-header-title'>
          <a
            className='PrPreview-header-repo'
            href={pr.repository.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {pr.repository.nameWithOwner}
          </a>
          <a
            className='PrPreview-header-name'
            href={pr.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {`#${pr.number} ${pr.title}`}
          </a>
        </div>
        <div className='PrPreview-header-details'>
          <Badge
            className='PrPreview-header-badge'
            type={pr.state}
            emoji={true}
          />
          {pr.isDraft && (
            <Badge
              className='PrPreview-header-badge'
              type={'DRAFT'}
              emoji={false}
            />
          )}
        </div>
        <div className='PrPreview-header-actions'>
          <CopyToClipboard text={pr.url}>
            <Button
              icon={'copy'}
              className={'PrPreview-header-button'}
              title='copy item'
            />
          </CopyToClipboard>
          <Button
            icon={'star'}
            title='favorite item'
            onClick={handlePinButton}
            prid={pr.id}
            className={
              isFavorite(pr.id)
                ? 'PrPreview-header-button--isFavorite'
                : 'PrPreview-header-button'
            }
          />
          <Assign
            prId={pr.id}
            userId={userId}
            className={'PrPreview-header-button'}
            isAssigned={isAssignedToUser}
          />
        </div>
      </header>
      <PrDetails pr={pr} />
    </div>
  );
}

export default PrPreview;
