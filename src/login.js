import React, { useState } from "react";
import axios from 'axios';
import App from './App';

function Login(props){

    function sendLoginState(){
        console.log(props.userName);
        console.log(props.passWord);
        console.log(props.isLogined);

        props.loginState(true);
        console.log(props.isLogined);



        axios({
            method : "POST",
            url : "http://192.168.0.117:3000/login",
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


    }
    return(
        
        <div class='inner-container'>
            <div class='header'>Login</div>
            <div class='box'>
                <div class='input-group'>
                    <label class='username'>Username</label>
                    <input 
                        type='text' 
                        name='userName' 
                        class='login-input'
                        placeholder='Username' 
                        value={props.userName} 
                        onChange={({ target: { value }})=>props.setUserName(value)}
                    />
                </div>
                
                <div class='input-group'>
                    <label class='password'>Password</label>
                    <input 
                        type='password' 
                        name='passWord' 
                        class='login-input' 
                        placeholder='Password' 
                        value={props.passWord} 
                        onChange={({ target: { value }})=>props.setPassWord(value)}
                    />
                </div>

                <button type='button' class='login-btn' onClick={sendLoginState}>Login</button>
            </div>
        </div>
        

    );
}

export default Login;