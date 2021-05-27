import React from 'react';

function ApplyState(props) {
	return (
		<div class='main_info_apply-state_list_item'>
			<div class='information'>현장요원:{props.applyState_list.aid}</div>
			<div class='information'>진행 여부:{props.applyState_list.collect}</div>
			<div class='information'>
				예상 인원:{props.applyState_list.estimate_num}
			</div>
			<div class='information'>
				예약 날짜:{props.applyState_list.recept_date}
			</div>
			<div class='information'>
				방문 예정 날짜:{props.applyState_list.visit_date}
			</div>
			<div class='information'>
				방문 예정 시간:{props.applyState_list.visit_time}
			</div>
			<div class='information'>기록자 이름:{props.applyState_list.uid}</div>
			<div class='information'>특이사항:{props.applyState_list.etc}</div>
		</div>
	);
}

export default ApplyState;
