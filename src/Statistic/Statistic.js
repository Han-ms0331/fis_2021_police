import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Line from './Line';
import '../css/Statistic.css';

function Statistic(props) {
	const [data, setData] = useState([]);

	let isAdmin = false;
	const [inputDate, setInputDate] = useState('');

	if (localStorage.getItem('userName') === 'admin') {
		isAdmin = true;
	}

	const send = async () => {
		console.log(inputDate);
		let date = new Date(inputDate);
		let year = date.getFullYear();
		let month = ('0' + (1 + date.getMonth())).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		const sendData = year + '-' + month + '-' + day;

		const result = await axios.get(
			`http://192.168.0.117:3000/${sendData}/statistic`
		);
		console.log(result);
		setData(result.data);
	};

	const onChange = (e) => {
		if (e.target.name === 'date') {
			setInputDate(e.target.value);
		}
	};

	const onClick = (e) => {
		if (e.target.name === 'search') {
			send();
		}
	};

	props.setIsLogined(localStorage.getItem('isLogined'));
	return isAdmin ? (
		props.isLogined ? (
			<div class='statistic_main'>
				<div class='statistic_header'>
					<div class='statistic_header_searchdate'>
						<span>날짜별 통화 조회 : </span>
						<input name='date' type='date' onChange={onChange} />
					</div>

					<input
						name='search'
						class='statistic_header_searchbtn'
						type='submit'
						onClick={onClick}
						value='검색'
					/>
				</div>
				<div class='static_body'>
					<Line array={data} />
				</div>
			</div>
		) : (
			<Redirect to='/' />
		)
	) : (
		<Redirect to='/home' />
	);
}
export default Statistic;
