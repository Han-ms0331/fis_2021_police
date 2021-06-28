import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { element } from 'prop-types';
async function Maillist(props) {
	// let result_array;
	const [result_array, setResult_array] = useState([]);
	props.setIsLogined(localStorage.getItem('isLogined'));
	// const mailinfo = async () => {
	// 	const result = await axios.get(
	// 		`http://192.168.0.117:3000/readingmail/read`
	// 	);
	// 	console.log(result);
	// 	result_array = result.data;
	// 	console.log(result_array);
	// };
	// mailinfo();
	const result = await axios.get(`http://192.168.0.117:3000/readingmail/read`);
	setResult_array(result);
	return props.isLogined ? (
		<div>
			{result_array &&
				result_array.map((data) => {
					return <div>data</div>;
				})}
		</div>
	) : (
		<Redirect to='/' />
	);
}

export default Maillist;
