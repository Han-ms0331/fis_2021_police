import axios from 'axios';
import React, { useState } from 'react';
import '../css/updateCallState.css';

function UpdateCallState(props) {
	const { data, update, closeCancel, setUpdate } = props;
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

	const send_data = {
		no : data.no,
		name: data.c_manager,
		date: data.date,
		in_out: data.in_out,
		m_email: data.m_email,
		m_ph: data.m_ph,
		participation: data.participation,
		uid: data.uid,
		etc: data.etc,
	};
	const onChange = (e) => {
		if (e.target.name === 'name') {
			send_data.name = e.target.value;
		} else if (e.target.name === 'date') {
			send_data.date = e.target.value;
		} else if (e.target.name === 'bound') {
			send_data.in_out = e.target.value;
		} else if (e.target.name === 'estimate_num') {
			send_data.estimate_num = e.target.value;
		} else if (e.target.name === 'm_email') {
			send_data.m_email = e.target.value;
		} else if (e.target.name === 'm_ph') {
			send_data.m_ph = e.target.value;
		} else if (e.target.name === 'participation') {
			send_data.participation = e.target.value;
		} else if (e.target.name === 'uid') {
			send_data.uid = e.target.value;
		} else if (e.target.name === 'etc') {
			send_data.etc = e.target.value;
		}
	};

	const send = async () => {
		console.log(props.centerID);
		console.log(props.c_manager);
		console.log(props.participation);
		const result = await axios.post(
			`http://192.168.0.117:3000/home/modify_call/${send_data.no}`,
			JSON.stringify({
				c_manager: send_data.name,
				date: send_data.date,
				in_out: send_data.in_out,
				m_email: send_data.m_email,
				m_ph: send_data.m_ph,
				participation: send_data.participation,
				uid: send_data.uid,
				etc: send_data.etc,
			})
		);
	};

	const check = (e) => {
		e.preventDefault();
		if (e.target.name === 'save') {
			if (window.confirm('수정된 내용을 저장하시겠습니까?')) {
				alert('저장되었습니다.');
				console.log(send_data.name);
				console.log(send_data.date);
				console.log(send_data.in_out);
				console.log(send_data.estimate_num);
				console.log(send_data.m_email);
				console.log(send_data.m_ph);
				console.log(send_data.participation);
				console.log(send_data.uid);
				console.log(send_data.etc);
				send();
				closeCancel();
			}
		}
	};

	return update ? (
		<div class='update_call_state'>
			<div>
				<span>담당자 이름: </span>
				<input
					name='name'
					type='type'
					defaultValue={data.c_manager}
					placeholder='담당자 이름'
					onChange={onChange}
				/>
			</div>

			<div>
				<span>연락 일자: </span>
				<input
					name='date'
					type='text'
					defaultValue={data.date}
					placeholder='연락일자'
					value={today.year + '-' + today.month + '-' + today.date}
					onChange={onChange}
				/>
			</div>

			<div>
				<span>인/아웃 바운드: </span>
				<select name='bound' defaultValue={data.in_out} onChange={onChange}>
					<option value='인바운드/아웃바운드'>===선택===</option>
					<option value='인'>인</option>
					<option value='아웃'>아웃</option>
				</select>
			</div>

			<div>
				<span>담당자 이메일 주소: </span>
				<input
					name='m_email'
					type='text'
					defaultValue={data.m_email}
					placeholder='담당자 이메일 주소'
					onChange={onChange}
				/>
			</div>

			<div>
				<span>담당자 전화번호: </span>
				<input
					name='m_ph'
					type='text'
					defaultValue={data.m_ph}
					placeholder='담당자 전화번호'
					onChange={onChange}
				/>
			</div>

			<div>
				<span>시설 참여 여부: </span>
				<select
					name='participation'
					defaultValue={data.participation}
					onChange={onChange}>
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
					defaultValue={data.uid}
					placeholder='기록자 이름'
					onChange={onChange}
				/>
			</div>

			<div>
				<div>특이사항: </div>
				<textarea
					name='etc'
					placeholder='특이사항'
					defaultValue={data.etc}
					onInput={onChange}></textarea>
			</div>

			<div class='call_modify_btn'>
				<button name='save' onClick={check}>
					저장
				</button>
				<button name='cancel' onClick={closeCancel}>
					취소
				</button>
			</div>
		</div>
	) : null;
}

export default UpdateCallState;
