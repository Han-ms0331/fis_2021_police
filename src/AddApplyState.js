import React, { useState } from 'react';
import axios from 'axios';

function AddApplyState(props) {
	const { open, closeSave, closeCancle, uid } = props;

	const [agent, setAgent] = useState('');
	const [progress, setProgress] = useState('');
	const [expectNumber, setExpectNumber] = useState('');
	const [currentDate, setCurrentDate] = useState('');
	const [expectDate, setExpectDate] = useState('');
	const [expectTime, setExpectTime] = useState('');
	const [recorder, setRecorder] = useState('');
	const [guitar, setGuitar] = useState('');

	const handleAgent = (e) => {
		setAgent(e.target.value);
	};
	const handleProgress = (e) => {
		setProgress(e.target.value);
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
	const handleRecorder = (e) => {
		setRecorder(e.target.value);
	};
	const handleGuitar = (e) => {
		setGuitar(e.target.value);
	};

	const send = async () => {
		console.log(agent);
		console.log(progress);
		console.log(expectNumber);
		console.log(currentDate);
		console.log(expectDate);
		console.log(expectTime);
		console.log(recorder);
		console.log(props.cid);
		const result = await axios.post(
			`http://192.168.0.117:3000/home/applysave`,
			JSON.stringify({
				aid: agent,
				collect: progress,
				estimate_num: expectNumber,
				recept_date: currentDate,
				visit_date: expectDate,
				visit_time: expectTime,
				uid: localStorage.getItem('userID'),
				cid: props.cid,
				etc: guitar,
			})
		);
		closeSave();
		window.location.reload();
	};

	return open ? (
		<div>
			<div>
				<span>현장요원: </span>
				<input 
					type='text' 
					placeholder='현장요원'
					onChange={handleAgent} 
				/>
			</div>

			<div>
				<span>진행여부: </span>
				<input 
					type='text' 
					placeholder='진행여부' 
					onChange={handleProgress} 
				/>
			</div>

			<div>
				<span>예상 인원: </span>
				<input
					type='text'
					placeholder='예상 인원'
					onChange={handleExpectNumber}
				/>
			</div>

			<div>
				<span>예약 날짜: </span>
				<input
					type='date'
					placeholder='예약 날짜'
					onChange={handleCurrentDate}
				/>
			</div>

			<div>
				<span>방문 예정 날짜: </span>
				<input
					type='date'
					placeholder='방분 예정 날짜'
					onChange={handleExpectDate}
				/>
			</div>

			<div>
				<span>방문 예정 시간: </span>
				<input
					type='time'
					placeholder='방문 예정 시간'
					onChange={handleExpectTime}
				/>
			</div>

			<div>
				<span>기록자 이름: </span>
				<input
					type='text'
					placeholder='기록자 이름'
					value={localStorage.getItem('userName')}
					onChange={handleRecorder}
				/>
			</div>

			<div>
				<span>특이사항: </span>
				<input 
					type='text' 
					placeholder='특이사항' 
					onChange={handleGuitar} 
				/>
			</div>

			<button onClick={send}>저장</button>
			<button onClick={closeCancle}>닫기</button>
			
		</div>
	) : null;
}

export default AddApplyState;
