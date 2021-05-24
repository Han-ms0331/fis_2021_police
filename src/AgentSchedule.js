import React from 'react';

function AgentSchedule(props) {
	console.log(props.agent_schedule);
	return (
		<div class='visit-container list-items'>
			<div class='visit-time'>방문시간:{props.agent_schedule.visit_time}</div>
			<div class='estimate-num'>
				예정인원:{props.agent_schedule.estimate_num}
			</div>
		</div>
	);
}

export default AgentSchedule;
