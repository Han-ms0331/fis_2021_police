import React from "react";
import './css/login.css';
import axios from 'axios';



function Login(props){
    const getLogin = async () => {
        const result = await axios.post("http://192.168.0.117:3000/login", JSON.stringify({
            username: props.userName,
            password: props.passWord
        })
            
            , {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(result.data);
        return result.data;
        
    }
    const sendLoginState= (e) => {
        console.log(props.userName);
        console.log(props.passWord);
        console.log(props.isLogined);
        e.preventDefault();
        if (getLogin()) {
            props.setIsLogined(true);
            console.log(props.isLogined);

        }     

    }
    return(
        
        <div class='inner-container'>
            <div class='header'>
                <h2>Log-In</h2>
            
                <div class='input-group'>
                    <h4>Username</h4>
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
                    <h4>Password</h4>
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