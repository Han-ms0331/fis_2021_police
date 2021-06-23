import axios from 'axios';
import React, { useState } from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';


function CenterUpdate(props) {
    const { check, test, setIsLoading_2 } = props;

    console.log(localStorage.getItem("data"));
    const states = JSON.parse(localStorage.getItem("data"));

    const [center_id, setCenterId] = useState(states.center_id);
    const [c_sido, setSido] = useState(states.c_sido);
    const [c_sigungu, setSigungu] = useState(states.c_sigungu);
    const [c_name, setName] = useState(states.c_name);
    const [c_type, setType] = useState(states.c_type);
    const [c_status, setStatus] = useState(states.c_status);
    const [c_address, setAddress] = useState(states.c_address);
    const [c_zipcode, setZipcode] = useState(states.c_zipcode);
    const [c_ph, setPhone] =useState(states.c_ph);
    const [c_fax_num, setFax] = useState(states.c_fax_num);
    const [c_people, setPeople] = useState(states.c_people);
    const [c_hp_address, setHome] = useState(states.c_hp_address);
    const [c_latitude, setLatitude] = useState(states.c_latitude);
    const [c_longtitude, setLongtitude] = useState(states.c_longtitude);
    
	const onChange = (e) => {
        if (e.target.name === 'center_id') {
            setCenterId(e.target.value);
        } else if (e.target.name === 'c_sido') {
			setSido(e.target.value);
		} else if (e.target.name === 'c_sigungu') {
			setSigungu(e.target.value);
		} else if (e.target.name === 'c_name') {
			setName(e.target.value);
		} else if (e.target.name === 'c_type') {
			setType(e.target.value);
		} else if (e.target.name === 'c_status') {
			setStatus(e.target.value);
		} else if (e.target.name === 'c_address') {
			setAddress(e.target.value);
		} else if (e.target.name === 'c_zipcode') {
			setZipcode(e.target.value);
		} else if (e.target.name === 'c_ph') {
			setPhone(e.target.value);
		} else if (e.target.name === 'c_fax_num') {
            setFax(e.target.value);
        } else if (e.target.name === 'c_people') {
            setPeople(e.target.value);
        } else if (e.target.name === 'c_hp_address') {
            setHome(e.target.value);
        } else if (e.target.name === 'c_latitude') {
            setLatitude(e.target.value);
        } else if (e.target.name === 'c_longtitude') {
            setLongtitude(e.target.value);
        }
	};

    const send = async() => {
        const result = await axios.post(
            'http://192.168.0.117:3000/userid/center_update',
            JSON.stringify({
                center_id: center_id,
                c_sido: c_sido,
                c_sigungu: c_sigungu,
                c_name: c_name,
                c_type: c_type,
                c_status: c_status,
                c_address: c_address,
                c_zipcode: c_zipcode,
                c_ph: c_ph,
                c_fax_num: c_fax_num,
                c_people: c_people,
                c_hp_address: c_hp_address,
                c_latitude: c_latitude,
                c_longtitude: c_longtitude
            })
        );
    }
    const onClick = (e) => {
        e.preventDefault();
		if (e.target.name === 'update') {
			if (window.confirm('수정된 내용을 저장하시겠습니까?')) {
				alert('저장되었습니다.');
                send();
                console.log(center_id);
                console.log(c_name);
                console.log(c_ph)
            }
        }
        props.setIsLoading_2(true);
    }

    const cancel = (e) => {
        props.setIsLoading_2(true);
    }
    return check ? (
        null
    ) : test ? (
        null
    ) : (
        <div class='add_center_list'>
            <div>
                <span>Center ID: </span>
                <input
                    name='center_id'
                    type='text'
                    placeholder='center_id'
                    defaultValue={states.center_id}
                    onChange={onChange}
                />
            </div>
            <div>   
                <span>시도: </span>
                <input
                    name='c_sido'
                    type='text'
                    placeholder='시도'
                    defaultValue={states.c_sido}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>시군구: </span>
                <input  
                    name='c_sigungu'
                    type='text'
                    placeholder='시군구'
                    defaultValue={states.c_sigungu}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>시설명: </span>
                <input 
                    name='c_name'
                    type='text'
                    placeholder='시설명'
                    defaultValue={states.c_name}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>유형: </span>
                <input
                    name='c_type'
                    type='text'
                    placeholder='유형'
                    defaultValue={states.c_type}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>운영현황: </span>
                <input
                    name='c_status'
                    type='text'
                    placeholder='운영현황'
                    defaultValue={states.c_status}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>주소: </span>
                <input
                    name='c_address'
                    type='text'
                    placeholder='주소'
                    defaultValue={states.c_address}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>우편번호: </span>
                <input 
                    name='c_zipcode'
                    type='text'
                    placeholder='우편번호'
                    defaultValue={states.c_zipcode}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>전화번호: </span>
                <input 
                    name='c_ph'
                    type='text'
                    placeholder='전화번호'
                    defaultValue={states.c_ph}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>팩스번호: </span>
                <input 
                    name='c_fax_num'
                    type='text'
                    placeholder='팩스번호'
                    defaultValue={states.c_fax_num}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현원: </span>
                <input 
                    name='c_people'
                    type='text'
                    placeholder='현재인원'
                    defaultValue={states.c_people}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>홈페이지주소: </span>
                <input 
                    name='c_hp_address'
                    type='text'
                    placeholder='홈페이지주소'
                    defaultValue={states.c_hp_address}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>위도: </span>
                <input 
                    name='c_latitude'
                    type='text'
                    placeholder='위도'
                    defaultValue={states.c_latitude}
                    onChange={onChange}
                />
            </div>
            <div>
                <span>경도: </span>
                <input 
                    name='c_longtitude'
                    type='text'
                    placeholder='경도'
                    defaultValue={states.c_longtitude}
                    onChange={onChange}
                />
            </div>
            <div>
                <button name='update' onClick={onClick}>
                    수정
                </button>
                <button name='cancle' onClick={cancel}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default CenterUpdate;