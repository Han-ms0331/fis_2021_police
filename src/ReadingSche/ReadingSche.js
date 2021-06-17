import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function ReadingSche(props) {
  const [searchDate, setSearchDate] = useState("");
  const [IsSearched, setIsSearched] = useState(false);

  const getSchedule = async () => {
    let result = await axios.get(
      `http://localhost:3000/fullschedule/${searchDate}/`
    );
    console.log(result);
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
    setIsSearched(false);
  };

  return IsSearched ? (
    <div>
      <div>
        <span>월 : </span>
        <input name="Date" type="date" placeholder="날짜" onChange={onChange} />
      </div>
      <input name="search" type="submit" onClick={onClick} value="검색" />
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
