import axios from 'axios';
import React, { useState } from 'react';

function Schedule() {
	const [date, setDate] = useState('');

	const onChange = (e) => {
		setDate(e.target.value);
	};

	const getSchedule = async () => {
		const result = await axios.get(
			`http://192.168.0.117:3000/schedule/${date}`
		);
		console.log(result);
	};

	const onClick = (e) => {
		e.preventDefault();
		getSchedule();
	};
	return (
		<div class='main'>
			<div class='main_search_box'>
				<input
					type='date'
					placeholder='날짜 입력'
					name='date'
					class='main_serch_date'
					onChange={onChange}
				/>
				<button class='main_search_btn' onClick={onClick}>
					검색
				</button>
			</div>
		</div>
	);
}

export default Schedule;
