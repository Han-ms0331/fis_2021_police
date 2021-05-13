import React from 'react';
import axios from 'axios';

function CenterList(props) {
	const getCenterInfo = async () => {
		const result = await axios.get(
			`http://192.168.0.117:3000/home/${props.uid}/search/${props.center_id}`
		);
		console.log(result);
		props.setCenterInfo({
			centerName: '',
			centerAddr: '',
			centerPhoneNumber: '',
			callState_list: [],
			applyState_list: [],
		});
	};
	console.log(props.data);
	const onClick = (e) => {
		e.preventDefault();
		props.setCurrentResult(props.center_id);
		getCenterInfo();
		props.setIsLoading_2(false);
	};

	return (
		<div class='main_search_result_list_item'>
			<div class='center_info'>{props.data.c_name}</div>
			<div class='center_info'>{props.data.c_address}</div>
			<div class='center_info'>{props.data.center_id}</div>
			<button class='main search result list btn' onClick={onClick}>
				선택
			</button>
		</div>
	);
}

export default CenterList;
