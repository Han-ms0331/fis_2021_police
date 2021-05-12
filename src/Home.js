import React,{useState} from 'react';
import axios from 'axios';




  function Home(props) {
  const [searchCenter,setSearchCenter] = useState('');
  const [isLoading_1,setIsLoading_1] = useState(true);
  const [isLoading_2,setIsLoading_2] = useState(true);
  let searchResult_1 ;
  let centerInfo ;
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

const searchResult_template = (num,centerName,centerAddr,centerPhoneNumber,centerID) => {
  const template = `
    <li class="main search result list container">
        <span id='name=${centerName}'>${centerName}</span>
        <span id='addr=${centerAddr}'>${centerAddr}</span>
        <span id='phone=${centerPhoneNumber}'>${centerPhoneNumber}</span>
        <span id='id=${centerID}'>${centerID}</span>
        <button class="main search result list btn" onClick={onClick_info(${centerID})>선택</button>
    </li>
  `;
    return template;
  };

  //검색어를 통해 데이터를 받아오는 부분
 
      
      const getCenterInfoList = () => {
        //searchResult 통해서 이름 주소 전화번호 받아서 result_1 배열에 넣는 함수
        let i = 0;
        for(i=0;i<searchResult_1.length;i++){
          result_1ary[i] = searchResult_template(i,searchResult_1[i].c_name,searchResult_1[i].c_address,searchResult_1[i].c_ph,searchResult_1[i].center_id);
        }
      }

      const getCenterInfo = async (centerID) =>{
        centerInfo = await axios.get(`http://192.168.0.117:3000/home/${props.uid}/search/${centerID}`);
        centerInfo_template(centerInfo[0].c_name,centerInfo[0].c_address,centerInfo[0].c_ph);
        setIsLoading_2(false);
      }

      const onClick_info = (centerID) => {
         centerID.preventDefault();
         getCenterInfo (centerID);
      }


      const getSearchCenterList = async (search) => { 
        searchResult_1 = await axios.get(`http://192.168.0.117:3000/home/${props.uid}/${search}`);
        console.log(searchResult_1);
        getCenterInfoList();
        setIsLoading_1(false);
      }

      const onClick = (e) =>{
        e.preventDefault();
        getSearchCenterList(searchCenter);
        
      }



    return (
      // isLoading_1 ? (isLoading_2?
      //   <div class="main">
      //     <div class='main serch'>
      //       <div class='main search box'>
      //         <input type='text' placeholder='시설 이름 입력' class='main serch input'onChange={setSearchCenter} />
      //         <button class='main search btn' onClick={onClick} />
      //       </div>
      //       <div class ='main search result'>
      //             <ul class="main search result list ">
      //               {result_1ary}
      //             </ul>
      //           </div>
      //     </div>
      //     <div class="main info">
      //       {centerInfo_template}
      //     </div>
      // </div>
      // :
      //   <div class="main">
      //     <div class='main serch'>
      //       <div class='main search box'>
      //         <input type='text' placeholder='시설 이름 입력' class='main serch input'onChange={setSearchCenter} />
      //         <button class='main search btn' onClick={onClick} />
      //       </div>
      //       <div class ='main search result'>
      //             <ul class="main search result list ">
      //               {result_1ary}
      //             </ul>
      //           </div>
      //     </div>
      //     <div class="main info">
      //       <span>시설을 선택해 주세요</span>
      //     </div>
      // </div>
      // ):
      <div class="main">
        <div class='main serch'>
          <div class='main search box'>
            <input type='text' placeholder='시설 이름 입력' class='main serch input' onChange={setSearchCenter} />
            <button class='main search btn' onClick={onClick} />
          </div>
          <div class='main search result'>
            <ul class="main search result list ">
              {result_1ary}
            </ul>
          </div>
          <div class="main info">
            <span>시설을 선택해 주세요</span>
          </div>
        </div>
      </div>
    );
}

export default Home;
