import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import SearchAgent from './SearchAgent';
import SearchDate from './SearchDate';

function Schedule(props) {
	const [date, setDate] = useState('');
	const [result_ary, setResult_ary] = useState([]);
	const onChange = (e) => {
		setDate(e.target.value);
	};

	const getSchedule = async () => {
		const result = await axios.get(
			`http://192.168.0.117:3000/schedule/${date}`
		);
		console.log(result);
		setResult_ary(result.data);
	};

	const onClick = (e) => {
		e.preventDefault();
		getSchedule();
	};
	props.setIsLogined(localStorage.getItem('isLogined'));
	return props.isLogined ? (
		<div class='search-main'>
			<div class='search-main_search_box'>
				<input
					type='date'
					placeholder='날짜 입력'
					name='date'
					class='main_serch_date'
					onChange={onChange}
				/>
				<button class='search-main_search_btn' onClick={onClick}>
					검색
				</button>
			</div>
			<div class='search-schedule-result'>
				<div class='search-schedule-date'></div>
				<div class='search-schedule-date'>
					<ul class='list agent-schedule-list'>
						<li>
							<div class='search-date-result'>
								<div class='search-date-aid result'>현장요원</div>
								<div class='search-date-visit_time result'>방문시간</div>
								<div class='search-date-estimate_num result'>예상인원</div>
								<div class='search-date-c_name result'>시설이름</div>
								<div class='search-date-c_address result'>시설주소</div>
							</div>
						</li>
						{result_ary.map((data) => (
							<li key={data} class='list-items search-schedule-items'>
								<SearchDate search_result={data} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	) : (
		<Redirect to='/' />
	);
}

export default Schedule;
