import axios from 'axios';
import React,{ useState } from 'react';
import Modal from 'react-modal';

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

function AddCallState(props){
	const { open, closeSave, closeCancle, uid } = props;
	/*
	const [inputs, setInputs] = useState({
		name:'',
		date:'',
		bound:'',
		email:'',
		digit:'',
		attend:'',
		recorder:'',
		guitar:''
	})

	const handleOnChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		})
	}
	*/
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [bound, setBound] = useState('');
	const [email, setEmail] = useState('');
	const [digit, setDigit] = useState('');
	const [attend, setAttend] = useState('');
	const [recorder, setRecorder] = useState('');
	const [guitar, setGuitar] = useState('');

	const handleName = (e) => {
		setName(e.target.value);
	}
	const handleDate = (e) => {
		setDate(e.target.value);
	}
	const handleBound = (e) => {
		setBound(e.target.value);
	}
	const handleEmail = (e) => {
		setEmail(e.target.value);
	}
	const handleDigit = (e) => {
		setDigit(e.target.value);
	}
	const handleAttend = (e) => {
		setAttend(e.target.value);
	}
	const handleRecorder = (e) => {
		setRecorder(e.target.value);
	}
	const handleGuitar = (e) => {
		setGuitar(e.target.value);
	}
/*
	const closeSave = async() => {
		console.log(name);
		const result = await axios.post("/home/call_write/:cid", JSON.stringify({
			name: name,
			date: date,
			bound: bound,
			email: email,
			digit: digit,
			attend: attend,
			recorder: recorder,
			guitar: guitar
		}))
	}
*/

	const send = async() => {
		console.log(name);
		console.log(date);
		console.log(bound);
		console.log(email);
		console.log(digit);
		console.log(attend);
		console.log(recorder);
		console.log(guitar);
		const result = await axios.post("http://192.168.0.117:3000/home/call_write/:cid", JSON.stringify({
		 	c_manager: name,
		  	date: date,
		  	in_out: bound,
		  	m_email: email,
		  	m_ph: digit,
		  	participation: attend,
		  	uid: recorder,
		 	etc: guitar
		  }))
	}

	return (
			open ? (
				<div>
					<div>
						<span>담당자 이름: </span>
						<input name='name' type='text' placeholder='담당자 이름' onChange={handleName} />
					</div>
					<div>
						<span>연락일자: </span>
						<input name='date' type='date' placeholder='연락일자' onChange={handleDate} />
					</div>
					<div>
						<span>인/아웃바운드: </span>
						<input name='bound' type='text' placeholder='인/아웃바운드' onChange={handleBound} />
					</div>
					<div>
						<span>담당자 이메일 주소: </span>
						<input name='email' type='text' placeholder='담당자 이메일 주소' onChange={handleEmail} />
					</div>
					<div>
						<span>담당자 전화번호: </span>
						<input name='number' type='text' placeholder='담당자 전화번호' onChange={handleDigit} />
					</div>
					<div>
						<span>시설 참여 여부: </span>
						<input name='attend' type='text' placeholder='시설 참여 여부' onChange={handleAttend} />
					</div>
					<div>
						<span>기록자 이름: </span>
						<input name='recorder' type='text' placeholder='기록자 이름' value={uid} onChange={handleRecorder} />
					</div>
					<div>
						<span>특이사항: </span>
						<input name='guitar' type='text' placeholder='특이사항' onChange={handleGuitar} />
					</div>
					<button onClick={send}>저장</button>
					<button onClick={closeCancle}>닫기</button>
				</div>
			) : null
	);
};

export default AddCallState;
