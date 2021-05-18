import React from 'react';
import './css/login.css';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';

function Login(props) {
	const getLogin = async () => {
		const result = await axios.post(
			'http://192.168.0.117:3000/login',
			JSON.stringify({
				username: props.userName,
				password: props.passWord,
			}),

			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);
		console.log(result.data);
		if (result.data.success) {
			props.setIsLogined(true);
			localStorage.setItem('isLogined', true);
			props.setUID(result.data.userID);
		}
	};
	const sendLoginState = (e) => {
		console.log(props.userName);
		console.log(props.passWord);
		console.log(props.isLogined);
		e.preventDefault();
		getLogin();
		console.log(props.isLogined);
		props.history.push('/home');
	};

	props.setIsLogined(localStorage.getItem('isLogined'));
	return props.isLogined ? (
		<div class='inner-container'>
			<div class='header'>
				<h2>Log-In</h2>

				<div class='input-group'>
					<h4>Username</h4>
					<input
						type='text'
						name='userName'
						class='login-input'
						placeholder='Username'
						value={props.userName}
						onChange={({ target: { value } }) => props.setUserName(value)}
					/>
				</div>

				<div class='input-group'>
					<h4>Password</h4>
					<input
						type='password'
						name='passWord'
						class='login-input'
						placeholder='Password'
						value={props.passWord}
						onChange={({ target: { value } }) => props.setPassWord(value)}
					/>
				</div>

				<button type='button' class='login-btn' onClick={sendLoginState}>
					Login
				</button>
			</div>
		</div>
	) : (
		<Redirect to='/home' />
	);
}

export default withRouter(Login);
