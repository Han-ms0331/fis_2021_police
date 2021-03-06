import React, { useState } from "react";
import axios from "axios";
import "../css/centerlist.css";
import CenterUpdate from "./CenterUpdate.js";
import isdanger from "./isdanger";

function CenterList(props) {
  const { check } = props;
  const [test, setTest] = useState(true);
  let result;
  let record = "없음";
  let danger_flag = isdanger.check_danger(props.data.c_address);
  if (props.data.call_exists !== 0) {
    record = props.data.call_exists;
  }
  if (props.data.participation !== 0) {
    record = props.data.participation;
  }
  console.log(check);
  console.log(props.check);
  //	console.log(props.data);
  const getCenterInfo = async () => {
    result = await axios.get(
      `http://192.168.0.117:3000/home/${props.uid}/search/${props.data.center_id}`
    );
    console.log(result.data.calls);
    props.setCenterInfo({
      centerName: props.data.c_name,
      centerAddr: props.data.c_address,
      centerPhoneNumber: props.data.c_ph,
      centerID: props.data.center_id,
      callState_list: result.data.calls,
      applyState_list: result.data.applies,
    });
  };
  const update = (e) => {
    if (check == true) {
      onClick();
    }
  };
  const onClick = (e) => {
    const data = JSON.stringify(props.data);
    localStorage.setItem("data", data);
    console.log(props.data);
    // props.setCenterInfo(props.data);
    console.log(check);
    e.preventDefault();
    props.setCurrentResult(props.data.center_id);
    getCenterInfo();
    props.setIsLoading_2(false);
    setTest(true);
    const states = JSON.parse(localStorage.getItem("data"));
  };
  console.log(record);
  if (danger_flag === 0)
    return (
      <div class={"main_search_result_list_item"}>
        <div class="center_info">{props.data.c_name}</div>
        <div class="center_info_addr">{props.data.c_address}</div>
        <div class="center_info">{props.data.c_ph}</div>
        <div class="center_info_num">{props.data.center_id}</div>
        <div
          class={
            record === "참여"
              ? "center_info_num-participation"
              : record === "거부"
              ? "center_info_num-reject"
              : record === "보류"
              ? "center_info_num-thinking"
              : record === "확정"
              ? "center_info_num-comp"
              : "center_info_num"
          }
        >
          {record}
        </div>
        <div class="center_info_btn">
          <button class="main_search_result_list_btn" onClick={onClick}>
            선택
          </button>
        </div>
      </div>
    );
  else
    return (
      <div class="main_search_result_list_item danger">
        <div class="center_info">{props.data.c_name}</div>
        <div class="center_info_addr">{props.data.c_address}</div>
        <div class="center_info">{props.data.c_ph}</div>
        <div class="center_info_num">{props.data.center_id}</div>
        <div
          class={
            record === "참여"
              ? "center_info_num-participation"
              : record === "거부"
              ? "center_info_num-reject"
              : record === "보류"
              ? "center_info_num-thinking"
              : record === "확정"
              ? "center_info_num-comp"
              : "center_info_num"
          }
        >
          {record}
        </div>
        <div class="center_info_btn">
          <button class="main_search_result_list_btn" onClick={onClick}>
            선택
          </button>
        </div>
      </div>
    );
}

export default CenterList;
