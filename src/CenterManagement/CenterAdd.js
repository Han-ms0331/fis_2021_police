import React, { useState } from 'react';
import axios from 'axios';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';
import { checkPropTypes } from 'prop-types';

function CenterAdd (props) {

    const [c_sido, setSido] = useState('');
    const [c_sigungu, setSigungu] = useState('');
    const [c_name, setName] = useState('');
    const [c_type, setType] = useState('');
    const [c_status, setStatus] = useState('');
    const [c_address, setAddress] = useState('');
    const [c_zipcode, setZipcode] = useState('');
    const [c_ph, setPhone] =useState('');
    const [c_fax_num, setFax] = useState('');
    const [c_people, setPeople] = useState('');
    const [c_hp_address, setHome] = useState('');
    const [c_latitude, setLatitude] = useState('');
    const [c_longtitude, setLongtitude] = useState('');

	const onChange = (e) => {
        if (e.target.name === 'c_sido') {
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
            'http://192.168.0.117:3000/userid/setcenter',
            JSON.stringify({
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
    const checkit = (e) => {
        window.confirm('추가하시겠습니까?');
        console.log('center_id');
        console.log('c_ph');
        props.setAddCenter(true);
        send();
    }
    const checkout = (e) => {
        window.confirm('취소하시겠습니까?');
        props.setAddCenter(true);
    }
    return (
        <div class='add_center_list'>
            <div>   
                <span>시도: </span>
                <input
                    name='c_sido'
                    type='text'
                    placeholder='시도'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>시군구: </span>
                <input  
                    name='c_sigungu'
                    type='text'
                    placeholder='시군구'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>시설명: </span>
                <input 
                    name='c_name'
                    type='text'
                    placeholder='시설명'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>유형: </span>
                <input
                    name='c_type'
                    type='text'
                    placeholder='유형'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>운영현황: </span>
                <input
                    name='c_status'
                    type='text'
                    placeholder='운영현황'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>주소: </span>
                <input
                    name='c_address'
                    type='text'
                    placeholder='주소'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>우편번호: </span>
                <input 
                    name='c_zipcode'
                    type='text'
                    placeholder='우편번호'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>전화번호: </span>
                <input 
                    name='c_ph'
                    type='text'
                    placeholder='전화번호'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>팩스번호: </span>
                <input 
                    name='c_fax_num'
                    type='text'
                    placeholder='팩스번호'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>현원: </span>
                <input 
                    name='c_people'
                    type='text'
                    placeholder='현재인원'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>홈페이지주소: </span>
                <input 
                    name='c_hp_address'
                    type='text'
                    placeholder='홈페이지주소'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>위도: </span>
                <input 
                    name='c_latitude'
                    type='text'
                    placeholder='위도'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>경도: </span>
                <input 
                    name='c_longtitude'
                    type='text'
                    placeholder='경도'
                    onChange={onChange}
                />
            </div>
            <div>
                <button name='add' onClick={checkit}>
                    추가
                </button>
                <button name='cancle' onClick={checkout}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default CenterAdd;