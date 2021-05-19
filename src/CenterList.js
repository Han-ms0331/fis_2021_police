import React from 'react';
import axios from 'axios';

function CenterList(props) {
	let result;
	const getCenterInfo = async () => {
		result = await axios.get(
			`http://192.168.0.117:3000/home/${props.uid}/search/${props.data.center_id}`
		);
		console.log(result);
		props.setCenterInfo({
			centerName: props.data.c_name,
			centerAddr: props.data.c_address,
			centerPhoneNumber: props.data.c_ph,
			centerID: props.data.center_id,
			callState_list: result.data.calls,
			applyState_list: result.data.applies,
		});
	};
	console.log(props.data);
	const onClick = (e) => {
		e.preventDefault();
		props.setCurrentResult(props.data.center_id);
		getCenterInfo();
		props.setIsLoading_2(false);
	};

	return (
		<div class='main_search_result_list_item'>
			<div class='center_info'>{props.data.c_name}</div>
			<div class='center_info'>{props.data.c_address}</div>
			<div class='center_info'>{props.data.c_ph}</div>
			<div class='center_info'>{props.data.center_id}</div>
			<button class='main_search_result_list_btn' onClick={onClick}>
				선택
			</button>
		</div>
	);
}

export default CenterList;
