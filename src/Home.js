import React, { useState } from 'react';
import axios from 'axios';
import './css/Home.css';
import CenterList from './CenterList.js';

function Home(props) {
	const [searchCenter, setSearchCenter] = useState('');
	const [isLoading_1, setIsLoading_1] = useState(true);
	const [isLoading_2, setIsLoading_2] = useState(true);
	const [result_1ary, setResult_1ary] = useState([]);
	const [centerInfo, setCenterInfo] = useState({
		centerName: '',
		centerAddr: '',
		centerPhoneNumber: '',
		callState_list: [],
		applyState_list: [],
	});
	const [currentResult, setCurrentResult] = useState('');
	let result_2ary = [];

	const centerInfo_template = (centerName, centerAddr, centerPhoneNumber) => {
		const template = `
    <div class="main info header>
      <div class="main info header center-name">
        <h2>${centerName}
      </div>
      <div class="main info header center-name">
        <h2>${centerAddr}
      </div>
      <div class="main info header center-name">
        <h2>${centerPhoneNumber}
      </div>
    </div>
    <div class="main info call-state>
      <ul class="main info call-state list>
        //콜 받은 기록 리스트 출력
      </ul>
      <button class="main info call-state add>
        추가
      </button>
    </div>
    <div class="main info apply-state>
      <ul class="main info apply-state list>
        //신청접수 현황 리스트 출력
      </ul>
      <button class="main info apply-state add>
        추가
      </button>
    </div>
  `;
		return template;
	};

	//검색어를 통해 데이터를 받아오는 부분

	// const onClick_info = (centerID) => {
	// 	centerID.preventDefault();
	// 	getCenterInfo(centerID);
	// };

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
		console.log(searchCenter);
		getSearchCenterList(searchCenter);
	};
	const onChange = (e) => {
		console.log(e.target.value);
		setSearchCenter(`${e.target.value}`);
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
					<ul class='main_search_result_list '>
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
					<ul class='main_search_result_list '>
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
			<div class='main_info'>선택완료</div>
		</div>
	);
}

export default Home;
