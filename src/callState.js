import React from 'react';

function CallState(props) {
	console.log(props.callState_list);
	return (
		<div class='main_info_call-state_list_item'>
			<div>담당자 이름:{props.callState_list.c_manager}</div>
			<div>연락 일자:{props.callState_list.date}</div>
			<div>인/아웃바운드:{props.callState_list.in_out}</div>
			<div>담당자 이메일 주소:{props.callState_list.m_email}</div>
			<div>담당자 전화번호:{props.callState_list.m_ph}</div>
			<div>시설 참여 여부:{props.callState_list.participation}</div>
			<div>기록자 이름:{props.callState_list.uid}</div>
			<div>특이사항:{props.callState_list.etc}</div>
		</div>
	);
}

export default CallState;
