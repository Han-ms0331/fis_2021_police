import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import '../css/readingSche.css';

function ReadingSche(props) {
	const [searchDate, setSearchDate] = useState('');
	const [IsSearched, setIsSearched] = useState(false);
	const [ary, setAry] = useState([]);

	let scheDate = Array.from(Array(11), () => Array(0).fill(null));
	const now = new Date(searchDate);
	const before3day = new Date(now.setDate(now.getDate() - 3));

	function getToday(indate) {
		let date = new Date(indate);
		let year = date.getFullYear();
		let month = ('0' + (1 + date.getMonth())).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}
	scheDate[0][0] = getToday(before3day);
	for (let i = 1; i < 11; i++) {
		scheDate[i][0] = getToday(new Date(now.setDate(now.getDate() + 1)));
	}

	let result = {};
	const getSchedule = async () => {
		console.log(searchDate);
		result = await axios.get(
			`http://localhost:3000/fullschedule/${searchDate}/`
		);
		console.log(result.data);

		scheDate.map((data, index) => {
			for (let i in result.data) {
				if (result.data[i].visit_date === data[0]) {
					scheDate[index].push(result.data[i]);
				}
			}
		});
		setAry(scheDate);

		localStorage.setItem('searchDate', searchDate);
	};
	const onClick = (e) => {
		e.preventDefault();
		getSchedule();
		setIsSearched(true);
	};
	const onChange = (e) => {
		if (e.target.name === 'Date') {
			setSearchDate(e.target.value);
		}
	};
	props.setIsLogined(localStorage.getItem('isLogined'));

	return props.isLogined ? (
		IsSearched ? (
			<div>
				<div class='RSbar'>
					<div>
						<span>날짜 : </span>
						<input
							name='Date'
							type='date'
							placeholder='날짜'
							onChange={onChange}
						/>
					</div>
					<input
						class='RSsearchbtn'
						name='search'
						type='submit'
						onClick={onClick}
						value='검색'
					/>
				</div>
				<div class='RSbox'>
					{ary.map((data) => {
						if (data.length > 1) {
							return (
								<div class='RSbox_date'>
									{data.map((data2, index) => {
										console.log(index);

										return index === 0 ? (
											<div class='RSdate'>{data2}</div>
										) : (
											<div class='RSdate_sche'>
												<div class='RSitem'>{data2.aid}</div>
												<div class='RSitem'>{data2.c_address}</div>
												<div class='RSitem'>{data2.c_name}</div>
												<div class='RSitem'>{data2.visit_time}</div>
												<div class='RSitem'>{data2.estimate_num}명</div>
												<div class='RSitem'>특이사항: {data2.etc}</div>
											</div>
										);
									})}
								</div>
							);
						} else {
							return (
								<div class='RSbox_date'>
									{<div class='RSdate'>{data[0]}</div>}
								</div>
							);
						}
					})}
				</div>
			</div>
		) : (
			<div class='RSbar'>
				<div>
					<span>날짜 : </span>
					<input
						name='Date'
						type='date'
						placeholder='날짜'
						onChange={onChange}
					/>
				</div>
				<input
					class='RSsearchbtn'
					name='search'
					type='submit'
					onClick={onClick}
					value='검색'
				/>
			</div>
		)
	) : (
		<Redirect to='/' />
	);
}

export default ReadingSche;
