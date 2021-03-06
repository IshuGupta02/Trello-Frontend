import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
        done :"False",
        isAdmin : "False",
        isEnabled:"True",
        loggedIn:"False",
        error:false,
        failed:"False"
        };
    }

    renderRedirect= () =>{
        if(this.state.done==="True" || this.state.loggedIn==="True" )
        {
            return <Redirect to={{pathname:'../dashboard'}}/>
        }
        else if(this.state.failed==="True"){
            return <Redirect to={{pathname:'../'}}/>
        }
    }

    render(){
        return(

            <div>
            {this.renderRedirect()}
            Hello Login
            </div>
        );
    }

    async componentDidMount(){
       
            // eslint-disable-next-line no-restricted-globals
            const params= new URLSearchParams(location.search);
            const auth= params.get("code");
            console.log(auth);

            // const user = await axios({url:'http://127.0.0.1:8000/api/login/OAuth' ,method:'GET', params: {code:auth} , withCredentials:true, }).then(console.log("done"));

            // const user1= await axios.get('http://127.0.0.1:8000/api/login/OAuth/', {params: {code:auth}},{withCredentials:true}).then(console.log("done"));

            const user1= await axios({url:'http://127.0.0.1:8000/api/login/OAuth/' ,method:'GET', params: {code:auth} , withCredentials:true} ).then(console.log("done"));

            console.log(user1)
            this.setState({done:"True"});


    }
        
}

Login.defaultProps = {
    'message': "",
}

export default Login;