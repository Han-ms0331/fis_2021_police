import React, { useState } from 'react';
import axios from 'axios';

function AgentUpdate (props) {    
    const [agent_id, setAgentID] = useState('');
    const [a_name, setName] = useState('');
    const [a_ph, setPhone] = useState('');
    const [a_address, setAddress] = useState('');
    const [a_latitude, setLatitude] = useState('');
    const [a_longtitude, setLongtitude] = useState('');

    const onChange = (e) => {
        if (e.target.name === 'agent_id') {
            setAgentID(e.target.value);
        } else if (e.target.name === 'a_name') {
			setName(e.target.value);
		} else if (e.target.name === 'a_ph') {
			setPhone(e.target.value);
		} else if (e.target.name === 'a_address') {
			setAddress(e.target.value);
		} else if (e.target.name === 'a_latitude') {
			setLatitude(e.target.value);
		} else if (e.target.name === 'a_longtitude') {
			setLongtitude(e.target.value);
		}
    };

    const send = async() => {
        const result = await axios.post(
            'http://192.168.0.117:3000/userid/aid/modifyagent',
            JSON.stringify({
                agent_id: agent_id,
                a_name: a_name,
                a_ph: a_ph,
                a_address: a_address,
                a_latitude: a_latitude,
                a_longtitude
            })
        );
    }

    const onClick = (e) => {
        e.preventDefault();
        if(e.target.name === 'update') {
            if(window.confirm('수정된 내용을 저장하시겠습니까?')) {
                alert('저장되었습니다.');
                send();
                console.log(agent_id);
                console.log(a_name);
                props.setUpdateAgent(false);
            }
        }
        
    }

    const cancel = (e) => {
        props.setUpdateAgent(false);
    }

    return props.updateAgent ? (
        <div>
            <div>
                <span>Agent ID: </span>
                <input
                    name='agent_id'
                    type='text'
                    placeholder='agent_id'
                    // value={props.agentInfo.agent_id}
                    onChange={onChange}
                />
            </div>
            <div>   
                <span>현장요원 이름: </span>
                <input
                    name='a_name'
                    type='text'
                    placeholder='이름'
                    value={props.agentInfo.a_name}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현장요원 전화번호: </span>
                <input  
                    name='a_ph'
                    type='text'
                    placeholder='전화번호'
                    value={props.agentInfo.a_ph}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현장요원 집주소: </span>
                <input 
                    name='a_address'
                    type='text'
                    placeholder='집주소'
                    value={props.agentInfo.a_address}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현장요원 위도: </span>
                <input
                    name='a_latitude'
                    type='text'
                    placeholder='위도'
                    value={props.agentInfo.a_latitude}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현장요원 경도: </span>
                <input
                    name='a_longtitude'
                    type='text'
                    placeholder='경도'
                    value={props.agentInfo.a_longtitude}
                    onChange={onChange}
                />
            </div>
            <div>
                <button onClick={onClick}>
                    저장
                </button>
                <button onClick={cancel}>
                    취소
                </button>
            </div>
        </div>
    ) : null;
}

export default AgentUpdate;