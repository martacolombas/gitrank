import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getIdFromLocation } from './helperFunc';

function App() {
  debugger;
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  useEffect(() => {
    const userId = getIdFromLocation();
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => {
          return res.text();
        })
        .then(data => {
          try {
            const parsedData = JSON.parse(data);
            localStorage.setItem('token', parsedData.token);
            setToken(parsedData.token);
            localStorage.setItem('username', parsedData.username);
            setUsername(parsedData.username);
            window.location.href = '/dashboard';
          } catch (e) {
            console.error(
              `Error in parsing json data while requesting user by Id : ${e}`
            );
          }
        });
    }
  }, []);

  function assignCredentials(usernameVal, tokenVal) {
    setUsername(usernameVal);
    setToken(tokenVal);
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute path='/dashboard'>
          <Dashboard token={token} username={username} />
        </PrivateRoute>
        <Route path='/login'>
          <LoginPage assignCredentials={assignCredentials} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
