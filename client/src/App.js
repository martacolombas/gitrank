import React, {useState} from "react";
import "./App.css";
import Dashboard from "./dashboard-component/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./loginPage-component/LoginPage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState('');

  return (
    <Router>
      <Switch>
          <Route path="/login">
            <LoginPage isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
