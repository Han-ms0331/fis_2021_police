import React, { useState } from 'react';
import UpdateCallState from './UpdateCallState.js';

function CallState(props) {
	const [update, setUpdate] = useState(false);
	console.log(props.callState_list);
	const openUpdateCall = (e) => {
		setUpdate(true);
	};
	const closeUpdateCall = (e) => {
		setUpdate(false);
	};

	return (
		<div class='main_info_call-state_list_item'>
			<div class='information'>
				담당자 이름:{props.callState_list.c_manager}
			</div>
			<div class='information'>연락 일자:{props.callState_list.date}</div>
			<div class='information'>인/아웃바운드:{props.callState_list.in_out}</div>

			<div class='information'>
				담당자 이메일 주소:{props.callState_list.m_email}
			</div>
			<div class='information'>담당자 전화번호:{props.callState_list.m_ph}</div>
			<div class='information'>
				시설 참여 여부:{props.callState_list.participation}
			</div>
			<div class='information'>기록자 이름:{props.callState_list.username}</div>
			<td class='information_etc'>특이사항:{props.callState_list.etc}</td>
			<div class='call_modify_btn'>
				<button onClick={openUpdateCall}>수정</button>
			</div>
			<UpdateCallState
				update={update}
				data={props.callState_list}
				centerID={props.centerID}
				closeCancel={closeUpdateCall}
				setUpdate={setUpdate}
			/>
		</div>
	);
}

export default CallState;
