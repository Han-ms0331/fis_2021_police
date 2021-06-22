import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

function AgentManagement(props) {
	let isAdmin = false;
	if (localStorage.getItem('userName') === 'admin') {
		isAdmin = true;
	}
	props.setIsLogined(localStorage.getItem('isLogined'));
	return isAdmin ? (
		props.isLogined ? (
			<div>조회 및 출력 페이지</div>
		) : (
			<Redirect to='/' />
		)
	) : (
		<Redirect to='/home' />
	);
}
export default AgentManagement;
