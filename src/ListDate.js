import React from 'react';

function ListDate(props) {
	console.log(props.month);
	const date = new Date(2021, props.month - 1, props.index + 1);
	const days = [
		'일요일',
		'월요일',
		'화요일',
		'수요일',
		'목요일',
		'금요일',
		'토요일',
	];
	const day = days[date.getDay()];
	return day === '일요일' || day === '토요일' ? null : (
		<div class='date-continer'>
			<div class='date-header'>
				<div class='date-month'>{props.month}</div>
				<div class='date-date'>{props.index + 1}</div>
				<div class='date-month'>{day}</div>
			</div>
		</div>
	);
}

export default ListDate;
