import React, { useState, useRef, useEffect } from 'react';
import CalenderDate from './CalenderDate';
import './css/Calendar.css';
function ScheduleManager(props) {
	const box = Array(42).fill(null);
	let collect_schedule = Array.from(Array(31), () => Array(0).fill(null));
	const date_check = new Date(2021, props.month, 0).getDate();
	let first_day = new Date(2021, props.month - 1, 1).getDay();
	const delay = first_day;
	let view = false;
	let date = null;
	for (let i in props.resultSche) {
		const cd = new Date(props.resultSche[i].visit_date);
		collect_schedule[cd.getDate() - 1].push(props.resultSche[i]);
	}

	return (
		<div class='calendar-body-container'>
			<div class='calendar-box'>
				<div class='calendar-day sunday'>일요일</div>
				<div class='calendar-day'>월요일</div>
				<div class='calendar-day'>화요일</div>
				<div class='calendar-day'>수요일</div>
				<div class='calendar-day'>목요일</div>
				<div class='calendar-day'>금요일</div>
				<div class='calendar-day saturday'>토요일</div>
				{box.map((data, index) => {
					if (index === delay) {
						view = true;
						date = 0;
					}
					if (view === true) {
						date = date + 1;
					}
					if (date_check < date) {
						view = false;
						date = null;
					}
					return (
						<div
							class={
								props.currentDate === date
									? 'calender-datebox-selected'
									: 'calendar-datebox'
							}>
							<div class='datebox-date'>{date}</div>
							<CalenderDate
								resultAgent={props.resultAgent}
								month={props.month}
								date={date}
								view={view}
								schedule={collect_schedule[date - 1]}
								setSelect={props.setSelect}
								setSelectDate={props.setSelectDate}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ScheduleManager;
