import React from 'react';
import './Dashboard.css';
import List from '../list-component/List';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRS } from '../ApiClient';

library.add(fas);

function Dashboard() {
  const { loading, data, error } = useQuery(GET_PRS);

  if(error) return <p>Error</p> // todo make an error page

  let prs = [];
  if (data) {
    data.user.repositories.nodes.map(element => {
      return ({
        prs: element.pullRequests
      });
    }).map(element => {
        return ({
          prs: element.prs.nodes
        });
    }).filter(element => {
      return element.prs.length > 0;
    }).map(element => {
      return element.prs;
    }).forEach(element => {
      prs.push(...element);
    });}

  return (
    <div className='leaderboard'>
      <div className ='mainTitle-container'>
        Your PRs dashboard
      </div>
      {loading
      ? <p>Loading</p>
      : <List prs={prs} />}
    </div>
  );
}

export default Dashboard;
