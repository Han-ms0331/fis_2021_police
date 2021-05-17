import React, { useState } from 'react';
import axios from 'axios';
import './css/Home.css';
import CenterList from './CenterList.js';
import CallState from './callState.js';
import ApplyState from './ApplyState.js';
import AddCallState from './AddCallState';
import AddApplyState from './AddApplyState';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// Modal.setAppElement('#yourAppElement');

function Home(props) {
	const [searchCenter, setSearchCenter] = useState('');
	const [isLoading_1, setIsLoading_1] = useState(true);
	const [isLoading_2, setIsLoading_2] = useState(true);
	const [result_1ary, setResult_1ary] = useState([]);
	const [centerInfo, setCenterInfo] = useState({
		centerName: '',
		centerAddr: '',
		centerPhoneNumber: '',
		centerID: '',
		callState_list: [],
		applyState_list: [],
	});
	const [currentResult, setCurrentResult] = useState(''); //현재 선택된 시설의 id
	const [IsopenAddCall, setIsOpenAddCall] = useState(false);
	const [addCall, setAddCall] = useState({});
	const [IsopenAddApply, setIsOpenAddApply] = useState(false);

	//검색어를 통해 데이터를 받아오는 부분

	const getSearchCenterList = async (search) => {
		console.log(props.uid);
		const result = await axios.get(
			`http://192.168.0.117:3000/home/${props.uid}/${search}`
		);
		setResult_1ary(result);
		console.log(isLoading_1);
		setIsLoading_1(false);
	};

	const onClick = (e) => {
		e.preventDefault();
		setIsLoading_2(true);
		console.log(searchCenter);
		getSearchCenterList(searchCenter);
	};
	const onChange = (e) => {
		console.log(e.target.value);
		setSearchCenter(`${e.target.value}`);
	};

	const openAddCall = (e) => {
		setIsOpenAddCall(true);
	};
	const closeAddCall = (e) => {
		setIsOpenAddCall(false);
	};
	const closeAddCallCancle = (e) => {
		setIsOpenAddCall(false);
	};
	const openAddApply = (e) => {
		setIsOpenAddApply(true);
	};
	const closeAddApply = (e) => {
		setIsOpenAddApply(false);
	};
	const closeAddApplyCancle = (e) => {
		setIsOpenAddApply(false);
	};

	return isLoading_1 ? (
		//검색어 입력 안된 텅빈 페이지
		<div class='main'>
			<div class='main_serch'>
				<div class='main_search_box'>
					<input
						type='text'
						placeholder='시설 이름 입력'
						name='center'
						class='main_serch_input'
						onChange={onChange}
					/>
					<button class='main_search_btn' onClick={onClick}>
						검색
					</button>
				</div>
				<div class='main_search_result'>
					{/* <ul class="main_search result list ">
              {result_1ary}
            </ul> */}
				</div>
			</div>
			<div class='main_info'>
				<span>시설을 선택해 주세요</span>
			</div>
		</div>
	) : isLoading_2 ? (
		//검색어 입력 후 해당 이름의 시설 리스트를 받아온 화면
		<div class='main'>
			<div class='main_serch'>
				<div class='main_search_box'>
					<input
						type='text'
						placeholder='시설 이름 입력'
						name='center'
						class='main_serch_input'
						onChange={onChange}
					/>
					<button class='main_search_btn' onClick={onClick}>
						검색
					</button>
				</div>
				<div class='main_search_result'>
					<ul class='main_search_result_list list'>
						{result_1ary.data.map((result_1ary) => (
							<li key={result_1ary.center_id}>
								<CenterList
									data={result_1ary}
									setCurrentResult={setCurrentResult}
									setIsLoading_2={setIsLoading_2}
									uid={props.uid}
									setCenterInfo={setCenterInfo}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div class='main_info'>
				<span>시설을 선택해 주세요</span>
			</div>
		</div>
	) : (
		//센터 리스트중 한개를 선택하여 데이터를 오른쪽 화면에 띄우는 화면
		<div class='main'>
			<div class='main_serch'>
				<div class='main_search_box'>
					<input
						type='text'
						placeholder='시설 이름 입력'
						name='center'
						class='main_serch_input'
						onChange={onChange}
					/>
					<button class='main_search_btn' onClick={onClick}>
						검색
					</button>
				</div>
				<div class='main_search_result'>
					<ul class='main_search_result_list list'>
						{result_1ary.data.map((result_1ary) => (
							<li>
								<CenterList
									data={result_1ary}
									setCurrentResult={setCurrentResult}
									setIsLoading_2={setIsLoading_2}
									uid={props.uid}
									setCenterInfo={setCenterInfo}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div class='main_info'>
				<div class='main_info_header'>
					<div class='main_info_header_center-name'>
						<div>{centerInfo.centerName}</div>
					</div>
					<div class='main_info_header_center-name'>
						<div>{centerInfo.centerAddr}</div>
					</div>
					<div class='main_info_header_center-name'>
						<div>{centerInfo.centerPhoneNumber}</div>
					</div>
				</div>
				<div class='main_info_call-state'>
					<div>콜 이력</div>
					<ul class='main_info_call-state_list list'>
						{centerInfo.callState_list.map((data) => (
							<li key={centerInfo.center_id}>
								<CallState callState_list={data} />
							</li>
						))}
					</ul>
				</div>
				<button class='main_info_call-state_add' onClick={openAddCall}>
					추가
				</button>
				<AddCallState
					open={IsopenAddCall}
					closeSave={closeAddCall}
					closeCancle={closeAddCallCancle}
					uid={props.uid}
				/>
				<div class='main_info_apply-state'>
					<div>참여여부 기록</div>
					<ul class='main_info_apply-state_list list'>
						{centerInfo.applyState_list.map((data) => (
							<li key={centerInfo.center_id}>
								<ApplyState applyState_list={data} />
							</li>
						))}
					</ul>
				</div>
				<button class='main_info_apply-state_add' onClick={openAddApply}>
					추가
				</button>
				<AddApplyState
					open={IsopenAddApply}
					closeSave={closeAddApply}
					closeCancle={closeAddApplyCancle}
					uid={props.uid}
				/>
			</div>
		</div>
	);
}

export default Home;
