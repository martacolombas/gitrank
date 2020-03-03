import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';

function App() {
	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
			setUsername(localStorage.getItem('username'));
		}
	}, []);

	function assignCredentials(usernameVal, tokenVal) {
		setUsername(usernameVal);
		setToken(tokenVal);
	}

	return token ? (
		<Dashboard token={token} username={username} />
	) : (
		<LoginPage assignCredentials={assignCredentials} />
	);
}

export default App;
