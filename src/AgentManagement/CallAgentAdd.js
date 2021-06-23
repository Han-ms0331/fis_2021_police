import React, { useState } from 'react';
import axios from 'axios';

function CallAgentAdd (props) {

    const [u_name, setName] = useState('');
    const [u_pwd, setPwd] = useState('');
    const [u_ph, setPh] = useState('');

    const onChange = (e) => {
        if (e.target.name === 'u_name') {
            setName(e.target.value);
        } else if (e.target.name === 'u_pwd') {
            setPwd(e.target.value);
        } else if (e.target.name === 'u_ph') {
            setPh(e.target.value);
        }
    }

    const send = async() => {
        const result = await axios.post(
            'http://192.168.0.117:3000/userid/setuser', 
            JSON.stringify({
                u_name: u_name,
                u_pwd: u_pwd,
                u_ph: u_ph
            })
        );
    }

    const checkit = (e) => {
        window.confirm('추가하시겠습니까?');
        console.log('u_name');
        console.log('u_ph');
        props.setAddCall(false);
        send();
    }

    const checkout = (e) => {
        window.confirm('취소하시겠습니까?');
        props.setAddCall(false);
    }


    return props.addCall ? (
        <div>
            <div>
                <span>직원명: </span>
                <input
                    name='u_name'
                    type='text'
                    placeholder='직원명'
                    defaultValue={props.searchAgent}
                    onChange={onChange}
                    required
                />
            </div>
            <div>   
                <span>비밀번호: </span>
                <input
                    name='u_pwd'
                    type='text'
                    placeholder='비밀번호'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>전화번호: </span>
                <input  
                    name='u_ph'
                    type='text'
                    placeholder='전화번호'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <button onClick={checkit}>
                    추가
                </button>
                <button onClick={checkout}>
                    취소
                </button>
            </div>
        </div>
    ) : null;
}

export default CallAgentAdd;