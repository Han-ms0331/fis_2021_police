import React from 'react';

function AgentSchedule(props) {
	console.log(props.data);
	return (
		<div class='visit-container list-items'>
			<div class='agnet-id'>{props.data.aid}</div>
		</div>
	);
}

export default AgentSchedule;
