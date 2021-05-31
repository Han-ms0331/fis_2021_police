import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import Selected from './Selected';

function ScheduleManager(props) {
	const [resultSche, setResultSche] = useState([]);
	const [resultAgent, setResultAgent] = useState([]);
	const [isSearched, setIsSearched] = useState(false);
	const [month, setMonth] = useState('');
	const [select, setSelect] = useState(false);

	props.setIsLogined(localStorage.getItem('isLogined'));
	return props.isLogined ? (
		select ? (
			<Selected
				setSelect={setSelect}
				setResultSche={setResultSche}
				setIsSearched={setIsSearched}
			/>
		) : (
			<div class='calendar-container'>
				<CalendarHeader
					setMonth={setMonth}
					setResultSche={setResultSche}
					setResultAgent={setResultAgent}
					setIsSearched={setIsSearched}
				/>
				{isSearched ? (
					<CalendarBody
						resultSche={resultSche}
						resultAgent={resultAgent}
						month={month}
						setSelect={setSelect}
					/>
				) : null}
			</div>
		)
	) : (
		<Redirect to='/' />
	);
}

export default ScheduleManager;
