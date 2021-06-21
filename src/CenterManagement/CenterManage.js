import axios from 'axios';
import React, { useState } from 'react';

function CenterManage () {
    const [center, setCenter] = useState("");

    const addCenter = async () => {
        const result = await axios.post('url',  )
    } 

    const onClick = (e) => {
        console.log(center);
        addCenter();
    }

    const onChange = (e) => {
        if(e.target.name === 'Center') {
            setCenter(e.target.value);
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            onClick();
        }
    }
    return (
    <div class="RSbar">
        <div>
          <span>시설 : </span>
          <input name="Center" type="text" placeholder="시설명" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="추가"
          onClick={onClick}
        />
        <input
            class="RSsearchbtn"
            name="seach"
            type="submit"
            value="삭제"
            onClick={onClick}
        />
    </div>
    );
}

export default CenterManage;