import React, { useState } from 'react'


function CenterUpdate(props) {
    const { check, test, searchCenter } = props;
    const key = 3;

    return check ? (
        null
    ) : test ? (
        null
    ) : (
        <div class='add_center_list'>
            <div>   
                <span>시도: </span>
                <input
                    name='c_sido'
                    type='text'
                    placeholder='시도'
                    defaultValue={key}
                />
            </div>
            <div>
                <span>시군구: </span>
                <input  
                    name='c_sigungu'
                    type='text'
                    placeholder='시군구'
                    defaultValue={key}
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

export default CenterUpdate;