import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router";
import SearchAgent from "./SearchAgent";
import ListDate from "./ListDate";
import "./css/TotalSchedule.css";

function Schedule(props) {
  const [region, setRegion] = useState("");
  const [month, setMonth] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  let collect_schedule = Array.from(Array(31), () => Array(0).fill(null));
  const [agent, setAgent] = useState([]);
  const [collect, setCollect] = useState([]);
  const [result_ary, setResult_ary] = useState([]);
  const date_check = new Date(2021, month, 0);
  const date = date_check.getDate();
  const resettingRef = useRef(false);

  const awaitf = async () => {};

  const onChangeR = (e) => {
    setRegion(e.target.value);
    setIsSearch(false);
  };
  const onChangeM = (e) => {
    let result;
    if (e.target.value < 10) {
      result = "0" + `${e.target.value}`;
    }
    setMonth(e.target.value);
    console.log(result);
    setIsSearch(false);
  };
  const date_30 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const date_31 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const getSchedule = async () => {
    const result = await axios.get(
      `http://192.168.0.117:3000/schedule/${region}/${month}`
    );
    console.log(result.data.sches);
    resettingRef.current = true;
    setResult_ary(result.data.sches);
    console.log(result_ary);
    setAgent(result.data.agents);
    console.log(agent);
    for (let i in result_ary) {
      const cd = new Date(result_ary[i].visit_date);
      collect_schedule[cd.getDate() - 1].push(result_ary[i]);
    }

    setCollect(collect_schedule);
  };
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      getSchedule();
    }
  }, [result_ary]);

  const onClick = (e) => {
    e.preventDefault();
    // result_month = month;
    getSchedule();
    setIsSearch(true);
  };

  props.setIsLogined(localStorage.getItem("isLogined"));
  return props.isLogined ? (
    <div class="search-main">
      <div class="search-main_search_box">
        <input
          type="text"
          placeholder="지역 입력"
          name="region"
          class="main_serch_date"
          onChange={onChangeR}
        />
        <input
          type="number"
          placeholder="월 입력"
          min="1"
          max="12"
          name="date"
          class="main_serch_date"
          onChange={onChangeM}
        />
        <button class="search-main_search_btn" onClick={onClick}>
          검색
        </button>
      </div>
      <div class="search-schedule-result">
        <div class="search-schedule-date">
          {isSearch ? (
            <ul class="agent-schedule-list">
              {date === 30
                ? date_30.map((data, index) => {
                    let today = new Date(2021, month - 1, data);
                    const days = [
                      "일요일",
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                    ];
                    const day = days[today.getDay()];
                    if (today.getDay() !== 0 && today.getDay() !== 6) {
                      return (
                        <li key={index} class="agent-schedule-item">
                          <div class="date-container">
                            <div class="date-header">
                              <div class="date-month">{month}월</div>
                              <div class="date-date">{data}일</div>
                              <div class="date-month">{day}</div>
                            </div>
                            <div class="date-body">
                              <ul class="agnet_list">
                                {agent.map((data) => {
                                  let time9 = {
                                    data: { c_name: "일정 없음" },
                                    time: "09:00",
                                  };
                                  let time10 = {
                                    data: { c_name: "일정 없음" },
                                    time: "10:00",
                                  };
                                  let time11 = {
                                    data: { c_name: "일정 없음" },
                                    time: "11:00",
                                  };
                                  let time12 = {
                                    data: { c_name: "일정 없음" },
                                    time: "12:00",
                                  };

                                  for (let i in collect[index]) {
                                    if (
                                      collect[index][i].aid === data.agent_id
                                    ) {
                                      let st = collect[index][i].visit_time;

                                      if (st < time10.time) {
                                        time9.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (
                                        time10.time <= st &&
                                        st < time11.time
                                      ) {
                                        time10.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (
                                        time11.time <= st &&
                                        st < time12.time
                                      ) {
                                        time11.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (time12.time <= st) {
                                        time12.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      }
                                    }
                                  }
                                  return (
                                    <li class="agent_item">
                                      <div class="agent-container">
                                        <div class="agent-id">
                                          {data.agent_id}
                                        </div>
                                        <ul class="time_list">
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time9.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time10.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time11.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time12.data.c_name}
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })
                : date_31.map((data, index) => {
                    let today = new Date(2021, month - 1, data);
                    const days = [
                      "일요일",
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                    ];
                    const day = days[today.getDay()];
                    if (today.getDay() !== 0 && today.getDay() !== 6) {
                      return (
                        <li key={index} class="agent-schedule-item">
                          <div class="date-container">
                            <div class="date-header">
                              <div class="date-month">{month}월</div>
                              <div class="date-date">{data}일</div>
                              <div class="date-month">{day}</div>
                            </div>
                            <div class="date-body">
                              <ul class="agent_list">
                                {agent.map((data) => {
                                  let time9 = {
                                    data: { c_name: "일정 없음" },
                                    time: "09:00",
                                  };
                                  let time10 = {
                                    data: { c_name: "일정 없음" },
                                    time: "10:00",
                                  };
                                  let time11 = {
                                    data: { c_name: "일정 없음" },
                                    time: "11:00",
                                  };
                                  let time12 = {
                                    data: { c_name: "일정 없음" },
                                    time: "12:00",
                                  };

                                  for (let i in collect[index]) {
                                    if (
                                      collect[index][i].aid === data.agent_id
                                    ) {
                                      let st = collect[index][i].visit_time;
                                      console.log(st);
                                      if (st < time10.time) {
                                        time9.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (
                                        time10.time <= st &&
                                        st < time11.time
                                      ) {
                                        time10.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (
                                        time11.time <= st &&
                                        st < time12.time
                                      ) {
                                        time11.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      } else if (time12.time <= st) {
                                        time12.data = {
                                          c_address:
                                            collect[index][i].c_address,
                                          c_name: collect[index][i].c_name,
                                          cid: collect[index][i].cid,
                                          estimate_num:
                                            collect[index][i].estimate_num,
                                          visit_time:
                                            collect[index][i].visit_time,
                                        };
                                      }
                                    }
                                  }
                                  return (
                                    <li class="agent_item">
                                      <div class="agent-container">
                                        <div class="agent-id">
                                          {data.agent_id}
                                        </div>
                                        <ul class="time_list">
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time9.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time10.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time11.data.c_name}
                                            </div>
                                          </li>
                                          <li class="sche_list">
                                            <div class="time_sche">
                                              {time12.data.c_name}
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Schedule;
