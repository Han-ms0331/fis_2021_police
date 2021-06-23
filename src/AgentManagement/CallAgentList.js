import React, { useState } from 'react';
import axios from 'axios';

function CallAgentList (props) {
    let result;
    let record = '없음';
<<<<<<< HEAD


=======
    const onClick = (e) => {
        props.setUpdateCall(true);
    }
>>>>>>> 95891661798510e9c45e37b8308f722bb1cdf382
    return props.callagentList ? (
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
    ) : null;


}

export default CallAgentList;