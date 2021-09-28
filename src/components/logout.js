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
        loggedIn:false
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
            Logout in process
            </div>
        );
    }

    async componentDidMount(){

        const response= await axios({url:'http://127.0.0.1:8000/api/check/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        if(response.status==202){

            if(response.data['loggedin']==true){
                await this.setState({loggedIn : true});
            }
           
        }

        if(this.state.loggedIn==true){
            const user1= await axios({url:'http://127.0.0.1:8000/api/login/logout/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

            console.log(user1);
            await this.setState({done:"True"});

        }
        else{
            console.log("you are not logged in");
            await this.setState({done:"True"});

        }
    }
        
}

export default Logout;