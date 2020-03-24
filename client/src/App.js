import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginPage from './Components/LoginPage/LoginPage';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getIdFromLocation } from './helperFunc';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  /* the user can access the app through two different options:
  1. indicating username and token manually. In the case of GitHub Enterprise the user also needs to indicate the endpoint.
  2. Github authentication */

  useEffect(() => {
    // in case that the user is authenticated through github, an id will be attached to the url.
    const userId = getIdFromLocation();
    if (userId) {
      // if there's id, we need to look for the token stored in the ddbb
      fetch(`http://localhost:8080/users/${userId}`)
        .then(res => {
          return res.text();
        })
        .then(data => {
          try {
            const parsedData = JSON.parse(data);
            // save the token in localstorage
            localStorage.setItem('token', parsedData.token);
            localStorage.setItem('username', parsedData.username);
            // we change the state of the component since now the user is authenticated
            assignCredentials(parsedData.username, parsedData.token);
            // we redirect to the dashboard
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
