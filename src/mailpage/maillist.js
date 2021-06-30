import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { element } from 'prop-types';
function Maillist(props) {
	//  let result_array;
	// const [result_array, setResult_array] = useState([]);
    // const result_array = props.result_array;
	//props.setIsLogined(localStorage.getItem('isLogined'));
	// const mailinfo = async () => {
	// 	const result = await axios.get(
	// 		`http://192.168.0.117:3000/readingmail/read`
	// 	);
	// 	console.log(result);
	// 	result_array = result.data;
	// 	console.log(result_array);
	// };
	// mailinfo();
	// const result = await axios.get(`http://192.168.0.117:3000/readingmail/read`);
	// setResult_array(result);
    //console.log('xxx');
	return props.isLogined ? (
		<div>
			{props.result_array3 &&
				props.result_array3.map((data) => {
					return <div>{data}</div>;
				})}
		</div>
	) : (
		<Redirect to='/' />
	);
    return <div>xxx</div>
}

export default Maillist;
