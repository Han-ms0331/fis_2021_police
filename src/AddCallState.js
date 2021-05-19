import axios from 'axios';
import React, { useState } from 'react';
import CallState from './callState.js';
import Modal from 'react-modal';
import './css/add.css'


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function AddCallState(props) {
	const { open, closeSave, closeCancle, uid } = props;
/*
	const sendIsLoading2 = () => {
		props.setIsLoading_2(false);
	}
*/
	const [recordContent, setRecordContent] = useState({
		name: '',
		date: '',
		bound: '',
		email: '',
		digit: '',
		attend: '',
		recorder: '',
		guitar: ''
	})

	const [viewContent, setViewContent] = useState([]);

	const [fuck, setFuck] = useState(false);

	const getValue = e => {
		const { name, value } = e.target;
		setRecordContent({
			...recordContent,
			[name]: value
		})
		console.log(recordContent);
	}

	const send = async () => {
		const result = await axios.post(
			`http://192.168.0.117:3000/home/call_write/${props.centerID}`,
			JSON.stringify({
				c_manager: recordContent.name,
				date: recordContent.date,
				in_out: recordContent.bound,
				m_email: recordContent.email,
				m_ph: recordContent.digit,
				participation: recordContent.attend,
				uid: localStorage.getItem('userID'),
				etc: recordContent.guitar,
			})
		);
		closeSave();	
	};

	if(open)
	{
		return (
	<div class='input_values'>

		<div>
			<span>담당자 이름: </span>
			<input
				name='name'
				type='text'
				placeholder='담당자 이름'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>연락일자: </span>
			<input
				name='date'
				type='date'
				placeholder='연락일자'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>인/아웃바운드: </span>
			<input
				name='bound'
				type='text'
				placeholder='인/아웃바운드'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>담당자 이메일 주소: </span>
			<input
				name='email'
				type='text'
				placeholder='담당자 이메일 주소'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>담당자 전화번호: </span>
			<input
				name='number'
				type='text'
				placeholder='담당자 전화번호'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>시설 참여 여부: </span>
			<input
				name='attend'
				type='text'
				placeholder='시설 참여 여부'
				onChange={getValue}
			/>
		</div>

		<div>
			<span>기록자 이름: </span>
			<input
				name='recorder'
				type='text'
				placeholder='기록자 이름'
				value={localStorage.getItem('userName')}
				onChange={getValue}
			/>
		</div>

		<div>
			<span>특이사항: </span>
			<input
				name='guitar'
				type='text'
				placeholder='특이사항'
				onChange={getValue}
			/>
		</div>

		<button onClick={() => {
			setViewContent(viewContent.concat({...recordContent}));
			console.log(recordContent.name);
			send();
			setFuck(true);
		//	sendIsLoading2();
		}}>저장</button>
		<button onClick={closeCancle}>닫기</button>

	</div>
	)
	}
	else{
		if(fuck)
		{
			return (
			<div class='list-itmes'>
			{viewContent.map(element =>
			  <div class='added_data'>
				  <div>담당자 이름:{element.name}</div>
				  <div>연락 일자:{element.date}</div>
				  <div>인/아웃바운드:{element.bound}</div>
				  <div>담당자 이메일 주소:{element.email}</div>
				  <div>담당자 전화번호:{element.digit}</div>
				  <div>시설 참여 여부:{element.attend}</div>
				  <div>기록자 이름:{element.recorder}</div>
				  <div>특이사항:{element.guitar}</div>
			  </div>
			)}
		</div>
		)
		}

		else{
			return null;
		}
	}
}

export default AddCallState;
