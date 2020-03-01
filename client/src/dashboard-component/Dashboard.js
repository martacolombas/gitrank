import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import List from '../list-component/List';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRS } from '../ApiClient';

library.add(fas);

function Dashboard({token, username}) {
  const [credentials, setCredentials] = useState({});
  const [pinnedItems, setPinnedItems] = useState([]);

  useEffect(() => {
    setCredentials({token, username});
  }, [])

  const { loading, data, error } = useQuery(GET_PRS, {
    variables: {
      login: `${credentials.username}`
    }
  });

  // setInterval(function(){ alert("Hello"); }, 3000); set interval to refresh the data inside the comp.

  if(error) return <p>Error</p> // todo make an error page

  let resultCall = [];
  if (data) {
    data.user.repositories.nodes.map(element => {
      return ({
        resultCall: element.pullRequests
      });
    }).map(element => {
        return ({
          resultCall: element.resultCall.nodes
        });
    }).filter(element => {
      return element.resultCall.length > 0;
    }).map(element => {
      return element.resultCall;
    }).forEach(element => {
      resultCall.push(...element);
    });}

  let notPinned = resultCall
  .filter(element => !pinnedItems
    .includes(element.id))
    .sort((a,b)=> a.createdAt-b.createdAt);

  let pinned = resultCall
  .filter(element => pinnedItems
    .includes(element.id))
    .sort((a,b)=> b.createdAt-a.createdAt);

  let prs = [...pinned, ...notPinned];


  return (
    <div className='leaderboard'>
      <div className ='mainTitle-container'>
        Your PRs dashboard
      </div>
      {loading
      ? <p>Loading</p>
      : <List prs={prs} setPinnedItems={setPinnedItems}/>}
    </div>
  );
}

export default Dashboard;
