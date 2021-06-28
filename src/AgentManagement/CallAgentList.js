import React, { useState } from 'react';
import axios from 'axios';
import '../css/AgentManage.css'

function CallAgentList (props) {
    const onClick = (e) => {
        props.setUpdateCall(true);
        props.setCallAgentInfo(props.data);
        console.log(props.data.user_id);
        const data = JSON.stringify(props.data)
		localStorage.setItem("data", data)
    }
    const send = async () => {
        const result = await axios.get(
            `http://192.168.0.117:3000/userid/${props.data.user_id}/deleteuser`
        );
    }

    const delete_data = (e) => {
        console.log(props.data.user_id);
        e.preventDefault();
        if(e.target.name === 'delete') {
            if(window.confirm(`${props.data.u_name}님의 정보를 삭제하시겠습니까?`)) {
                alert('삭제되었습니다.');
                send();
            }
        }
    }
    console.log(props.data);
    return props.callagentList ? (
        <div class='agent_list'>
            <div class='agent_info'>
                {props.data.u_name}
            </div>
            <div class='agent_info'>
                {props.data.u_pwd}
            </div>
            <div class='agent_info'>
                {props.data.u_ph}
            </div>
            <div>
                <button onClick={onClick}>
                    선택
                </button>
            </div>
            <div>
                <button name='delete' onClick={delete_data}>
                    삭제
                </button>
            </div>
        </div>
    ) : null;


}

export default CallAgentList;