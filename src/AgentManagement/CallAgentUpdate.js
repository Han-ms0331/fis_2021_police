import React, { useState } from 'react';
import axios from 'axios';

function CallAgentUpdate (props) {

    const states = JSON.parse(localStorage.getItem("data"));

    const [u_name, setName] = useState(props.callagentInfo.u_name);
    const [u_pwd, setPwd] = useState(props.callagentInfo.u_pwd);
    const [u_ph, setPhone] = useState(props.callagentInfo.u_ph);

    const onChange = (e) => {
        if (e.target.name === 'u_name') {
            setName(e.target.value);
        } else if (e.target.name === 'u_pwd') {
			setPwd(e.target.value);
		} else if (e.target.name === 'u_ph') {
			setPhone(e.target.value);
		}
    };
    // console.log(props.callagentInfo.u_name);
    // console.log(u_name);
    // console.log(states.u_name);
    const send = async() => {
        const result = await axios.post(
            `http://192.168.0.117:3000/userid/${props.callagentInfo.user_id}/modifyuser`,
            JSON.stringify({
                u_name: u_name,
                u_pwd: u_pwd,
                u_ph: u_ph
            })
        );
    }

    const onClick = (e) => {
        e.preventDefault();
        if(e.target.name === 'update') {
            if(window.confirm('수정된 내용을 저장하시겠습니까?')) {
                alert('저장되었습니다.');
                send();
                console.log(props.callagentInfo.user_id);
                console.log(u_pwd);
                console.log(u_ph);
                props.setUpdateCall(false);
            }
        }  
    }

    const cancel = (e) => {
        props.setUpdateCall(false);
    }


    return props.updateCall ? (
        <div>
            <div>
                <p>**내용을 반드시 모두 입력해주세요.**</p>
            </div>
            <div>
                <span>직원명: </span>
                <input
                    name='u_name'
                    type='text'
                    placeholder={props.callagentInfo.u_name}
                    // value={props.callagentInfo.u_name}
                    onChange={onChange}
                />
            </div>
            <div>   
                <span>비밀번호: </span>
                <input
                    name='u_pwd'
                    type='text'
                    placeholder={props.callagentInfo.u_pwd}
                    // value={props.callagentInfo.u_pwd}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>전화번호: </span>
                <input  
                    name='u_ph'
                    type='text'
                    placeholder={props.callagentInfo.u_ph}
                    // value={props.callagentInfo.u_ph}
                    onChange={onChange}
                />
            </div>
            <div>
                <button name='update' onClick={onClick}>
                    저장
                </button>
                <button name='cancel' onClick={cancel}>
                    취소
                </button>
            </div>
        </div>
    ) : null;
}

export default CallAgentUpdate;