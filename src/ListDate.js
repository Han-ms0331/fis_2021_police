import React, { useState } from 'react';
import AgentSchedule from './AgentSchedule';

function ListDate(props) {
	console.log(props.list);
	const date = new Date(2021, props.month - 1, props.index + 1);

	let result = props.list;
	// console.log(result);
	return <span>hello</span>;
}

export default ListDate;
