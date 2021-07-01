import React, { useState } from 'react';
import axios from 'axios';
// import { send } from '../../servers/mail';

function AgentList (props) {
    const onClick = (e) => {
        props.setUpdateAgent(true);
        props.setAgentInfo(props.data);
        console.log(props.data.agent_id);
        const data = JSON.stringify(props.data);
        localStorage.setItem("data", data);
    }
    console.log(props.data);

    const send = async () => {
        const result = await axios.get(
            `http://192.168.0.117:3000/${props.userName}/${props.data.agent_id}/deleteagent` //userid랑 agentid 변수로
        )
    }

    const delete_data = (e) => {
        console.log(props.userName);
        console.log(props.data.agent_id);
        e.preventDefault();
        if(e.target.name === 'delete') {
            if(window.confirm(`${props.data.a_name}님의 정보를 삭제하시겠습니까?`)) {
                alert('삭제되었습니다.');
                send();
            }
        }
    }

    return props.agentList ? (
        <div class='agent_list'>
            <div class='agent_info'>
                {props.data.agent_id}
            </div>
            <div class='agent_info'>
                {props.data.a_name}
            </div>
            <div class='agent_info'>
                {props.data.a_ph}
            </div>
            <div class='agent_info'>
                {props.data.a_address}
            </div>
            <div class='agent_info'>
                {props.data.a_latitude}
            </div>
            <div class='agent_info'>
                {props.data.a_longtitude}
            </div>
            <div>
                <button onClick={onClick}>
                    선택
                </button>
                <button name='delete' onClick={delete_data}>
                    삭제
                </button>
            </div>
        </div>
    ) : null;
}
export default AgentList;