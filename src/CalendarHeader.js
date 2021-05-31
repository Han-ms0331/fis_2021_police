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
		localStorage.setItem('searchMonth', searchMonth);
		localStorage.setItem('searchRegion', searchRegion);
		props.setResultSche(result.data.sches);
		props.setResultAgent(result.data.agents);
	};
	const onClick = (e) => {
		e.preventDefault();
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

	return (
		<div class='calendar-header-container'>
			<input name='region' type='text' onChange={onChange} />
			<input name='month' type='number' onChange={onChange} />
			<input name='search' type='submit' onClick={onClick} value='검색' />
		</div>
	);
}

export default ScheduleManager;
