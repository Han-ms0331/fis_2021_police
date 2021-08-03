import React from "react";

function ApplyState(props) {
  const { applyState_list } = props;
  console.log(applyState_list);
  let latest;
  if (applyState_list.latest === 1) {
    latest = true;
  } else {
    latest = false;
  }

  return latest ? (
    <li key={applyState_list.center_id} class="list-items apply-state_items">
      <div class="main_info_apply-state_list_item">
        <div class="information">현장 요원ㅤㅤ :ㅤㅤ{applyState_list.aid}</div>
        {/* <div class="information">
          진행 여부ㅤㅤ :ㅤㅤ{applyState_list.collect}
        </div> */}
        <div class="information">
          예상 인원ㅤㅤ :ㅤㅤ{applyState_list.estimate_num}명
        </div>
        <div class="information">
          예약 날짜ㅤㅤ :ㅤㅤ{applyState_list.recept_date}
        </div>
        <div class="information">
          방문 날짜ㅤㅤ :ㅤㅤ{applyState_list.visit_date}
        </div>
        <div class="information">
          방문 시간ㅤㅤ :ㅤㅤ{applyState_list.visit_time}
        </div>
        <div class="information">
          기록자 이름ㅤ :ㅤㅤ{applyState_list.u_name}
        </div>
        <div class="information">특이 사항ㅤ ㅤ:ㅤㅤ{applyState_list.etc}</div>
      </div>
    </li>
  ) : null;
}

export default ApplyState;
