import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AddSchedule(props) {
	const { agent_id, setSelect, setResultSche, setIsSearched } = props;
	const [isOpen, setIsOpen] = useState(false);
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
	let send_data = {
		aid: agent_id,
		estimate_num: '',
		recept_date: `${today.year}-${today.month}-${today.date}`,
		visit_date: localStorage.getItem('selectedDate'),
		visit_time: '',
		uid: localStorage.getItem('userID'),

		cid: '',
	};

	const reload = async () => {
		let result = await axios.get(
			`http://192.168.0.117:3000/schedule/${localStorage.getItem(
				'searchRegion'
			)}/${localStorage.getItem('searchMonth')}`
		);
		setResultSche(result.data.sches);
	};

	const send = async () => {
		const result = await axios.post(
			`http://192.168.0.117:3000/schedule/applysave`,
			JSON.stringify(send_data)
		);
		reload();
		if (result.data === true) {
			alert('저장되었습니다.');
			setSelect(false);
			setIsSearched(false);
			setIsSearched(true);
			setIsOpen(false);
		} else {
			alert('작성내용을 확인해주세요.');
		}
		console.log(result);
	};

	const onClick = (e) => {
		e.preventDefault();
		if (e.target.name === 'save') {
			send();
		} else if (e.target.name === 'cancle') {
			setIsOpen(false);
		} else if (e.target.name === 'add') {
			setIsOpen(true);
		}
	};

	const onChange = (e) => {
		if (e.target.name === 'estimate_num') {
			send_data.estimate_num = e.target.value;
		} else if (e.target.name === 'visit_time') {
			send_data.visit_time = e.target.value;
		} else if (e.target.name === 'cid') {
			send_data.cid = e.target.value;
		}
	};
	return isOpen ? (
		<div class='update_container'>
			<div class='update_input'>
				<div>
					<span>시설 id: </span>
					<input
						type='text'
						name='cid'
						placeholder='시설 id'
						onChange={onChange}
					/>
				</div>
				<div>
					<span>현장요원: </span>
					<input
						type='text'
						name='aid'
						placeholder='현장요원'
						value={agent_id}
						readOnly
					/>
				</div>

				<div>
					<span>예상 인원: </span>
					<input
						type='text'
						name='estimate_num'
						placeholder='예상 인원'
						onChange={onChange}
					/>
				</div>

				<div>
					<span>예약 날짜: </span>
					<input
						type='text'
						name='recept_date'
						placeholder='예약 날짜'
						value={today.year + '-' + today.month + '-' + today.date}
						readOnly
					/>
				</div>

				<div>
					<span>방문 예정 날짜: </span>
					<input
						type='text'
						name='visit_date'
						placeholder='방문 예정 날짜'
						value={localStorage.getItem('selectedDate')}
						readOnly
					/>
				</div>

				<div>
					<span>방문 예정 시간: </span>
					<input
						type='time'
						name='visit_time'
						placeholder='방문 예정 시간'
						onChange={onChange}
					/>
				</div>

				<div>
					<span>기록자 이름: </span>
					<input
						type='text'
						name='uid'
						placeholder='기록자 이름'
						value={localStorage.getItem('userName')}
						onChange={onChange}
					/>
				</div>

				<button name='save' onClick={onClick}>
					저장
				</button>
				<button name='cancle' onClick={onClick}>
					취소
				</button>
			</div>
		</div>
	) : (
		<button name='add' id='add_btn' onClick={onClick}>
			+
		</button>
	);
}
export default AddSchedule;
