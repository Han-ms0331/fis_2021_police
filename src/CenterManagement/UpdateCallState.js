import { data } from 'browserslist';
import React, { useState } from 'react';
import AddCallState from './AddCallState';

function UpdateCallState(props) {
    const { data, update, closeCancel  } = props;
    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate()
    };
    if(today.month < 10){
        today.month = '0' +today.month;
    }
    if(today.day < 10) {
        today.day = '0' + today.day;
    }
    const [date, setDate] = useState(
        today.year + '-' + today.month + '-' + today.date
    );

    const send_data = {
        name: data.c_manager,
        date: data.date,
        estimate_num: data.estimate_num,
        m_email: data.m_email,
        m_ph: data.m_ph,
        participation: data.participation,
        uid: data.uid,
        etc: data.etc
    };
    const onChange = (e) => {
        if(e.target.name === 'name') {
            send_data.name = e.target.value;
        } else if (e.target.name === 'date') {
            send_data.date = e.target.value;
        } else if (e.target.name === 'estimate_num') {
            send_data.estimate_num = e.target.value;
        } else if (e.target.name === 'm_email') {
            send_data.m_email = e.target.value;
        } else if (e.target.name === 'm_ph') {
            send_data.m_ph = e.target.value;
        } else if (e.target.name === 'participation') {
            send_data.participation = e.target.value;
        } else if (e.target.name === 'uid') {
            send_data.uid = e.target.value;
        } else if (e.target.name === 'etc') {
            send_data.etc = e.target.value;
        }
    }

    const dataChange = (e) => {
        console.log(data.name);
    }
    return update ? (
        <div class='update_call_state'>
            <div>
                <span>담당자 이름: </span>
                <input
                    name='name'
                    type='type'
                    placeholder='담당자 이름'
                    onChange={onChange}
                />
            </div>

            <div>
                <span>연락 일자: </span>
                <input
                    name='date'
                    type='text'
                    placeholder='연락일자'
                    value={today.year + '-' + today.month + '-' + today.date}
                    onChange={onChange}
                />
            </div>

            <div>
                <span>인/아웃 바운드: </span>
                <select name='bound' onChange={onChange}>
                    <option value='인바운드/아웃바운드'>===선택===</option>
                    <option value='인'>인</option>
                    <option value='아웃'>아웃</option>
                </select>
            </div>

            <div>
                <span>예상인원: </span>
                <input  
                    name='estimate_num'
                    type='text'
                    placeholder='예상인원'
                    onChange={onChange}
                />
            </div>

            <div>
                <span>담당자 이메일 주소: </span>
                <input 
                    name='email'
                    type='text'
                    placeholder='담당자 이메일 주소'
                    onChange={onChange}
                />
            </div>

            <div>
                <span>시설 참여 여부: </span>
                <select name='attend' onChange={onChange}>
                    <option value = '선택'>===선택===</option>
                    <option value = '참여'>참여</option>
                    <option value = '거부'>거부</option>
                    <option value = '보류'>보류</option>
                </select>
            </div>

            <div>
                <span>기록자 이름: </span>
                <input 
                    name='recorder'
                    type='text'
                    placeholder='기록자 이름'
                    onChange={onChange}
                />
            </div>

            <div>
                <div>특이사항: </div>
                <textarea
                    name='etc'
                    placeholder='특이사항'
                    onInput={onChange}></textarea>
            </div>

            <div>
                <button onClick={dataChange}>저장</button>
                <button onClick={closeCancel}>닫기</button>
            </div>



        </div>
    ) : null;
}

export default UpdateCallState;