import React from 'react';
import axios from 'axios';

function UpdateSchedule(props) {
	const { data, setSelect, setResultSche, setIsSearched } = props;

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
		reload();
	};
	const onClick = (e) => {
		e.preventDefault();
		if (e.target.name === 'delete') {
			if (window.confirm('정말 삭제하겠습니까?')) {
				send();
				setSelect(false);
				setIsSearched(false);
				setIsSearched(true);
			}
		}
	};

	return (
		<div class='select_schedule_btn'>
			<button name='delete' onClick={onClick}>
				삭제
			</button>
		</div>
	);
}
export default UpdateSchedule;
