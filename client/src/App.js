import React, { useState } from 'react';
import './App.css';
import List from './list-component/List';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRS } from './ApiClient';

library.add(fas);

function App() {
  const [prs, setPrs] = useState([])
  const { loading, data, error } = useQuery(GET_PRS, {onCompleted: setPrs});

  return (
    <div className='leaderboard'>
      <div className ='mainTitle-container'>
        Your PRs dashboard
      </div>
      {loading
      ? <p>Loading</p>
      :<List prs ={prs.user.repositories} />}
    </div>
  );
}

export default App;
