import React, { useState } from 'react';
import axios from 'axios';

function CallAgentList (props) {
    let result;
    let record = '없음';
    const onClick = (e) => {
        props.setUpdateCall(true);
        props.setCallAgentInfo(props.data);
    }
    console.log(props.data);
    return (
        <div>
            <div>
                {props.data.u_name}
            </div>
            <div>
                {props.data.u_pwd}
            </div>
            <div>
                {props.data.u_ph}
            </div>
            <div>
                <button onClick={onClick}>
                    선택
                </button>
            </div>
        </div>
    ) ;


}

export default CallAgentList;