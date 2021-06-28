import React, { useState, useRef, useEffect } from "react";
import UpdateSchedule from "./UpdateSchedule";
import AddSchedule from "./AddSchedule";
import DeleteSchedule from "./DeleteSchedule";
import "../css/Selected.css";

function Selected(props) {
  const { setSelect, setResultSche, setIsSearched } = props;

  const schedule = JSON.parse(localStorage.getItem("selectedData"));
  const agent = JSON.parse(localStorage.getItem("agentList"));
  console.log(agent);
  let agent_schedule = [];

  const onClick = (e) => {
    e.preventDefault();
    if (e.target.name === "back") {
      localStorage.removeItem("selectedData");
      localStorage.removeItem("agentList");
      localStorage.removeItem("selectedDate");
      setSelect(false);
    }
  };

  return (
    <div class="select_body">
      {agent.map((data) => {
        agent_schedule.splice(0, agent_schedule.length);
        for (let i in schedule) {
          if (schedule[i].aid === data.agent_id) {
            agent_schedule.push(schedule[i]);
          }
        }
        return (
          <div class="select_container">
            <div class="select_agent">{data.agent_id}</div>

            {agent_schedule.map((data_2) => {
              return (
                <div class="select_schedule">
                  <div class="select_schedule_info_container">
                    <div class="select_schedule_info">{data_2.c_name}</div>
                    <div class="select_schedule_info">{data_2.c_address}</div>
                    <div class="select_schedule_info">{data_2.c_ph}</div>
                    <div class="select_schedule_info">{data_2.visit_date}</div>
                    <div class="select_schedule_info">{data_2.visit_time}</div>
                    <div class="select_schedule_info">
                      {data_2.estimate_num}명
                    </div>
                    <td class="select_schedule_info_etc">{data_2.etc}</td>
                    <DeleteSchedule
                      data={data_2}
                      agent_id={data.agent_id}
                      setSelect={setSelect}
                      setResultSche={setResultSche}
                      setIsSearched={setIsSearched}
                    />
                    <UpdateSchedule
                      data={data_2}
                      agent_id={data.agent_id}
                      setSelect={setSelect}
                      setResultSche={setResultSche}
                      setIsSearched={setIsSearched}
                    />
                  </div>
                </div>
              );
            })}
            <div class="select_add_container">
              <AddSchedule
                agent_id={data.agent_id}
                setSelect={setSelect}
                setResultSche={setResultSche}
                setIsSearched={setIsSearched}
              />
            </div>
          </div>
        );
      })}

      <button id="back_btn" name="back" onClick={onClick}>
        뒤로가기
      </button>
    </div>
  );
}

export default Selected;
