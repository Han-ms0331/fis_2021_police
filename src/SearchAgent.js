import axios from 'axios';
import React, { useState } from 'react';
import './css/SearchAgent.css';
import AgentList from './AgentList';

function SearchAgent(props) {
	const [region, setRegieon] = useState('');
	const [date, setDate] = useState('');
	const [result_ary, setResult_ary] = useState([]);

	const handleDate = (e) => {
		setDate(e.target.value);
	};
	const handleRegion = (e) => {
		setRegieon(e.target.value);
	};
	const getSchedule = async () => {
		const result = await axios.get(
			`http://192.168.0.117:3000/home/get_agent/${region}/${date}`
		);
		console.log(result.data);
		setResult_ary(result.data);
	};
	const onClick = (e) => {
		e.preventDefault();
		getSchedule();
	};
	console.log(region);
	console.log(date);
	return (
		<div class='main-container'>
			<div class='searchAgent'>
				<div class='searchAgent_aid searchAgent-list'>
					<input type='text' placeholder='지역' onChange={handleRegion} />
				</div>
				<div class='searchAgent_date searchAgent-list'>
					<input
						type='date'
						placeholder='날짜'
						onChange={handleDate}
						styles='width:500px;'
					/>
				</div>
				<button onClick={onClick}>검색</button>
			</div>
			<div class='searchAgent-result'>
				<ul class='searchAgent-result-list list'>
					{result_ary.map((data) => (
						<li key={data.agent_id} class='agent-list'>
							<AgentList agent_list={data} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default SearchAgent;
