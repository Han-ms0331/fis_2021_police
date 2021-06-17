import React, { useState } from 'react';
import UpdateCallState from './UpdateCallState.js'
function CallState(props) {
	const [isUpdate, setIsUpdate] = useState(false);

	const openUpdate = (e) => {
		setIsUpdate(true);
	}
	return (
		<div class='main_info_call-state_list_item'>
			<div class='information'>
				담당자 이름:{props.callState_list.c_manager}
			</div>
			<div class='information'>연락 일자:{props.callState_list.date}</div>
			<div class='information'>인/아웃바운드:{props.callState_list.in_out}</div>
			<div class='informaion'>예상 인원:{props.callState_list.estimate_num}</div>
			<div class='information'>
				담당자 이메일 주소:{props.callState_list.m_email}
			</div>
			<div class='information'>담당자 전화번호:{props.callState_list.m_ph}</div>
			<div class='information'>
				시설 참여 여부:{props.callState_list.participation}
			</div>
			<div class='information'>기록자 이름:{props.callState_list.uid}</div>
			<div class='information'>특이사항:{props.callState_list.etc}</div>
			<button onClick={openUpdate}>수정</button>
			<UpdateCallState 
				update = {isUpdate}
			/>
		</div>
	);
}

export default CallState;
