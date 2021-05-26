import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './css/Home.css';
import CenterList from './CenterList.js';
import CallState from './callState.js';
import ApplyState from './ApplyState.js';
import AddCallState from './AddCallState';
import AddApplyState from './AddApplyState';
import { Redirect } from 'react-router';
import SearchAgent from './SearchAgent';

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
	const [IsSave, setIsSave] = useState(false);
	//검색어를 통해 데이터를 받아오는 부분

	const getSearchCenterList = async (search) => {
		console.log(props.uid);
		const result = await axios.get(
			`http://192.168.0.117:3000/home/${props.uid}/${search}`
		);
		setResult_1ary(result);
		console.log(result);
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
		alert('저장되었습니다');
		setIsOpenAddCall(false);
	};
	const closeAddCallCancle = (e) => {
		setIsOpenAddCall(false);
	};
	const openAddApply = (e) => {
		setIsOpenAddApply(true);
	};
	const closeAddApply = (e) => {
		alert('저장되었습니다');
		setIsOpenAddApply(false);
	};
	const closeAddApplyCancle = (e) => {
		setIsOpenAddApply(false);
	};

	props.setIsLogined(localStorage.getItem('isLogined'));

	return props.isLogined ? (
		isLoading_1 ? (
			//검색어 입력 안된 텅빈 페이지
			<div class='body-container'>
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
								<li>
									<div class='main_search_result_list_item'>
										<div class='center_info'>시설 이름</div>
										<div class='center_info'>주소</div>
										<div class='center_info'>전화번호</div>
										<div class='center_info'>시설 id</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class='main_info'>
						<span>시설을 선택해 주세요</span>
					</div>
				</div>
				{/* <div class='agent-search'>
					<SearchAgent />
				</div> */}
			</div>
		) : isLoading_2 ? (
			//검색어 입력 후 해당 이름의 시설 리스트를 받아온 화면
			<div class='body-container'>
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
								<li>
									<div class='main_search_result_list_item'>
										<div class='center_info'>시설 이름</div>
										<div class='center_info'>주소</div>
										<div class='center_info'>전화번호</div>
										<div class='center_info'>시설 id</div>
									</div>
								</li>

								{result_1ary.data !== 'undefined'
									? result_1ary.data.map((result_1ary) => (
											<li
												key={result_1ary.center_id}
												class='list-items search-centerlist'>
												<CenterList
													data={result_1ary}
													setCurrentResult={setCurrentResult}
													setIsLoading_2={setIsLoading_2}
													uid={props.uid}
													setCenterInfo={setCenterInfo}
												/>
											</li>
									  ))
									: null}
							</ul>
						</div>
					</div>
					<div class='main_info'>
						<span>시설을 선택해 주세요</span>
					</div>
				</div>
				{/* <div class='agent-search'>
					<SearchAgent />
				</div> */}
			</div>
		) : (
			//센터 리스트중 한개를 선택하여 데이터를 오른쪽 화면에 띄우는 화면
			<div class='body-container'>
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
								<li>
									<div class='main_search_result_list_item'>
										<div class='center_info'>시설 이름</div>
										<div class='center_info'>주소</div>
										<div class='center_info'>전화번호</div>
										<div class='center_info'>시설 id</div>
									</div>
								</li>
								{result_1ary.data.map((result_1ary) => (
									<li class='list-items search-centerlist'>
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
							<div>{centerInfo.centerName}</div>
							<div>{centerInfo.centerAddr}</div>
							<div>{centerInfo.centerPhoneNumber}</div>
						</div>
						<div class='info-header'>콜 이력</div>
						<div class='main_info_call-state'>
							<ul class='main_info_call-state_list list'>
								{centerInfo.callState_list.map((data) => (
									<li
										key={centerInfo.center_id}
										class='list-items call-state_items'>
										<CallState
											callState_list={data}
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
						<button class='main_info_call-state_add' onClick={openAddCall}>
							추가
						</button>
						<AddCallState
							open={IsopenAddCall}
							closeSave={closeAddCall}
							closeCancle={closeAddCallCancle}
							uid={props.uid}
							centerID={centerInfo.centerID}
							IsSave={IsSave}
							setIsSave={setIsSave}
						/>
						<div class='info-header'>참여여부 기록</div>
						<div class='main_info_apply-state'>
							<ul class='main_info_apply-state_list list'>
								{centerInfo.applyState_list.map((data) => (
									<li
										key={centerInfo.center_id}
										class='list-items apply-state_items'>
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
							cid={centerInfo.centerID}
						/>
					</div>
				</div>
				{/* <div class='agent-search'>
					<SearchAgent />
				</div> */}
			</div>
		)
	) : (
		<Redirect to='/' />
	);
}

export default Home;
