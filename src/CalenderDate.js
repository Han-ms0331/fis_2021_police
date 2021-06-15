import React, { useState, useRef, useEffect } from "react";

function ScheduleManager(props) {
  const { schedule, view, resultAgent, setSelect, date, month } = props;
  const onClick = () => {
    let this_date;
    let this_month;
    localStorage.setItem("selectedData", JSON.stringify(props.schedule));
    localStorage.setItem("agentList", JSON.stringify(props.resultAgent));
    if (month < 10) {
      this_month = "0" + month;
    } else {
      this_month = month;
    }
    if (date < 10) {
      this_date = "0" + date;
    } else {
      this_date = date;
    }
    localStorage.setItem("selectedDate", `2021-${this_month}-${this_date}`);
    setSelect(true);
  };
  return view ? (
    <div class="datebox-schedule">
      {resultAgent.map((data) => {
        let time9 = {
          class: "sche_list",
          time: "09:00",
        };
        let time10 = {
          class: "sche_list",
          time: "10:00",
        };
        let time11 = {
          class: "sche_list",
          time: "11:00",
        };
        let time12 = {
          class: "sche_list",
          time: "12:00",
        };
        for (let i in schedule) {
          if (schedule[i].aid === data.agent_id) {
            let st = schedule[i].visit_time;
            if (st < time10.time) {
              time9.class = "sche_list_update";
            } else if (time10.time <= st && st < time11.time) {
              time10.class = "sche_list_update";
            } else if (time11.time <= st && st < time12.time) {
              time11.class = "sche_list_update";
            } else if (time12.time <= st) {
              time12.class = "sche_list_update";
            }
          }
        }
        return (
          <div class="agent-schedule">
            <div class="agent-id">{data.agent_id}</div>
            <div class="agent-lists">
              <div class={time9.class}>ㅤ</div>
              <div class={time10.class}>ㅤ</div>
              <div class={time11.class}>ㅤ</div>
              <div class={time12.class}>ㅤ</div>
            </div>
          </div>
        );
      })}
      <div class="calendar_select">
        <button onClick={onClick} id="calendar_select_btn">
          선택
        </button>
      </div>
    </div>
  ) : null;
}

export default ScheduleManager;
