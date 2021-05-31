import React, { useState, useRef, useEffect } from 'react';

function UpdateSchedule(props) {
	const { data } = props;
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
	let send_data = data;
	const onClick = (e) => {
		e.preventDefault();
		if (e.target.name === 'save') {
			setIsOpen(false);
		} else if (e.target.name === 'cancle') {
			setIsOpen(false);
		} else if (e.target.name === 'update') {
			setIsOpen(true);
		}
	};

	const onChange = (e) => {
		if (e.target.name === 'aid') {
			send_data.aid = e.target.value;
		} else if (e.target.name === 'estimate_num') {
			send_data.estimate_num = e.target.value;
		} else if (e.target.name === 'recept_date') {
			send_data.recept_date = e.target.value;
		} else if (e.target.name === 'visit_date') {
			send_data.visit_date = e.target.value;
		} else if (e.target.name === 'visit_time') {
			send_data.visit_time = e.target.value;
		} else if (e.target.name === 'etc') {
			send_data.etc = e.target.value;
		}
	};
	return isOpen ? (
		<div class='update_container'>
			<div class='update_input'>
				<div>
					<span>현장요원: </span>
					<input
						type='text'
						name='agent'
						placeholder='현장요원'
						onChange={onChange}
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
						onChange={onChange}
						value={today.year + '-' + today.month + '-' + today.date}
					/>
				</div>

				<div>
					<span>방문 예정 날짜: </span>
					<input
						type='date'
						name='visit_date'
						placeholder='방문 예정 날짜'
						onChange={onChange}
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

				<div>
					<span>특이사항: </span>
					<textarea
						name='etc'
						placeholder='특이사항'
						onInput={onChange}></textarea>
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
		<button name='update' onClick={onClick}>
			수정
		</button>
	);
}
export default UpdateSchedule;
