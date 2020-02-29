import React, {useState, useEffect} from "react";
import "./App.css";
import Dashboard from "./dashboard-component/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./loginPage-component/LoginPage";
import ProtectedRoute from './Routes.js'
import Login from "./login-component/Login";

function App() {
  const [isAllowed, setAllowed] = useState(false);
  const [token, setToken] = useState('')

  useEffect(() => {
    if(isAllowed) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  function assignToken(tokenVal) {
    setToken(tokenVal);
    setAllowed(true);
  }

  console.log(token)

  return token
    ? <Dashboard token={token}/>
    : <LoginPage assignToken={assignToken}/>
}

export default App;

   // <Router>
    //   <Switch>
    //     <Route path="/login" component={LoginPage} setAllowed={setAllowed}/>
    //     <ProtectedRoute isAllowed={isAllowed} exact path="/dashboard" component={Dashboard} />
    //   </Switch>
    // </Router>
