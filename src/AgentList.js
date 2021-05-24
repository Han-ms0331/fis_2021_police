import React from 'react';
import AgentSchedule from './AgentSchedule';

function AgentList(props) {
	console.log(props.agent_list);
	return (
		<div class='agent-container'>
			<div class='agent-name'>{props.agent_list.a_name}</div>
			<div class='agent-schdule'>
				<ul class='list'>
					{props.agent_list.visit.map((data) => (
						<li key={data.agent_id} class='agent-list-date'>
							<AgentSchedule agent_schedule={data} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default AgentList;
