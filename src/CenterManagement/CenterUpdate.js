import React, { useState } from 'react'


function CenterUpdate(props) {
    const { check, test, searchCenter } = props;
    const key = 3;

    return check ? (
        null
    ) : test ? (
        null
    ) : (
        <div>
            <span>시설명: </span>
            <input
                name='c_name'
                type='text'
                placeholder='시설명'
                defaultValue={searchCenter}
            />
        </div>
    );
}

export default CenterUpdate;