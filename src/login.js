import React, { useState } from "react";
import axios from 'axios';
import App from './App';
import './css/login.css';



function Login(props){
    const getLogin = async () => {
        const result = await axios.post("http://192.168.0.117:3000/login", {
           
            
                username: props.userName,
                password: props.passWord
            
            
        });
        console.log(result);
    }

    const sendLoginState= (e) => {
        console.log(props.userName);
        console.log(props.passWord);
        console.log(props.isLogined);
       e.preventDefault();
        getLogin();
       
        // await axios({
        //     method: "post",
        //     url: "http://192.168.0.117:3000/login",
        //     data: {
        //         username: '원보라user',
        //         password: '1234'
        //     }
        // })
            


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



// function Login(props) {
//     const getSuccess = async () => {
      
//             const searchResult = await axios.get(`http://192.168.0.117:3000/`,
//                 );
//             console.log(searchResult);
        
        
//     }
//     function onClick(e) {
//         getSuccess();
//     }
//     return (
//         <div>
//             <button type='button' class='login-btn' onClick={onClick}>Login</button>
//         </div>
//     )
// }

export default Login;