import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

class Logout extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
        done :"False",
        };
    }

    renderRedirect= () =>{
        if(this.state.done==="True")
        {
            return <Redirect to={{pathname:'../'}}/>
        }
    }

    render(){
        return(
            <div>
            {this.renderRedirect()}
            Logout
            </div>
        );
    }

    async componentDidMount(){

        const user1= await axios({url:'http://127.0.0.1:8000/api/login/logout/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        console.log(user1)
        await this.setState({done:"True"});

    }
        
}

export default Logout;