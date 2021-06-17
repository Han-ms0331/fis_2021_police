import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function ReadingSche(props) {
  const [searchDate, setSearchDate] = useState("");
  const [IsSearched, setIsSearched] = useState(false);
  const [ary, setAry] = useState([]);

  let scheDate = Array.from(Array(11), () => Array(0).fill(null));
  const now = new Date(searchDate);
  const before3day = new Date(now.setDate(now.getDate() - 3));

  function getToday(indate) {
    let date = new Date(indate);
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  scheDate[0][0] = getToday(before3day);
  for (let i = 1; i < 11; i++) {
    scheDate[i][0] = getToday(new Date(now.setDate(now.getDate() + 1)));
  }
  let count
  for (let i in scheDate) {
    scheDate[i][count] = ;
  }
  console.log(scheDate);

  let result = {};
  const getSchedule = async () => {
    console.log(searchDate);
    result = await axios.get(
      `http://localhost:3000/fullschedule/${searchDate}/`
    );
    console.log(result.data);
    setAry(result.data);
    localStorage.setItem("searchDate", searchDate);
  };
  const onClick = (e) => {
    e.preventDefault();
    getSchedule();
    setIsSearched(true);
  };
  const onChange = (e) => {
    if (e.target.name === "Date") {
      setSearchDate(e.target.value);
    }
  };

  return IsSearched ? (
    <div>
      <div>
        <div>
          <span>월 : </span>
          <input
            name="Date"
            type="date"
            placeholder="날짜"
            onChange={onChange}
          />
        </div>
        <input name="search" type="submit" onClick={onClick} value="검색" />
      </div>
      <div>
        {ary !== ""
          ? ary &&
            ary.map((result, index) => (
              <li key={index}>
                <div>{result.aid}</div>
                <div>{result.c_name}</div>
                <div>{result.c_address}</div>
                <div>{result.visit_time}</div>
                <div>{result.estimate_num}명</div>
                <div>{result.etc}</div>
              </li>
            ))
          : null}
      </div>
    </div>
  ) : (
    <div>
      <div>
        <span>월 : </span>
        <input name="Date" type="date" placeholder="날짜" onChange={onChange} />
      </div>
      <input name="search" type="submit" onClick={onClick} value="검색" />
    </div>
  );
}

export default ReadingSche;
