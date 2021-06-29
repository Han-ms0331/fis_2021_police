import React, { useState } from 'react';
import axios from 'axios';

function AgentList (props) {
    const onClick = (e) => {
        props.setUpdateAgent(true);
        props.setAgentInfo(props.data);
        console.log(props.data.agent_id);
        const data = JSON.stringify(props.data);
        localStorage.setItem("data", data);
    }
    console.log(props.data);

    return props.agentList ? (
        <div>
            <div>
                {props.data.agent_id}
            </div>
            <div>
                {props.data.a_name}
            </div>
            <div>
                {props.data.a_ph}
            </div>
            <div>
                {props.data.a_address}
            </div>
            <div>
                {props.data.a_latitude}
            </div>
            <div>
                {props.data.a_longtitude}
            </div>
            <div onClick={onClick}>
                선택
            </div>
            <div>
                삭제
            </div>
        </div>
    ) : null;
}
export default AgentList;