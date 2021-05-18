import React, { useState } from 'react';
import Login from './login';
import Home from './Home';
import Schedule from './TotalSchedule';
import Navigation from './Navigation';
import Logout from './Logout';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	const [userName, setUserName] = useState('');
	const [passWord, setPassWord] = useState('');
	const [isLogined, setIsLogined] = useState(false);
	const [UID, setUID] = useState('');

	const loginState = (condition) => {
		setIsLogined(condition);
	};

	return (
		<BrowserRouter>
			{isLogined ? <Navigation /> : null}

			<Route
				path='/'
				render={() => (
					<Login
						userName={userName}
						setUserName={setUserName}
						passWord={passWord}
						setPassWord={setPassWord}
						isLogined={isLogined}
						setIsLogined={setIsLogined}
						UID={UID}
						setUID={setUID}
						loginState={loginState}
					/>
				)}
				exact
			/>
			<Route
				path='/home'
				render={() => (
					<Home isLogined={isLogined} setIsLogined={setIsLogined} />
				)}
			/>
			<Route
				path='/schedule'
				render={() => (
					<Schedule isLogined={isLogined} setIsLogined={setIsLogined} />
				)}
			/>
			<Route
				path='/logout'
				render={() => (
					<Logout isLogined={isLogined} setIsLogined={setIsLogined} />
				)}
			/>
		</BrowserRouter>
	);
}

export default App;
