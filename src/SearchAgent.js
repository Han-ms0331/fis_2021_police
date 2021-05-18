import axios from 'axios';
import React, { useState } from 'react';

function SearchAgent(props) {
	const [region, setRegieon] = useState('');
	const [date, setDate] = useState('');

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
		console.log(result);
	};
	const onClick = (e) => {
		e.preventDefault();
		getSchedule();
	};
	console.log(region);
	console.log(date);
	return (
		<div class='searchAgent'>
			<div class='searchAgent_aid'>
				<input type='text' placeholder='지역' onChange={handleRegion} />
			</div>
			<div class='searchAgent_date'>
				<input
					type='date'
					placeholder='날짜'
					onChange={handleDate}
					styles='width:500px;'
				/>
			</div>
			<button onClick={onClick}>검색</button>
		</div>
	);
}
export default SearchAgent;
