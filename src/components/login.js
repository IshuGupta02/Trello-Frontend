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
        error:false};
    }

    renderRedirect= () =>{
        if(this.state.done==="True")
        {
            return <Redirect to={{pathname:'../dashboard'}}/>
        }
    }

    render(){
        return(

            <div>
            {this.renderRedirect()}
            Hello Login
            </div>
            // window.location.href = "http://localhost:8000/api/login/login"
        );
    }

    async componentDidMount(){
        // eslint-disable-next-line no-restricted-globals
        const params= new URLSearchParams(location.search);
        const auth= params.get("code");
        console.log(auth);

        // const user = await axios({url:'http://127.0.0.1:8000/api/login/OAuth' ,method:'GET', params: {code:auth} , withCredentials:true, }).then(console.log("done"));

        const user1= await axios.get('http://127.0.0.1:8000/api/login/OAuth/', {params: {code:auth}},{withCredentials:true} ).then(console.log("done"));

        // const getData = () => {
        //     Axios.get("http://localhost:3000/security?select=symbol,company",
        //     {headers: {Authorization: 'Bearer 73Ntx3b6SwNXC7ANV3tw4wFfDdKntB26',
        //                 "Access-Control-Allow-Origin": "*",
        //                 mode: "cors",               
        //     }}
        //     ).then((response) => {
        //         console.log(response)
        //     })
        // }
        console.log(user1)
        await this.setState({done:"True"});                


        // console.log(user1["isAdmin"]);

    }
        
}

Login.defaultProps = {
    'message': "",
}

export default Login;