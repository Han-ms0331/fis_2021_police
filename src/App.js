import React, { useState } from 'react';
import Login from './login';
import Home from './Home';
import Schedule from './TotalSchedule';
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
			<Route path='/schedule' render={() => <Schedule />} />
		</BrowserRouter>
	);
}

export default App;
