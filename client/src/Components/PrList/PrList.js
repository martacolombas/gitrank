import React from 'react';
import './PrList.css';
import PrPreview from '../PrPreview/PrPreview';

function PrList({ prs, setPinnedItems, userId }) {
  if (prs) {
    return (
      <div className='PrList'>
        {prs.map(pr => {
          return (
            <PrPreview
              pr={pr}
              key={pr.id}
              setPinnedItems={setPinnedItems}
              userId={userId}
            />
          );
        })}
      </div>
    );
  }
}

export default PrList;
