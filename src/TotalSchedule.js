import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import SearchAgent from './SearchAgent';
import ListDate from './ListDate';

function Schedule(props) {
	const [region, setRegion] = useState('');
	const [month, setMonth] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	let result_month;
	const [result_ary, setResult_ary] = useState([]);
	const date_check = new Date(2021, month, 0);
	const date = date_check.getDate();
	const onChangeR = (e) => {
		setRegion(e.target.value);
		setIsSearch(false);
	};
	const onChangeM = (e) => {
		setMonth(e.target.value);
		setIsSearch(false);
	};
	const date_30 = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25, 26, 27, 28, 29, 30,
	];
	const date_31 = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
	];

	const getSchedule = async () => {
		const result = await axios.get(
			`http://192.168.0.117:3000/schedule/${region}`
		);
		console.log(result);
		setResult_ary(result.data);
	};

	const onClick = (e) => {
		e.preventDefault();
		// result_month = month;
		setIsSearch(true);
		getSchedule();
	};
	props.setIsLogined(localStorage.getItem('isLogined'));
	return props.isLogined ? (
		<div class='search-main'>
			<div class='search-main_search_box'>
				<input
					type='text'
					placeholder='지역 입력'
					name='region'
					class='main_serch_date'
					onChange={onChangeR}
				/>
				<input
					type='number'
					placeholder='월 입력'
					min='1'
					max='12'
					name='date'
					class='main_serch_date'
					onChange={onChangeM}
				/>
				<button class='search-main_search_btn' onClick={onClick}>
					검색
				</button>
			</div>
			<div class='search-schedule-result'>
				<div class='search-schedule-date'>
					{isSearch ? (
						<ul class='agent-schedule-list'>
							{date === 30
								? date_30.map((data, index) => (
										<li key={index} class='agent-schedule-item'>
											<ListDate list={data} month={month} index={index} />
										</li>
								  ))
								: date_31.map((data, index) => (
										<li key={index} class='agent-schedule-item'>
											<ListDate list={data} month={month} index={index} />
										</li>
								  ))}
						</ul>
					) : null}
				</div>
			</div>
		</div>
	) : (
		<Redirect to='/' />
	);
}

export default Schedule;
