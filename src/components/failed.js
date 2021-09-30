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
        error :false,
        loggedIn_failed: false,
        };
    }

    renderRedirect= () =>{

        // console.log(this.state.error);
        if(this.state.loggedIn_failed===true)
        {
            alert("You cannot access this page!")
            return <Redirect to={{pathname:'../'}}/>
        }
        else if(this.state.error===true)
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

        const response= await axios({url:'http://127.0.0.1:8000/api/check/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        if(response.status==202){

            if(response.data['loggedin']!==true){
                await this.setState({loggedIn_failed : true});
                await this.setState({error:true});
            }
            else{
                const response= await axios({url:'http://127.0.0.1:8000/api/user/info/' ,method:'GET',withCredentials:true} ).then(console.log("done"));
                if(response.data.enabled==false){
                    await this.setState({error:true});
                }                
                    
            }

        }
           
    }
}

export default Failed;