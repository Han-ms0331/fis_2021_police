import React, { useState } from "react";
import axios from "axios";

function AgentAdd(props) {
    const [agent_id, setAgentID] = useState("");
    const [a_name, setName] = useState("");
    const [a_ph, setPhone] = useState("");
    const [a_address, setAddress] = useState("");
    const [a_latitude, setLatitude] = useState("");
    const [a_longitude, setLongtitude] = useState("");

    const onChange = (e) => {
        if (e.target.name === "agent_id") {
            setAgentID(e.target.value);
        } else if (e.target.name === "a_name") {
            setName(e.target.value);
        } else if (e.target.name === "a_ph") {
            setPhone(e.target.value);
        } else if (e.target.name === "a_address") {
            setAddress(e.target.value);
        } else if (e.target.name === "a_latitude") {
            setLatitude(e.target.value);
        } else if (e.target.name === "a_longitude") {
            setLongtitude(e.target.value);
        }
    };

    const send = async () => {
        console.log(agent_id);
        console.log(a_name);
        console.log(a_ph);
        console.log(a_address);
        console.log(a_latitude);
        console.log(a_longitude);
        const result = await axios.post(
            "http://192.168.0.117:3000/userid/setagent",
            JSON.stringify({
                agent_id: agent_id,
                a_name: a_name,
                a_ph: a_ph,
                a_address: a_address,
                a_latitude: a_latitude,
                a_longitude: a_longitude,
            })
        );
        console.log(result);
    };

    const checkit = (e) => {
        e.preventDefault();
        window.confirm('추가하시겠습니까?');
        props.setAddAgent(false);
        send();
    }
    const checkout = (e) => {
        window.confirm('취소하시겠습니까?');
        props.setAddAgent(false);
    }

    return props.addAgent ? (
        <div>
            <div>
            <span>현장요원 번호: </span>
                <input
                    name="agent_id"
                    type="text"
                    placeholder="요원 번호"
                    onChange={onChange}
                />
            </div>
            <div>
            <span>현장요원 이름: </span>
                <input
                    name="a_name"
                    type="text"
                    placeholder="이름"
                    defaultValue={props.searchAgent}
                    onChange={onChange}
                />
            </div>
            <div>
            <span>현장요원 전화번호: </span>
                <input
                    name="a_ph"
                    type="text"
                    placeholder="전화번호"
                    onChange={onChange}
                />
            </div>
            <div>
            <span>현장요원 집주소: </span>
                <input
                    name="a_address"
                    type="text"
                    placeholder="집주소"
                    onChange={onChange}
                />
            </div>
            <div>
            <span>현장요원 위도: </span>
                <input
                    name="a_latitude"
                    type="text"
                    placeholder="위도"
                    onChange={onChange}
                />
            </div>
            <div>
            <span>현장요원 경도: </span>
                <input
                    name="a_longitude"
                    type="text"
                    placeholder="경도"
                    onChange={onChange}
                />
            </div>
            <div>
                <button name="add" onClick={checkit}>
                    추가
                </button>
                <button name="cancle" onClick={checkout}>
                    취소
                </button>
            </div>
        </div>
  ) : null;
}

export default AgentAdd;
