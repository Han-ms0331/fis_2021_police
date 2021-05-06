import React, { useState } from "react";
import App from './App';

function Login(){

    return(
        <div className='inner-container'>
            <div className='header'>Login</div>
            <div className='box'>
                <div className='input-group'>
                    <label className='username'>Username</label>
                    <input type='text' name='username' className='login-input' placeholder='Username' onChange={setUser}/>
                </div>
                
                <div className='input-group'>
                    <label className='password'>Password</label>
                    <input type='password' name='password' className='login-input' placeholder='Password' />
                </div>

                <button type='button' className='login-btn' onClick={this.show}>Login</button>
            </div>
        </div>
    );
}

export default Login;