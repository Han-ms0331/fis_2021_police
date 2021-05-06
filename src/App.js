import React,{ useState } from 'react';
import Login from './login';
import Home from './home';

function App () {
  const [username, setUserName] = ('');
  const [password, setPassWord] = ('');
  const [isLogined, setIsLogined] = ('');
  const [uid, setUID] =('');

  
  return{
    isLogined ? <Home /> : <Login />
  }
}

export default App;