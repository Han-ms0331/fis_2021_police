import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';

function ScheduleManager(props) {
	const [searchMonth, setSearchMonth] = useState('');
	const [searchRegion, setSearchRegion] = useState('');

	const getSchedule = async () => {
		let result = await axios.get(
			`http://192.168.0.117:3000/schedule/${searchRegion}/${searchMonth}`
		);
		console.log(result);
		localStorage.setItem('searchMonth', searchMonth);
		localStorage.setItem('searchRegion', searchRegion);
		props.setResultSche(result.data.sches);
		props.setResultAgent(result.data.agents);
	};
	const onClick = (e) => {
		//		e.preventDefault();
		getSchedule();
		props.setIsSearched(true);
	};
	const onChange = (e) => {
		if (e.target.name === 'region') {
			setSearchRegion(e.target.value);
		} else if (e.target.name === 'month') {
			props.setMonth(e.target.value);
			setSearchMonth(e.target.value);
		}
		props.setIsSearched(false);
	};
	const onKeyPress = (e) => {
		if (e.key == 'Enter') {
			onClick();
		}
	};
	return (
		<div class='calendar-header-container'>
			<div class='calendar_header_window'>
				<span>현장요원 : </span>
				<input
					name='region'
					type='text'
					placeholder='현장요원'
					onChange={onChange}
					onKeyPress={onKeyPress}
				/>
			</div>
			<div class='calendar_header_window'>
				<span>월 : </span>
				<input
					name='month'
					type='number'
					placeholder='월'
					onChange={onChange}
					onKeyPress={onKeyPress}
				/>
			</div>

			<input
				name='search'
				class='calendar_header_window'
				type='submit'
				onClick={onClick}
				value='검색'
			/>
		</div>
	);
}

export default ScheduleManager;
