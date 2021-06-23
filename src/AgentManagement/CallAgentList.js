import React, { useState } from 'react';
import axios from 'axios';

function CallAgentList (props) {
    let result;
    let record = '없음';

    const getAgent = async() => {
        result = await axios.get(
            'http://192.168.0.117:3000/getusers'
        );
        console.log(result);
    };

    return props.callagentList ? (
        <div>callagentList</div>
    ) : null;


}

export default CallAgentList;