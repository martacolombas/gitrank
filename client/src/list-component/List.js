import React from 'react';
import './List.css';
import PrPreview from '../PrPreview/PrPreview';

function List({prs, setPinnedItems}) {
  if(prs){
    return (
      <div className='list-container'>
        {
          prs.map((pr) => {
            return(
            <PrPreview pr={pr} key={pr.id} setPinnedItems={setPinnedItems}/>
          );
      })}
      </div>
    );
  }
}

export default List;

