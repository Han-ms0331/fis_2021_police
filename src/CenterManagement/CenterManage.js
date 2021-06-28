import axios from 'axios';
import React, { useState, useRef } from 'react';
import CenterList from './CenterList.js'
import CenterAdd from './CenterAdd.js'
import CenterUpdate from './CenterUpdate.js'
import { checkPropTypes } from 'prop-types';

function CenterManage () {
    const [searchCenter, setSearchCenter] = useState("");
    const [result_1ary, setResult_1ary] = useState([]);
    const [check, setCheck] = useState(true);
    const [called, setCalled] = useState('없음');
    const [centerInfo, setCenterInfo] = useState({
		centerName: '',
		centerAddr: '',
		centerPhoneNumber: '',
		centerID: '',
		callState_list: [],
		applyState_list: [],
	});
    const resettingRef = useRef(false);
    const [currentResult, setCurrentResult] = useState('');
    const [isManage, setIsManage] = useState(true);
    const [isLoading_2, setIsLoading_2] = useState(true);
    const [addCenter, setAddCenter] =useState(true);
    const uid = localStorage.getItem('userID');
    console.log(uid);

    const search = async (search) => {
        console.log(search);
        const result = await axios.get(
            `http://192.168.0.117:3000/home/name/${uid}/${search}`
        );
        setResult_1ary(result);
        console.log(result);
        resettingRef.current = true;
        setCheck(false);
    } 

    const onClick = (e) => {
        console.log(searchCenter);
        search(searchCenter);
    }

    const onChange = (e) => {
        if(e.target.name === 'Center') {
            setSearchCenter(e.target.value);
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            onClick();
        }
    }
    
    const AddCenter = (e) => {
        setAddCenter(false);
    }
    return check ? (
        addCenter ? (
    <div class="RSbar">
        <div>
            <input
                class="RSsearchbtn"
                name="add"
                type="submit"
                value="추가"
                onClick={AddCenter}
            />
        </div>
        <div>
          <span>시설 : </span>
          <input name="Center" type="text" placeholder="시설명" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="검색"
          onClick={onClick}
        />
    </div>
    ) : (
    <div class="RSbar">
        <div>
            <input
                class="RSsearchbtn"
                name="add"
                type="submit"
                value="추가"
                onClick={AddCenter}
            />
        </div>
        <div>
          <span>시설 : </span>
          <input name="Center" type="text" placeholder="시설명" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="검색"
          onClick={onClick}
        />
        <CenterAdd
            setAddCenter={setAddCenter}
            uid={uid}
        />
    </div>
    ) ): isLoading_2 ? 
    (
    <div class="RSbar">
        <div>
          <span>시설 : </span>
          <input name="Center" type="text" placeholder="시설명" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="검색"
          onClick={onClick}
        />
		<div class='main_search_result'>
			<ul class='main_search_result_list list'>
				{result_1ary.data.map((result_1ary) => (
					<li
						key={result_1ary.center_id}
		    			class={
							currentResult === result_1ary.center_id
								? 'list-items_search-centerlist_selected'
								: 'list-items_search-centerlist'
						}>
						<CenterList
							data={result_1ary}
							setCurrentResult={setCurrentResult}
							setCheck={setCheck}
							uid={uid}
							setCenterInfo={setCenterInfo}
							called={called}
							setSelected={setCurrentResult}
                            centerInfo={centerInfo}
                            isManage={isManage}
                            check={check}
                            setIsLoading_2={setIsLoading_2}
						/>
					</li>
				))}
			</ul>
		</div>
    </div>
    ) : (
        <div class="RSbar">
        <div>
          <span>시설 : </span>
          <input name="Center" type="text" placeholder="시설명" onChange={onChange} onKeyPress={onKeyPress} />
        </div>
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="검색"
          onClick={onClick}
        />
        <div>
        <CenterUpdate 
            centerInfo={centerInfo}
            searchCenter={searchCenter}
            setIsLoading_2={setIsLoading_2}
            setResult_1ary={setResult_1ary}
        />
        </div>
		<div class='main_search_result'>
			<ul class='main_search_result_list list'>
				{result_1ary.data.map((result_1ary) => (
					<li
						key={result_1ary.center_id}
		    			class={
							currentResult === result_1ary.center_id
								? 'list-items_search-centerlist_selected'
								: 'list-items_search-centerlist'
						}>
						<CenterList
							data={result_1ary}
							setCurrentResult={setCurrentResult}
							setCheck={setCheck}
							uid={uid}
							setCenterInfo={setCenterInfo}
							called={called}
							setSelected={setCurrentResult}
                            isManage={isManage}
                            check={check}
                            centerInfo={centerInfo}
                            setIsLoading_2={setIsLoading_2}
						/>

					</li>
				))}

			</ul>
		</div>
    </div>
    );
}

export default CenterManage;