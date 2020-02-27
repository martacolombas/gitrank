import React from 'react';
import './List.css';
import Item from '../item-component/Item';

function List({prs}) {
  if(prs){
    return (
      <div className='list-container'>
        {
          (prs).map((pr) => {
            return( <Item pr={pr} key={pr.id} />);
      })}
      </div>
    );
  }
}

export default List;

