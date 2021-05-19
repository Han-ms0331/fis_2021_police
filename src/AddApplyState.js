import React, { useState } from 'react';
import axios from 'axios';

function AddApplyState(props) {
	const { open, closeSave, closeCancle, uid } = props;

	const [recordContent, setRecordContent] = useState({
		agent: '',
		progress: '',
		expectNumber: '',
		currentDate: '',
		expectDate: '',
		expectTime: '',
		recorder: '',
		guitar: ''
	})

	const [viewContent, setViewContent] = useState([]);

	const getValue = e => {
		const { name, value } = e.target;
		setRecordContent({
			...recordContent,
			[name]: value
		})
		console.log(recordContent);
	}
/*
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
*/
	const send = async () => {
		const result = await axios.post(
			`http://192.168.0.117:3000/home/applysave`,
			JSON.stringify({
				aid: recordContent.agent,
				collect: recordContent.progress,
				estimate_num: recordContent.expectNumber,
				recept_date: recordContent.currentDate,
				visit_date: recordContent.expectDate,
				visit_time: recordContent.expectTime,
				uid: localStorage.getItem('userID'),
				cid: props.cid,
				etc: recordContent.guitar,
			})
		);
		closeSave();
<<<<<<< HEAD
		//window.location.reload();
=======
>>>>>>> 89953f4038ae13c0af20d5b373c6ee1e07e29d8e
	};

	return open ? (
		<div>
			<div>
				<span>현장요원: </span>
<<<<<<< HEAD
				<input 
					type='text' 
					placeholder='현장요원'
					onChange={getValue} 
				/>
=======
				<input type='text' placeholder='현장요원' onChange={handleAgent} />
>>>>>>> 89953f4038ae13c0af20d5b373c6ee1e07e29d8e
			</div>

			<div>
				<span>진행여부: </span>
<<<<<<< HEAD
				<input 
					type='text' 
					placeholder='진행여부' 
					onChange={getValue} 
				/>
=======
				<input type='text' placeholder='진행여부' onChange={handleProgress} />
>>>>>>> 89953f4038ae13c0af20d5b373c6ee1e07e29d8e
			</div>

			<div>
				<span>예상 인원: </span>
				<input
					type='text'
					placeholder='예상 인원'
					onChange={getValue}
				/>
			</div>

			<div>
				<span>예약 날짜: </span>
				<input
					type='date'
					placeholder='예약 날짜'
					onChange={getValue}
				/>
			</div>

			<div>
				<span>방문 예정 날짜: </span>
				<input
					type='date'
					placeholder='방분 예정 날짜'
					onChange={getValue}
				/>
			</div>

			<div>
				<span>방문 예정 시간: </span>
				<input
					type='time'
					placeholder='방문 예정 시간'
					onChange={getValue}
				/>
			</div>

			<div>
				<span>기록자 이름: </span>
				<input
					type='text'
					placeholder='기록자 이름'
					value={localStorage.getItem('userName')}
					onChange={getValue}
				/>
			</div>

			<div>
				<span>특이사항: </span>
<<<<<<< HEAD
				<input 
					type='text' 
					placeholder='특이사항' 
					onChange={getValue} 
				/>
=======
				<input type='text' placeholder='특이사항' onChange={handleGuitar} />
>>>>>>> 89953f4038ae13c0af20d5b373c6ee1e07e29d8e
			</div>

			<div class='add data'>
				{viewContent.map(element =>
				  <div>
					  <div>담당자 이름:{element.agent}</div>
					  <div>연락 일자:{element.progress}</div>
					  <div>인/아웃바운드:{element.expectNumber}</div>
					  <div>담당자 이메일 주호:{element.currentDate}</div>
					  <div>담당자 전화번호:{element.expectDate}</div>
					  <div>시설 참여 여부:{element.expectTime}</div>
					  <div>기록자 이름:{element.recorder}</div>
					  <div>특이사항:{element.guitar}</div>
				  </div>
				)}
			</div>

			<button onClick={() => {
				setViewContent(viewContent.concat({...recordContent}));
				console.log(recordContent.name);
				send();
			}}>저장</button>
			<button onClick={closeCancle}>닫기</button>
		</div>
	) : null;
}

export default AddApplyState;
