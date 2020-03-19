import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setUsername(localStorage.getItem('username'));
    }

    window.addEventListener('online', setOfflineStatus);
    window.addEventListener('offline', setOfflineStatus);
    return function cleanup() {
      window.removeEventListener('online', setOfflineStatus);
      window.removeEventListener('offline', setOfflineStatus);
    };
  }, []);

  function setOfflineStatus() {
    setOffline(!navigator.onLine);
  }

  function assignCredentials(usernameVal, tokenVal) {
    setUsername(usernameVal);
    setToken(tokenVal);
  }

  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard token={token} username={username} offline={offline} />
        </Route>
        <Route path='/login'>
          <LoginPage assignCredentials={assignCredentials} offline={offline} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
