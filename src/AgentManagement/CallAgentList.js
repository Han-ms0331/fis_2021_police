import React, { useState } from 'react';
import axios from 'axios';

function CallAgentList (props) {
    const onClick = (e) => {
        props.setUpdateCall(true);
        props.setCallAgentInfo(props.data);
        const data = JSON.stringify(props.data)
		localStorage.setItem("data", data)
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
        </div>
    ) : null;


}

export default CallAgentList;