import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import CenterList from "./CenterList";
function AddCallState(props) {
  const { open, closeSave, closeCancle } = props;
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };
  if (today.month < 10) {
    today.month = "0" + today.month;
  }
  if (today.day < 10) {
    today.day = "0" + today.day;
  }
  const [date, setDate] = useState(
    today.year + "-" + today.month + "-" + today.date
  );
  const [check, setCheck] = useState(false);

  const [name, setName] = useState("");
  const [bound, setBound] = useState("");
  const [emailform, setEmailform] = useState("");
  const [expectNumber, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [digit, setDigit] = useState("");
  const [attend, setAttend] = useState("");
  const [guitar, setGuitar] = useState("");
  const [done, setDone] = useState(false);
  const resettingRef = useRef(false);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleBound = (e) => {
    setBound(e.target.value);
  };
  const selectEmail = (e) => {
    setEmailform(e.target.value);
    console.log(emailform);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
    console.log(expectNumber);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleDigit = (e) => {
    setDigit(e.target.value);
  };
  const handleAttend = (e) => {
    setAttend(e.target.value);
  };
  const handleRecorder = (e) => {};
  const handleGuitar = (e) => {
    setGuitar(e.target.value);
  };

  const send = async () => {
    console.log(email);
    const result = await axios.post(
      `http://192.168.0.117:3000/home/call_write/${props.centerID}`,
      JSON.stringify({
        c_manager: name,
        date: date,
        in_out: bound,
        estimate_num: expectNumber,
        m_email: `${email}${emailform}`,
        m_ph: digit,
        participation: attend,
        uid: localStorage.getItem("userID"),
        etc: guitar,
      })
    );
    resettingRef.current = true;

    //		console.log(result.data.error);
    let error;
    if (result.data.error !== undefined) {
      error = true;
    } else {
      error = false;
      clear();
    }
    //		console.log(error);
    closeSave(error);
    setCheck(true);
    console.log(check);
  };
  const clear = () => {
    setName("");
    setBound("");
    setEmail("");
    setDigit("");
    setAttend("");
    setGuitar("");
    setDone(true);
    setEmailform(""); //?????? ?????????????????????????????????//
  };
  // useEffect(() => {
  // 	if (resettingRef.current) {
  // 		resettingRef.current = false;
  // 		clear();
  // 	}
  // }, [done]);
  return open ? (
    <div class="add_call_state">
      <div>
        <span>????????? ??????: </span>
        <input
          name="name"
          type="text"
          placeholder="????????? ??????"
          onChange={handleName}
        />
      </div>
      <div>
        <span>????????????: </span>
        <input
          name="date"
          type="text"
          placeholder="????????????"
          value={today.year + "-" + today.month + "-" + today.date}
          onChange={handleDate}
        />
      </div>
      <div>
        <span>???/???????????????: </span>
        <select name="bound" onChange={handleBound}>
          <option value="????????????/???????????????">===??????===</option>
          <option value="???">???</option>
          <option value="??????">??????</option>
        </select>
      </div>

      <div>
        <span>????????? ?????????: </span>
        <input
          name="email"
          type="email"
          placeholder="????????? ?????????"
          onChange={handleEmail}
        />
        {/* <span class="gol"> @ </span> */}
        {/* <input
          class={
            write === true
              ? "????????????????????????????????????"
              : "formselect_email"
          }
        /> */}
        <select name="formselect_email" size="1" onChange={selectEmail}>
          <option value="">===??????===</option>
          <option value="@naver.com">@naver.com</option>
          <option value="@hanmail.net">@hanmail.net</option>
          <option value="@gmail.com">@gmail.com</option>
          <option value="@nate.com">@nate.com</option>
          <option value="@sen.go.kr">@sen.go.kr</option>
          <option value="@korea.kr">@korea.kr</option>
          <option value="">????????????</option>
        </select>
      </div>

      {/* <div>
        <span>????????? ????????? ??????: </span>
        <input
          name="email"
          type="email"
          placeholder="????????? ????????? ??????"
          onChange={handleEmail}
        />	
      </div> */}

      <div>
        <span>????????? ????????????: </span>
        <input
          name="number"
          type="text"
          placeholder="????????? ????????????"
          onChange={handleDigit}
        />
      </div>
      <div>
        <span>?????? ?????? ??????: </span>
        <select name="attend" onChange={handleAttend}>
          <option value="??????">===??????===</option>
          <option value="??????">??????</option>
          <option value="??????">??????</option>
          <option value="??????">??????</option>
          <option value="??????">??????</option>
        </select>
      </div>
      <div>
        <span>????????? ??????: </span>
        <input
          name="recorder"
          type="text"
          placeholder="????????? ??????"
          value={localStorage.getItem("userName")}
          onChange={handleRecorder}
        />
      </div>
      <div>
        <div>????????????: </div>
        <textarea
          name="etc"
          placeholder="????????????"
          onInput={handleGuitar}
        ></textarea>
      </div>
      <div>
        <button onClick={send}>??????</button>
        <button onClick={closeCancle}>??????</button>
      </div>
    </div>
  ) : null;
}
export default AddCallState;
