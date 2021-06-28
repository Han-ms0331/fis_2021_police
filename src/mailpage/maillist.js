import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { element } from "prop-types";
function Maillist(props){
    const [result_array,setResult_array] = useState([]);
    props.setIsLogined(localStorage.getItem("isLogined"));
    const result = axios.get(
        `http://localhost:3000/readingmail/read`
      );
      console.log(result);
      setResult_array(result);

return props.isLogined ? 
<div>
    메일 확인 페이지

</div>


: (
    <Redirect to="/" />
  )
}

export default Maillist;