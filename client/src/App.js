import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage';

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

	return token ? (
		<Dashboard token={token} username={username} offline={offline} />
	) : (
		<LoginPage assignCredentials={assignCredentials} offline={offline} />
	);
}

export default App;
