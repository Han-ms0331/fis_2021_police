import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function AddCallState(props) {
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
	const [date, setDate] = useState(
		today.year + '-' + today.month + '-' + today.date
	);
	let send_data = {
		c_manager: '',
		date: '',
		in_out: '',
		m_email: '',
		m_ph: '',
		participation: '',
		uid: localStorage.getItem('userID'),
		etc: '',
	};
	if (localStorage.getItem('sendData') !== null) {
		send_data = JSON.parse(localStorage.getItem('sendData'));
	}
	const [name, setName] = useState('');
	const [bound, setBound] = useState('');
	const [expectNumber, setNumber] = useState('');
	const [email, setEmail] = useState('');
	const [digit, setDigit] = useState('');
	const [attend, setAttend] = useState('');
	const [guitar, setGuitar] = useState('');
	const [done, setDone] = useState(false);
	const resettingRef = useRef(false);

	const handleName = (e) => {
		send_data.c_manager = e.target.value;
	};
	const handleDate = (e) => {
		send_data.date = e.target.value;
	};
	const handleBound = (e) => {
		send_data.in_out = e.target.value;
	};
	const handleNumber = (e) => {
		setNumber(e.target.value);
		console.log(expectNumber);
	};
	const handleEmail = (e) => {
		send_data.m_email = e.target.value;
	};
	const handleDigit = (e) => {
		send_data.m_ph = e.target.value;
	};
	const handleAttend = (e) => {
		send_data.participation = e.target.value;
	};
	const handleGuitar = (e) => {
		send_data.etc = e.target.value;
	};

	const send = async () => {
		localStorage.setItem('sendData', JSON.stringify(send_data));
		const result = await axios.post(
			`http://192.168.0.117:3000/home/call_write/${props.centerID}`,
			JSON.stringify(send_data)
		);
		resettingRef.current = true;
		clear();

		console.log(result.data.error);
		let error;
		if (result.data.error !== undefined) {
			error = true;
		} else {
			error = false;
			send_data = JSON.parse(localStorage.getItem('sendData'));
		}

		closeSave(error);
	};
	const clear = () => {
		setName('');
		setBound('');
		setEmail('');
		setDigit('');
		setAttend('');

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
		<div class='add_call_state'>
			<div>
				<span>담당자 이름: </span>
				<input
					name='name'
					type='text'
					placeholder='담당자 이름'
					onChange={handleName}
				/>
			</div>

			<div>
				<span>연락일자: </span>
				<input
					name='date'
					type='text'
					placeholder='연락일자'
					value={today.year + '-' + today.month + '-' + today.date}
					onChange={handleDate}
				/>
			</div>

			<div>
				<span>인/아웃바운드: </span>
				<select name='bound' onChange={handleBound}>
					<option value='인바운드/아웃바운드'>===선택===</option>
					<option value='인'>인</option>
					<option value='아웃'>아웃</option>
				</select>
			</div>

			<div>
				<span>예상인원: </span>
				<input
					name='estimate_num'
					type='text'
					placeholder='예상인원'
					onChange={handleNumber}
				/>
			</div>

			<div>
				<span>담당자 이메일 주소: </span>
				<input
					name='email'
					type='text'
					placeholder='담당자 이메일 주소'
					onChange={handleEmail}
				/>
			</div>

			<div>
				<span>담당자 전화번호: </span>
				<input
					name='number'
					type='text'
					placeholder='담당자 전화번호'
					onChange={handleDigit}
				/>
			</div>

			<div>
				<span>시설 참여 여부: </span>
				<select name='attend' onChange={handleAttend}>
					<option value='선택'>===선택===</option>
					<option value='참여'>참여</option>
					<option value='거부'>거부</option>
					<option value='보류'>보류</option>
				</select>
			</div>

			<div>
				<span>기록자 이름: </span>
				<input
					name='recorder'
					type='text'
					placeholder='기록자 이름'
					value={localStorage.getItem('userName')}
				/>
			</div>

			<div>
				<div>특이사항: </div>
				<textarea
					name='etc'
					placeholder='특이사항'
					onInput={handleGuitar}></textarea>
			</div>
			<div>
				<button onClick={send}>저장</button>

				<button onClick={closeCancle}>닫기</button>
			</div>
		</div>
	) : null;
}

export default AddCallState;
