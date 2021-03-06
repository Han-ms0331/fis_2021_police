import React, { useState, useRef, useEffect } from "react";

import axios from "axios";
import "../css/Home.css";
import CenterList from "./CenterList.js";
import CallState from "./callState.js";
import ApplyState from "./ApplyState.js";
import AddCallState from "./AddCallState";
import { Redirect } from "react-router";

function Home(props) {
  const [searchCenter, setSearchCenter] = useState("");
  const [isLoading_1, setIsLoading_1] = useState(true);
  const [isLoading_2, setIsLoading_2] = useState(true);
  const [result_1ary, setResult_1ary] = useState([]);
  const [centerInfo, setCenterInfo] = useState({
    centerName: "",
    centerAddr: "",
    centerPhoneNumber: "",
    centerID: "",
    callState_list: [],
    applyState_list: [],
  });
  const [currentResult, setCurrentResult] = useState(""); //현재 선택된 시설의 id
  const [IsopenAddCall, setIsOpenAddCall] = useState(false);

  const [IsopenAddApply, setIsOpenAddApply] = useState(false);
  const [IsSave, setIsSave] = useState(false);
  const [called, setCalled] = useState("없음");
  const resettingRef = useRef(false);

  //검색어를 통해 데이터를 받아오는 부분

  const getSearchCenterList = async (search) => {
    console.log(props.uid);

    const result = await axios.get(
      `http://192.168.0.117:3000/home/name/${props.uid}/${search}`
    );
    setResult_1ary(result);
    resettingRef.current = true;
    console.log(result);
    setIsLoading_1(false);
  };
  const getSearchCenterList_a = async (search) => {
    console.log(props.uid);

    const result = await axios.get(
      `http://192.168.0.117:3000/home/address/${props.uid}/${search}`
    );
    setResult_1ary(result);
    resettingRef.current = true;
    console.log(result);
    setIsLoading_1(false);
  };
  const getSearchCenterList_b = async (search) => {
    console.log(props.uid);

    const result = await axios.get(
      `http://192.168.0.117:3000/home/digit/${props.uid}/${search}`
    );
    setResult_1ary(result);
    resettingRef.current = true;
    console.log(result);
    setIsLoading_1(false);
  };
  const getSearchCenterList_c = async (search) => {
    //search : 날짜
    console.log(props.uid);

    const result = await axios
      .get
      // `http://192.168.0.117:3000/home/date/${props.uid}/${search}`  이거 안씀
      ();
    setResult_1ary(result);
    resettingRef.current = true;
    console.log(result);
    setIsLoading_1(false);
  };
  const getSearchCenterList_d = async (search) => {
    //search : 기록자 이름
    console.log(props.uid);

    const result = await axios.get(
      `http://localhost:3000/home/recorder/${props.uid}/${search}`
    );
    setResult_1ary(result);
    resettingRef.current = true;
    console.log(result);
    setIsLoading_1(false);
  };
  const onClick = (e) => {
    //		e.preventDefault();
    setCurrentResult("");
    setIsLoading_2(true);
    console.log(searchCenter);
    getSearchCenterList(searchCenter);
  };
  const onClick_a = (e) => {
    //		e.preventDefault();
    setCurrentResult("");
    setIsLoading_2(true);
    console.log(searchCenter);
    getSearchCenterList_a(searchCenter);
  };
  const onClick_b = (e) => {
    //		e.preventDefault();
    setCurrentResult("");
    setIsLoading_2(true);
    console.log(searchCenter);
    getSearchCenterList_b(searchCenter);
  };
  const onClick_c = (e) => {
    //		e.preventDefault();
    setCurrentResult("");
    setIsLoading_2(true);
    console.log(searchCenter);
    getSearchCenterList_c(searchCenter);
  };
  const onClick_d = (e) => {
    //		e.preventDefault();
    setCurrentResult("");
    setIsLoading_2(true);
    console.log(searchCenter);
    getSearchCenterList_d(searchCenter);
  };
  const onClick_email = async (e) => {
    if (centerInfo.callState_list.length === 0) return;
    else if (
      window.confirm(`${centerInfo.centerName}에게 메일을 보내시겠습니까?`)
    ) {
      const target_email = centerInfo.callState_list[0].m_email;
      const user_id = localStorage.getItem("userName");
      const c_id = centerInfo.centerID;
      const c_address = centerInfo.centerAddr;
      const c_name = centerInfo.centerName;
      const c_ph = centerInfo.centerPhoneNumber;
      const result = await axios.get(
        `http://192.168.0.117:3000/home/mail/${target_email}/${c_id}/${c_address}/${c_name}/${c_ph}/${user_id}`
      );
    }
  };
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onClick();
    }
  };
  const onKeyPress_a = (e) => {
    if (e.key == "Enter") {
      onClick_a();
    }
  };
  const onKeyPress_b = (e) => {
    if (e.key == "Enter") {
      onClick_b();
    }
  };
  const onKeyPress_c = (e) => {
    if (e.key == "Enter") {
      onClick_c();
    }
  };
  const onKeyPress_d = (e) => {
    if (e.key == "Enter") {
      onClick_d();
    }
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setSearchCenter(`${e.target.value}`);
  };

  const openAddCall = (e) => {
    setIsOpenAddCall(true);
  };
  const closeAddCall = async (error) => {
    if (error) {
      alert("작성 내용을 확인해 주세요");
    } else {
      alert("저장되었습니다");
      setIsOpenAddCall(false);
      const getCenterInfo = async () => {
        let result = await axios.get(
          `http://192.168.0.117:3000/home/${centerInfo.centerName}/search/${centerInfo.centerID}`
        );
        console.log(result.data.calls);
        setCenterInfo({
          centerName: centerInfo.centerName,
          centerAddr: centerInfo.centerAddr,
          centerPhoneNumber: centerInfo.centerPhoneNumber,
          centerID: centerInfo.centerID,
          callState_list: result.data.calls,
          applyState_list: result.data.applies,
        });
      };
      await getCenterInfo();
    }
  };
  const closeAddCallCancle = (e) => {
    setIsOpenAddCall(false);
  };
  const openAddApply = (e) => {
    setIsOpenAddApply(true);
  };
  const closeAddApply = (error) => {
    if (error) {
      alert("작성 내용을 확인해 주세요");
    } else {
      alert("저장되었습니다");
      setIsOpenAddApply(false);
    }
  };
  const closeAddApplyCancle = (e) => {
    setIsOpenAddApply(false);
  };
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      getSearchCenterList();
    }
  }, [called]);

  props.setIsLogined(localStorage.getItem("isLogined"));

  return props.isLogined ? (
    isLoading_1 ? (
      //검색어 입력 안된 텅빈 페이지
      <div class="body-container">
        <div class="main">
          <div class="main_serch">
            <div class="main_search_box">
              <div class="main_search_window">
                <span>이름으로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 이름 입력"
                  name="center"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
                <button class="main_search_btn" onClick={onClick}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>주소로 검색 : </span>

                <input
                  type="text"
                  placeholder="시설 주소 입력"
                  name="address"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_a}
                />
                <button class="main_search_btn" onClick={onClick_a}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>전화번호로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 전화번호 입력"
                  name="digit"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_b}
                />
                <button class="main_search_btn" onClick={onClick_b}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>기록자 이름 검색 : </span>
                <input
                  type="text"
                  placeholder="기록자 이름 입력"
                  name="nema"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_d}
                />
                <button class="main_search_btn" onClick={onClick_d}>
                  검색
                </button>
              </div>
            </div>
            <ul class="main_search_result_list list">
              <li>
                <div class="main_search_result_list_item">
                  <div class="center_info">시설 이름</div>
                  <div class="center_info_addr">주소</div>
                  <div class="center_info">전화번호</div>
                  <div class="center_info_num">시설 id</div>
                  <div class="center_info_num">연락 기록</div>
                </div>
              </li>
            </ul>
            <div class="main_search_result"></div>
          </div>
          <div class="main_info">
            <span>시설을 선택해 주세요</span>
          </div>
        </div>
        {/* <div class='agent-search'>
					<SearchAgent />
				</div> */}
      </div>
    ) : isLoading_2 ? (
      //검색어 입력 후 해당 이름의 시설 리스트를 받아온 화면
      <div class="body-container">
        <div class="main">
          <div class="main_serch">
            <div class="main_search_box">
              <div class="main_search_window">
                <span>이름으로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 이름 입력"
                  name="center"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
                <button class="main_search_btn" onClick={onClick}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>주소로 검색 : </span>

                <input
                  type="text"
                  placeholder="시설 주소 입력"
                  name="address"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_a}
                />
                <button class="main_search_btn" onClick={onClick_a}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>전화번호로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 전화번호 입력"
                  name="digit"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_b}
                />
                <button class="main_search_btn" onClick={onClick_b}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>기록자 이름 검색 : </span>
                <input
                  type="text"
                  placeholder="기록자 이름 입력"
                  name="nema"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_d}
                />
                <button class="main_search_btn" onClick={onClick_d}>
                  검색
                </button>
              </div>
            </div>
            <ul class="main_search_result_list list">
              <li>
                <div class="main_search_result_list_item">
                  <div class="center_info">시설 이름</div>
                  <div class="center_info_addr">주소</div>
                  <div class="center_info">전화번호</div>
                  <div class="center_info_num">시설 id</div>
                  <div class="center_info_num">연락 기록</div>
                </div>
              </li>
            </ul>
            <div class="main_search_result">
              <ul class="main_search_result_list list">
                {result_1ary.data !== "undefined"
                  ? result_1ary.data.map((result_1ary) => (
                      <li
                        key={result_1ary.center_id}
                        class={
                          currentResult === result_1ary.center_id
                            ? "list-items_search-centerlist_selected"
                            : "list-items_search-centerlist"
                        }
                      >
                        <CenterList
                          data={result_1ary}
                          setCurrentResult={setCurrentResult}
                          setIsLoading_2={setIsLoading_2}
                          uid={props.uid}
                          setCenterInfo={setCenterInfo}
                          called={called}
                          setSelected={setCurrentResult}
                        />
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div class="main_info">
            <span>시설을 선택해 주세요</span>
          </div>
        </div>
      </div>
    ) : (
      //센터 리스트중 한개를 선택하여 데이터를 오른쪽 화면에 띄우는 화면
      <div class="body-container">
        <div class="main">
          <div class="main_serch">
            <div class="main_search_box">
              <div class="main_search_window">
                <span>이름으로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 이름 입력"
                  name="center"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
                <button class="main_search_btn" onClick={onClick}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>주소로 검색 : </span>

                <input
                  type="text"
                  placeholder="시설 주소 입력"
                  name="address"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_a}
                />
                <button class="main_search_btn" onClick={onClick_a}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>전화번호로 검색 : </span>
                <input
                  type="text"
                  placeholder="시설 전화번호 입력"
                  name="digit"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_b}
                />
                <button class="main_search_btn" onClick={onClick_b}>
                  검색
                </button>
              </div>
              <div class="main_search_window">
                <span>기록자 이름 검색 : </span>
                <input
                  type="text"
                  placeholder="기록자 이름 입력"
                  name="nema"
                  class="main_serch_input"
                  onChange={onChange}
                  onKeyPress={onKeyPress_d}
                />
                <button class="main_search_btn" onClick={onClick_d}>
                  검색
                </button>
              </div>
            </div>
            <ul class="main_search_result_list list">
              <li>
                <div class="main_search_result_list_item">
                  <div class="center_info">시설 이름</div>
                  <div class="center_info_addr">주소</div>
                  <div class="center_info">전화번호</div>
                  <div class="center_info_num">시설 id</div>
                  <div class="center_info_num">연락 기록</div>
                </div>
              </li>
            </ul>
            <div class="main_search_result">
              <ul class="main_search_result_list list">
                {result_1ary.data.map((result_1ary) => (
                  <li
                    key={result_1ary.center_id}
                    class={
                      currentResult === result_1ary.center_id
                        ? "list-items_search-centerlist_selected"
                        : "list-items_search-centerlist"
                    }
                  >
                    <CenterList
                      data={result_1ary}
                      setCurrentResult={setCurrentResult}
                      setIsLoading_2={setIsLoading_2}
                      uid={props.uid}
                      setCenterInfo={setCenterInfo}
                      called={called}
                      setSelected={setCurrentResult}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="main_info">
            <div class="main_info_header main_info_item">
              <div>{centerInfo.centerName}</div>
              <div>{centerInfo.centerAddr}</div>
              <div>{centerInfo.centerPhoneNumber}</div>
            </div>
            <div class="info-header main_info_item">콜 이력</div>
            <div class="main_info_call-state main_info_item">
              <ul class="main_info_call-state_list list">
                {centerInfo.callState_list.map((data) => (
                  <li
                    key={centerInfo.center_id}
                    class="list-items call-state_items"
                  >
                    <CallState
                      callState_list={data}
                      data={result_1ary}
                      setCurrentResult={setCurrentResult}
                      setIsLoading_2={setIsLoading_2}
                      uid={props.uid}
                      setCenterInfo={setCenterInfo}
                      centerInfo={centerInfo}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div class="button_container">
              <div>
                <button
                  class="main_info_call-state_add main_info_item"
                  onClick={openAddCall}
                >
                  추가
                </button>
              </div>
              <div>
                <button
                  class="main_info_call-state_add main_info_item"
                  onClick={onClick_email}
                >
                  메일 전송
                </button>
              </div>
            </div>
            <AddCallState
              data={result_1ary}
              open={IsopenAddCall}
              closeSave={closeAddCall}
              closeCancle={closeAddCallCancle}
              uid={props.uid}
              centerID={centerInfo.centerID}
              IsSave={IsSave}
              setIsSave={setIsSave}
            />

            <div class="info-header main_info_item">시설 스케쥴</div>
            <div class="main_info_apply-state main_info_item">
              <ul class="main_info_apply-state_list list">
                {centerInfo.applyState_list.map((data) => (
                  <ApplyState applyState_list={data} setIsUpdate />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
}

export default Home;
