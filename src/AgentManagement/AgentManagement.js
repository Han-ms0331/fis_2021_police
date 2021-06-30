import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import AgentAdd from "./AgentAdd.js";
import CallAgentAdd from "./CallAgentAdd.js";
import AgentUpdate from "./AgentUpdate.js";
import CallAgentUpdate from "./CallAgentUpdate";
import AgentList from "./AgentList.js";
import CallAgentList from "./CallAgentList.js";

function AgentManagement(props) {
  const [searchAgent, setSearchAgent] = useState("");
  const [searchRegion, setSearchRegion] = useState("");
  const [select, setSelect] = useState("");
  const [stage, setStage] = useState("");
  const [result_agent, setResult_agent] = useState({data :[],});
  const [result_call, setResult_call] = useState({data: [],});
  const [addAgent, setAddAgent] = useState(false);
  const [addCall, setAddCall] = useState(false);
  const [updateAgent, setUpdateAgent] = useState(false);
  const [updateCall, setUpdateCall] = useState(false);
  const [agentList, setAgentList] = useState(false);
  const [callagentList, setCallAgentList] = useState(false);
  const resettingRef = useRef(false);

  const [agentInfo, setAgentInfo] = useState({
    agent_id: "",
    a_name: "",
    a_ph: "",
    a_address: "",
    a_langtitude: "",
    a_longtitude: "",
  });

  const [callagentInfo, setCallAgentInfo] = useState({
    u_name: "",
    u_pwd: "",
    u_ph: "",
  });

  // const search = async (search) => {
  //     console.log(search);
  //     const result = await axios.get(
  //         `http://192.168.0.117:3000/home/name/${uid}/${search}`
  //     );
  //     setResult_1ary(result);
  //     console.log(result);
  //     resettingRef.current = true;
  //     setCheck(false);
  // }

  const onChange = (e) => {
    if (e.target.name === "Agent") {
      setSearchRegion(e.target.value);
      console.log(searchRegion);
    } else if (e.target.name === "callAgent") {
      setSearchAgent(e.target.value);
      console.log(searchAgent);
    }
  };

  const getAgent = async () => {
    console.log(searchRegion);
    const _result = await axios.get(`http://192.168.0.117:3000/home/get_agent/${searchRegion}`); 
    console.log(_result);
    setResult_agent(_result);
    console.log(_result);
    console.log(result_agent);
  }
  const getCallAgent = async () => {
    const result = await axios.get("http://192.168.0.117:3000/getusers");
    setResult_call(result);
    // console.log(result_call);
  };

  const callSearch = (e) => {
    getCallAgent();
    //getAgent();
    /*
    if (select === "현장요원") {
      setAddAgent(false);
      setAddCall(false);
      setUpdateAgent(false);
      setUpdateCall(false);
      setCallAgentList(false);
      setAgentList(true);
    } else if (select === "call 직원") {
      setAddAgent(false);
      setAddCall(false);
      setUpdateAgent(false);
      setUpdateCall(false);
      setAgentList(false);
      setCallAgentList(true);
    } else if (select === "===선택===") {
      setAddAgent(false);
      setAddCall(false);
      setUpdateAgent(false);
      setUpdateCall(false);
      setAgentList(false);
      setCallAgentList(false);
    }
    */
    setAddAgent(false);
    setAddCall(false);
    setUpdateAgent(false);
    setUpdateCall(false);
    setAgentList(false);
    setCallAgentList(true);
  };
  const agentSearch = (e) => {
    getAgent();
    console.log(searchRegion)
    setAddAgent(false);
    setAddCall(false);
    setUpdateAgent(false);
    setUpdateCall(false);
    setCallAgentList(false);
    setAgentList(true);
  }
  const AddCallAgent = (e) => {
    /*
    if (select === "현장요원") {
      setAgentList(false);
      setCallAgentList(false);
      setUpdateCall(false);
      setUpdateAgent(false);
      setAddCall(false);
      setAddAgent(true);
    } else if (select === "call 직원") {
      setAgentList(false);
      setCallAgentList(false);
      setUpdateAgent(false);
      setUpdateCall(false);
      setAddAgent(false);
      setAddCall(true);
    } else if (select === "===선택===") {
      setAgentList(false);
      setCallAgentList(false);
      setUpdateCall(false);
      setUpdateAgent(false);
      setAddAgent(false);
      setAddCall(false);
    }
    */
    setAgentList(false);
    setCallAgentList(false);
    setUpdateAgent(false);
    setUpdateCall(false);
    setAddAgent(false);
    setAddCall(true);
  };
  const AddAgent = (e) => {
    setAgentList(false);
    setCallAgentList(false);
    setUpdateCall(false);
    setUpdateAgent(false);
    setAddCall(false);
    setAddAgent(true);
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      callSearch();
    }
  }
  const onKeypress = (e) => {
    if(e.key === 'Enter') {
      agentSearch();
    }
  }
  let isAdmin = false;
  if (localStorage.getItem("userName") === "admin") {
    isAdmin = true;
  }
  props.setIsLogined(localStorage.getItem("isLogined"));

  return isAdmin ? (
    props.isLogined ? (
      <div class="RSbar">
        {/*
        <div class='search'>
          <select name="select" onChange={onChange}>
            <option value="선택">===선택===</option>
            <option value="현장요원">현장요원</option>
            <option value="call 직원">call 직원</option>
          </select>
        </div>
        <div class='search'>
          <span>직원 : </span>
          <input
            name="Agent"
            type="text"
            placeholder="직원명"
            onChange={onChange}
          />
        </div>
        <div>
          <span>지역: </span>
          <input 
            name="Region"
            type="text"
            placeholder="지역명"
            onChange={onChange}
          />
        </div>   
        <div>       
        <input
          class="RSsearchbtn"
          name="search"
          type="submit"
          value="검색"
          onClick={realSearch}
        />
        </div>
        <div> 
          <input
            class="RSsearchbtn"
            name="add"
            type="submit"
            value="추가"
            onClick={AddAgent}
          />
        </div>
        */}

        <div class='menu'>
          <span>콜직원: </span>
          <button onClick={callSearch}>
            검색
          </button>
          <button onClick={AddCallAgent}>
            추가
          </button>

          <span>현장요원: </span>
          <input
            name="Agent"
            type="text"
            placeholder="지역"
            onChange={onChange}
            onKeyPress={onKeypress}
          />
          <button onClick={agentSearch}>
            검색
          </button>
          <button onClick={AddAgent}>
            추가
          </button>
        </div>

        <div class='update'>
          <AgentUpdate
            updateAgent={updateAgent}
            searchAgent={searchAgent}
            setUpdateAgent={setUpdateAgent}
          />
          <CallAgentUpdate
            updateCall={updateCall}
            searchAgent={searchAgent}
            setUpdateCall={setUpdateCall}
		        callagentInfo={callagentInfo}
		        data={result_call}
          />
        </div>
        <div>
          <AgentAdd
            addAgent={addAgent}
            searchAgent={searchAgent}
            setAddAgent={setAddAgent}
          />
          <CallAgentAdd
            addCall={addCall}
            searchAgent={searchAgent}
            setAddCall={setAddCall}
          />
        </div>
        <div>
          <ul>
            {result_agent.data.map((result_agent) => (
              <li>
                <AgentList
                  searchAgent={searchAgent}
                  agentList={agentList}
                  setAgentList={setAgentList}
                  setUpdateAgent={setUpdateAgent}
                  setAgentInfo={setAgentInfo}
                  searchAgent={searchAgent}
                  data={result_agent}
                />
              </li>
            ))}
          </ul>
          <ul>
            {result_call.data.map((result_call) => (
              <li>
                <CallAgentList
                  searchAgent={searchAgent}
                  callagentList={callagentList}
                  setCallAgentList={setCallAgentList}
                  setUpdateCall={setUpdateCall}
				          setCallAgentInfo = {setCallAgentInfo}
                  searchAgent={searchAgent}
                  data={result_call}
                />
              </li>
		         ))}
          </ul>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <Redirect to="/home" />
  );
}
export default AgentManagement;
