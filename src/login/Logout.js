import React from 'react';
import { Redirect } from 'react-router';

function Logout(props) {
	localStorage.removeItem('isLogined');
	localStorage.removeItem('userName');
	localStorage.removeItem('userID');
	props.setIsLogined(false);
	return <Redirect to='/' />;
}

export default Logout;
