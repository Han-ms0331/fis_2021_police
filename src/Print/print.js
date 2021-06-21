import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function print(props) {
	const { data, setSelect, setResultSche, setIsSearched } = props;
	const [isOpen, setIsOpen] = useState(false);
	
	let send_data = {
		aid: data.aid,
		estimate_num: data.estimate_num,
		recept_date: `${today.year}-${today.month}-${today.date}`,
		visit_date: localStorage.getItem('selectedDate'),
		visit_time: data.visit_time,
		uid: localStorage.getItem('userID'),

		cid: data.cid,
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
		const result_1 = await axios.get(
			`http://192.168.0.117:3000/schedule/applymodify/${data.no}`
		);
		const result_2 = await axios.post(
			`http://192.168.0.117:3000/schedule/applysave`,
			JSON.stringify(send_data)
		);
		reload();
		console.log(result_1);
		console.log(result_2);
		if (result_2.data === true) {
			alert('저장되었습니다.');
			setSelect(false);
			setIsSearched(false);
			setIsSearched(true);
			setIsOpen(false);
		} else {
			alert('작성내용을 확인해주세요.');
		}
	};

	const onClick = (e) => {
		e.preventDefault();
		if (e.target.name === 'save') {
			if (window.confirm('수정된 내용을 저장하시겠습니까?')) {
				send();
			}
		} else if (e.target.name === 'cancle') {
			setIsOpen(false);
		} else if (e.target.name === 'update') {
			setIsOpen(true);
		}
	};

	const onChange = (e) => {
		if (e.target.name === 'agent') {
			send_data.aid = e.target.value;
		} else if (e.target.name === 'estimate_num') {
			send_data.estimate_num = e.target.value;
		} else if (e.target.name === 'visit_date') {
			send_data.visit_date = e.target.value;
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
						value={data.cid}
						readOnly
					/>
				</div>
				<div>
					<span>현장요원: </span>
					<input
						type='text'
						name='agent'
						placeholder='현장요원'
						defaultValue={data.aid}
						onChange={onChange}
					/>
				</div>

				<div>
					<span>예상 인원: </span>
					<input
						type='text'
						name='estimate_num'
						placeholder='예상 인원'
						defaultValue={data.estimate_num}
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
					/>
				</div>

				<div>
					<span>방문 예정 날짜: </span>
					<input
						type='date'
						name='visit_date'
						placeholder='방문 예정 날짜'
						defaultValue={data.visit_date}
						onChange={onChange}
					/>
				</div>

				<div>
					<span>방문 예정 시간: </span>
					<input
						type='time'
						name='visit_time'
						placeholder='방문 예정 시간'
						defaultValue={data.visit_time}
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
		<div class='select_schedule_btn'>
			<button name='update' onClick={onClick}>
				수정
			</button>
		</div>
	);
}
export default print;
