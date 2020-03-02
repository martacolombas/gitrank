import React, {useState, useEffect} from "react";
import "./App.css";
import Dashboard from "./dashboard-component/Dashboard";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setUsername(localStorage.getItem('username'));
    }
  }, [])

  function assignCredentials(usernameVal, tokenVal) {
    setUsername(usernameVal);
    setToken(tokenVal);
  }

  return token
    ? <Dashboard token={token} username={username}/>
    : <LoginPage assignCredentials={assignCredentials}/>
}

export default App;

   // <Router>
    //   <Switch>
    //     <Route path="/login" component={LoginPage} setAllowed={setAllowed}/>
    //     <ProtectedRoute isAllowed={isAllowed} exact path="/dashboard" component={Dashboard} />
    //   </Switch>
    // </Router>
