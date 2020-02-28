import React, {useState, useEffect} from "react";
import "./App.css";
import Dashboard from "./dashboard-component/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./loginPage-component/LoginPage";
import ProtectedRoute from './Routes.js'

function App() {
  const [isAllowed, setAllowed] = useState('');

  useEffect(() => {
    //look in the localStorage
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} setAllowed={setAllowed}/>
        <ProtectedRoute isAllowed={isAllowed} exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
