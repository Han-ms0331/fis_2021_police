import React, { useState } from 'react';
import axios from 'axios';

function AgentList (props) {
    let result;
    let record = '없음';

    const getAgent = async () => {
        result = await axios.get(
            'url'
        );
        console.log(result);
        props.setAgentInfo({
            agent_id: "",
            a_name: props.searchAgent,
            a_ph: "",
            a_address: "",
            a_langtitude: "",
            a_longtitude: ""
        });
    };


    return props.agentList ? (
        <div>agentlist</div>
    ) : null;
}

export default AgentList;