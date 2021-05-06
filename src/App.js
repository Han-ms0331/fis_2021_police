import React, { useState } from 'react';
import Login from './login';
import Home from './Home';

function App () {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLogined, setIsLogined] = useState(false);
  const [UID, setUID] =('');

  const loginState = (condition) => {
    setIsLogined(condition);
  }

  
  return (
    <div>
      <Login 
        userName = {userName}
        setUserName = {setUserName}
        passWord = {passWord}
        setPassWord = {setPassWord}
        isLogined = {isLogined}
        setIsLogined = {setIsLogined}
        UID = {UID}
        setUID = {setUID}
        loginState = {loginState}
      />
    </div>
  )
}

export default App;