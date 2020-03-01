import React from 'react';
import './Status.css';
import cx from 'classnames';


function Status ({className}){
const classnames = cx('Status', className);
  return (
    <div className={classnames}>

    </div>
  );
}

export default Status;

// import React from 'react';
// import './Status.css';
// import { beautifyStatus, chooseEmoji } from '../helperFunc';
// import Emoji from 'a11y-react-emoji';

// function Status({statusDet, state}) {
//   if (statusDet.length && state) {
//     return (
//       <div className='status-container'>
//         <Emoji symbol={chooseEmoji(state)}/>
//         <p className='boldText'>{`${beautifyStatus(state)}`}</p>
//         {`${statusDet.map((status) => {
//           return (status.author
//           ? `${status.author} ${beautifyStatus(status.state)}`
//           : `  You ${beautifyStatus(status.state)}`);
//         })}`}
//       </div>
//     );
//   } else {
//     return (
//       <div className='status-container'>
//         <Emoji symbol={chooseEmoji(state)}/>
//         <p className='boldText'>{beautifyStatus(state)}</p>
//       </div>
//     );
//   }
// }

// export default Status;