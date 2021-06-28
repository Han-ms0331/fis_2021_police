import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

function Statistic(props) {
	const [data, setData] = useState([]);

	let isAdmin = false;
	let inputDate = '';

	if (localStorage.getItem('userName') === 'admin') {
		isAdmin = true;
	}

	const send = async () => {
		let date = new Date(inputDate);
		let sendData = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
		const result = await axios.get(
			`http://192.168.0.117:3000/${sendData}/statistic`
		);
		console.log(result);
		setData(result);
	};

	const onChange = (e) => {
		if (e.target.name === 'date') {
			inputDate = e.target.valuel;
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
			</div>
		) : (
			<Redirect to='/' />
		)
	) : (
		<Redirect to='/home' />
	);
}
export default Statistic;
