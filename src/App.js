import React, { useState } from 'react';
import Login from './login.js';
import Home from './Home.js';

function App () {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [isLogined, setIsLogined] = useState('');
  const [uid, setUID] =('');

  
  return(
    isLogined ? <Home /> : <Login />
  );
}

export default App;