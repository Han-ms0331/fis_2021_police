import React from 'react';

class Login_page extends React.Component{
    render(){
        return(
            <form>
                <input type='text' placeholder='id' />
                <input type='submit' value="Log in" />
            </form>

        )
    }
}