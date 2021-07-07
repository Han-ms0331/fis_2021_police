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
  const [result_agent, setResult_agent] = useState({ data: [] });
  const [result_call, setResult_call] = useState({ data: [] });
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
    a_latitude: "",
    a_longitude: "",
  });

  const [callagentInfo, setCallAgentInfo] = useState({
    u_name: "",
    u_pwd: "",
    u_ph: "",
  });

  const onChange = (e) => {
    if (e.target.name === "Agent") {
      setSearchRegion(e.target.value);
    } else if (e.target.name === "callAgent") {
      setSearchAgent(e.target.value);
    }
  };

  const getAgent = async () => {
    console.log(searchRegion);
    const _result = await axios.get(
      `http://192.168.0.117:3000/home/get_agent/${searchRegion}`
    );
    console.log(_result);
    setResult_agent(_result);
    console.log(result_agent);
  };
  const getCallAgent = async () => {
    const result = await axios.get("http://192.168.0.117:3000/getusers");
    setResult_call(result);
    console.log(result_call);
  };

  const callSearch = (e) => {
    getCallAgent();
    setAddAgent(false);
    setAddCall(false);
    setUpdateAgent(false);
    setUpdateCall(false);
    setAgentList(false);
    setCallAgentList(true);
  };
  const agentSearch = (e) => {
    getAgent();
    setAddAgent(false);
    setAddCall(false);
    setUpdateAgent(false);
    setUpdateCall(false);
    setCallAgentList(false);
    setAgentList(true);
  };
  const AddCallAgent = (e) => {
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
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      callSearch();
    }
  };
  const onKeypress = (e) => {
    if (e.key === "Enter") {
      agentSearch();
    }
  };
  let isAdmin = false;
  if (localStorage.getItem("userName") === "admin") {
    isAdmin = true;
  }
  props.setIsLogined(localStorage.getItem("isLogined"));

  return isAdmin ? (
    props.isLogined ? (
      <div class="RSbar">
        <div class="menu">
          <span>콜직원: </span>
          <button onClick={callSearch}>검색</button>
          <button onClick={AddCallAgent}>추가</button>

          <span>현장요원: </span>
          <input
            name="Agent"
            type="text"
            placeholder="지역"
            onChange={onChange}
            onKeyPress={onKeypress}
          />
          <button onClick={agentSearch}>검색</button>
          <button onClick={AddAgent}>추가</button>
        </div>

        <div class="update">
          <AgentUpdate
            updateAgent={updateAgent}
            searchAgent={searchAgent}
            agentInfo={agentInfo}
            setUpdateAgent={setUpdateAgent}
            data={result_agent}
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
                  userName={localStorage.getItem("userName")}
                  callSearch={callSearch}
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
                  setCallAgentInfo={setCallAgentInfo}
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
