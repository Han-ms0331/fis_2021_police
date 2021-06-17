import React from 'react';

function ApplyState(props) {
	const { applyState_list } = props;
	let latest;
	if (applyState_list.latest === 1) {
		latest = true;
	} else {
		latest = false;
	}

	return latest ? (
		<li key={applyState_list.center_id} class='list-items apply-state_items'>
			<div class='main_info_apply-state_list_item'>
				<div class='information'>현장요원:{applyState_list.aid}</div>
				<div class='information'>진행 여부:{applyState_list.collect}</div>
				<div class='information'>예상 인원:{applyState_list.estimate_num}</div>
				<div class='information'>예약 날짜:{applyState_list.recept_date}</div>
				<div class='information'>
					방문 예정 날짜:{applyState_list.visit_date}
				</div>
				<div class='information'>
					방문 예정 시간:{applyState_list.visit_time}
				</div>
				<div class='information'>기록자 이름:{applyState_list.uname}</div>
				<div class='information'>특이사항:{applyState_list.etc}</div>
			</div>
		</li>
	) : null;
}

export default ApplyState;
