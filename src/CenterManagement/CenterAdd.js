import React, { useState } from 'react';
import axios from 'axios';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';
import { checkPropTypes } from 'prop-types';

function CenterAdd (props) {

    const [c_sido, setSido] = useState('');
    const [c_sigungu, setSigungu] = useState('');
    const [c_name, setName] = useState(props.searchCenter);
    const [c_type, setType] = useState('');
    const [c_status, setStatus] = useState('');
    const [c_address, setAddress] = useState('');
    const [c_zipcode, setZipcode] = useState('');
    const [c_ph, setPhone] =useState('');
    const [c_fax_num, setFax] = useState('');
    const [c_people, setPeople] = useState('');
    const [c_hp_address, setHome] = useState('');
    const [c_latitude, setLatitude] = useState('');
    const [c_longitude, setLongtitude] = useState('');

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
        } else if (e.target.name === 'c_longitude') {
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
                c_longitude: c_longitude
            })
        );
    }
    const checkit = (e) => {
        window.confirm('?????????????????????????');
        console.log('center_id');
        console.log('c_ph');
        props.setAddCenter(true);
        send();
    }
    const checkout = (e) => {
        window.confirm('?????????????????????????');
        props.setAddCenter(true);
    }
    return (
        <div class='add_center_list'>
            <div>   
                <span>??????: </span>
                <input
                    name='c_sido'
                    type='text'
                    placeholder='??????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>?????????: </span>
                <input  
                    name='c_sigungu'
                    type='text'
                    placeholder='?????????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>?????????: </span>
                <input 
                    name='c_name'
                    type='text'
                    placeholder='?????????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>??????: </span>
                <input
                    name='c_type'
                    type='text'
                    placeholder='??????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>????????????: </span>
                <input
                    name='c_status'
                    type='text'
                    placeholder='????????????'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>??????: </span>
                <input
                    name='c_address'
                    type='text'
                    placeholder='??????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>????????????: </span>
                <input 
                    name='c_zipcode'
                    type='text'
                    placeholder='????????????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>????????????: </span>
                <input 
                    name='c_ph'
                    type='text'
                    placeholder='????????????'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <span>????????????: </span>
                <input 
                    name='c_fax_num'
                    type='text'
                    placeholder='????????????'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>??????: </span>
                <input 
                    name='c_people'
                    type='text'
                    placeholder='????????????'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>??????????????????: </span>
                <input 
                    name='c_hp_address'
                    type='text'
                    placeholder='??????????????????'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>??????: </span>
                <input 
                    name='c_latitude'
                    type='text'
                    placeholder='??????'
                    onChange={onChange}
                />
            </div>
            <div>
                <span>??????: </span>
                <input 
                    name='c_longitude'
                    type='text'
                    placeholder='??????'
                    onChange={onChange}
                />
            </div>
            <div>
                <button name='add' onClick={checkit}>
                    ??????
                </button>
                <button name='cancle' onClick={checkout}>
                    ??????
                </button>
            </div>
        </div>
    );
}

export default CenterAdd;