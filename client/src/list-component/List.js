import React from 'react';
import './List.css';
import Item from '../item-component/Item';

function List({prs, setPinnedItems}) {
  if(prs){
    return (
      <div className='list-container'>
        {
          prs.map((pr) => {
            return( <Item pr={pr} key={pr.id} setPinnedItems={setPinnedItems}/>);
      })}
      </div>
    );
  }
}

export default List;

