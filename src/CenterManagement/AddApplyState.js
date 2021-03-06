import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AddApplyState(props) {
	const { open, closeSave, closeCancle } = props;

	const today = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		date: new Date().getDate(),
	};
	if (today.month < 10) {
		today.month = '0' + today.month;
	}
	if (today.day < 10) {
		today.day = '0' + today.day;
	}

	const [agent, setAgent] = useState('');
	const [expectNumber, setExpectNumber] = useState('');
	const [currentDate, setCurrentDate] = useState(
		today.year + '-' + today.month + '-' + today.date
	);
	const [expectDate, setExpectDate] = useState('');
	const [expectTime, setExpectTime] = useState('');
	const [guitar, setGuitar] = useState('');
	const [done, setDone] = useState(false);
	const resettingRef = useRef(false);

	const handleAgent = (e) => {
		setAgent(e.target.value);
	};

	const handleExpectNumber = (e) => {
		setExpectNumber(e.target.value);
	};
	const handleCurrentDate = (e) => {
		setCurrentDate(e.target.value);
	};
	const handleExpectDate = (e) => {
		setExpectDate(e.target.value);
	};
	const handleExpectTime = (e) => {
		setExpectTime(e.target.value);
	};
	const handleRecorder = (e) => {};
	const handleGuitar = (e) => {
		setGuitar(e.target.value);
	};

	const send = async () => {
		const result = await axios.post(
			`http://192.168.0.117:3000/home/applysave`,
			JSON.stringify({
				aid: agent,
				estimate_num: expectNumber,
				recept_date: currentDate,
				visit_date: expectDate,
				visit_time: expectTime,
				uid: localStorage.getItem('userID'),
				cid: props.cid,
				etc: guitar,
			})
		);
		resettingRef.current = true;
		clear();
		console.log(result);
		let error;
		if (result.data.error !== undefined) {
			error = true;
		} else {
			error = false;
		}
		closeSave(error);
	};

	const clear = () => {
		setAgent('');
		setExpectNumber('');
		setExpectDate('');
		setExpectTime('');
		setGuitar('');
		setDone(true);
	};
	useEffect(() => {
		if (resettingRef.current) {
			resettingRef.current = false;
			clear();
		}
	}, [done]);

	return open ? (
		<div>
			<div>
				<span>????????????: </span>
				<input type='text' placeholder='????????????' onChange={handleAgent} />
			</div>

			<div>
				<span>?????? ??????: </span>
				<input
					type='text'
					placeholder='?????? ??????'
					onChange={handleExpectNumber}
				/>
			</div>

			<div>
				<span>?????? ??????: </span>
				<input
					type='text		'
					placeholder='?????? ??????'
					onChange={handleCurrentDate}
					value={today.year + '-' + today.month + '-' + today.date}
				/>
			</div>

			<div>
				<span>?????? ?????? ??????: </span>
				<input
					type='date'
					placeholder='?????? ?????? ??????'
					onChange={handleExpectDate}
				/>
			</div>

			<div>
				<span>?????? ?????? ??????: </span>
				<input
					type='time'
					placeholder='?????? ?????? ??????'
					onChange={handleExpectTime}
				/>
			</div>

			<div>
				<span>????????? ??????: </span>
				<input
					type='text'
					placeholder='????????? ??????'
					value={localStorage.getItem('userName')}
					onChange={handleRecorder}
				/>
			</div>

			<div>
				<span>????????????: </span>
				<textarea
					name='etc'
					placeholder='????????????'
					onInput={handleGuitar}></textarea>
			</div>

			<button onClick={send}>??????</button>
			<button onClick={closeCancle}>??????</button>
		</div>
	) : null;
}

export default AddApplyState;
