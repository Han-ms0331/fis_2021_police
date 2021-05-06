import React, { useState } from "react";
import axios from 'axios';
import App from './App';

function Login(props){

    function show  ()  {
        console.log(props.userName);
        console.log(props.passWord);
        console.log(props.isLogined);
        if(props.userName==='asdf'){
            props.loginState(true);
        }
        console.log(props.isLogined);

/*
        axios({
            method : "POST",
            url : "",
            body : {
                id : props.userName,
                pwd : props.passWord
            },
        })
            .then((response) => {
                if(response==true){
                    props.loginState(true);
                }
                else props.loginState(false);
            })
            .catch((error) => {
                console.log(error);
            })
*/

    }
    return(
        <div className='inner-container'>
            <div className='header'>Login</div>
            <div className='box'>
                <div className='input-group'>
                    <label className='username'>Username</label>
                    <input 
                        type='text' 
                        name='userName' 
                        className='login-input'
                        placeholder='Username' 
                        value={props.userName} 
                        onChange={({ target: { value }})=>props.setUserName(value)}
                    />
                </div>
                
                <div className='input-group'>
                    <label className='password'>Password</label>
                    <input 
                        type='password' 
                        name='passWord' 
                        className='login-input' 
                        placeholder='Password' 
                        value={props.passWord} 
                        onChange={({ target: { value }})=>props.setPassWord(value)}
                    />
                </div>

                <button type='button' className='login-btn' onClick={show}>Login</button>
            </div>
        </div>
    );
}

export default Login;