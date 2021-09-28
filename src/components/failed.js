import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

class Failed extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
        error :"False",
        };
    }

    renderRedirect= () =>{

        console.log(this.state.error);
        if(this.state.error==="True")
        {
            alert("You cannot access this page!")
            return <Redirect to={{pathname:'../logout'}}/>
        }
    }

    render(){
        return(
            <div>
            {this.renderRedirect()}
            Failed: {this.state.error}
            </div>
        );
    }

    async componentDidMount(){

        const response= await axios({url:'http://127.0.0.1:8000/api/user/info/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        console.log(response.status)

        if(response.status!=202){
            // console.log("changing state")
            this.setState({error:"True"});
            // console.log(this.state.error);
        }
    }
}

export default Failed;