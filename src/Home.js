import React, { useState } from "react";

function Home(props) {
  const [searchCenter, setSearchCenter] = useState("");
  const [isLoading_1, setIsLoading_1] = useState(true);
  const [isLoading_2, setIsLoading_2] = useState(true);
  let searchResult_1;
  let centerInfo;
  let result_1obj = {
    centerName: "",
    centerAddr: "",
    centerPhoneNumber: "",
  };
  let result_1ary = [];
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

  const searchResult_template = (
    centerName,
    centerAddr,
    centerPhoneNumber,
    centerID
  ) => {
    const template = `
    <li class="main search result list container">
        <span>${centerName}</span>
        <span>${centerAddr}</span>
        <span>${centerPhoneNumber}</span>
        <button class="main search result list btn" onClick={onClick_info(centerID)}>선택</button>
    </li>
  `;
    return template;
  };

  //검색어를 통해 데이터를 받아오는 부분
  /*
      
      getCenterInfoList = () => {
        //searchResult 통해서 이름 주소 전화번호 받아서 result_1 배열에 넣는 함수
        let i = 0;
        for(i=0;i<searchResult.length;i++){
          result_1ary[i] = searchResult_template(searchResult[i].c_name,searchResult[i].c_address,searchResult[i].c_ph,searchResult[i].center_id);
        }
      }

      getCenterInfo = (centerID) =>{
        centerInfo = await axios.get(`http://192.168.0.117/home/${props.uid}/${centerID}`);
        centerInfo_template(centerInfo[0].c_name,centerInfo[0].c_address,centerInfo[0].c_ph);
        setIsLoading_2(false);
      }

      onClick_info = (centerID) => {
         e.preventDefault();
         getCenterInfo (centerID);
      }


      getSearchCenterList = async (search) => { 
        searchResult = await axios.get(`http://192.168.0.117/home/${props.uid}/${search}`);
        getCenterInfoList();
        setIsLoading_1(false);
      }

      const onClick = (e) =>{
        e.preventDefault();
        this.getSearchCenterList(searchCenter);
        
      }

*/

  return isLoading_1 ? (
    isLoading_2 ? (
      <div class="main">
        <div class="main serch">
          <div class="main search box">
            <input
              type="text"
              placeholder="시설 이름 입력"
              class="main serch input"
              onChange={setSearchCenter}
            />
            <button class="main search btn" onClick={onCLick} />
          </div>
          <div class="main search result">
            <ul class="main search result list ">{result_1}</ul>
          </div>
        </div>
        <div class="main info">{centerInfo_template}</div>
      </div>
    ) : (
      <div class="main">
        <div class="main serch">
          <div class="main search box">
            <input
              type="text"
              placeholder="시설 이름 입력"
              class="main serch input"
              onChange={setSearchCenter}
            />
            <button class="main search btn" onClick={onCLick} />
          </div>
          <div class="main search result">
            <ul class="main search result list ">{result_1}</ul>
          </div>
        </div>
        <div class="main info">
          <span>시설을 선택해 주세요</span>
        </div>
      </div>
    )
  ) : (
    <div class="main">
      <div class="main serch">
        <div class="main search box">
          <input
            type="text"
            placeholder="시설 이름 입력"
            class="main serch input"
            onChange={setSearchCenter}
          />
          <button class="main search btn" onClick={onCLick} />
        </div>
        <div class="main search result">
          <ul class="main search result list ">{result_1}</ul>
        </div>
        <div class="main info">
          <span>시설을 선택해 주세요</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
