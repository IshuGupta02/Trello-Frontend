import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Members extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            users:[],
            done: false
        };
        this.changeEnable = this.changeEnable.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
    }

    render(){
        return(
            <div>
                <div>
                Members' details:
                <br/>
                </div>

                {
                    
                    this.state.users.map((user)=>{
                        return (
                            
                            <div key={user.id}>
                                <div>Name: {user.User_name}</div>
                                <br/>

                                {/* <button onClick={()=>{this.changeAdmin()}}> Sample </button> */}

                                {(user.enabled===true)?(<button onClick={()=> this.changeEnable(user.id, user.enabled, user.admin)}> Disable </button>):(<button onClick={()=> this.changeEnable(user.id, user.enabled, user.admin)}> Enable </button>)}

                                {(user.admin===true)?(<button onClick={()=> this.changeAdmin(user.id, user.enabled, user.admin)}> Remove from admin </button>):(<button onClick={()=> this.changeAdmin(user.id, user.enabled, user.admin)}> Make Admin </button>)}

                            </div>                                                
                            
                        );
                    })
                }
            
            </div>
        );
    }

    async componentDidMount(){

        const users_data= await axios.get('http://127.0.0.1:8000/api/user/', {withCredentials:true}).then(console.log("done"));

        console.log(users_data.data);

        await this.setState({
            users: users_data.data
        });

        await this.setState({
            done:true
        });
        
    }

    async changeEnable(id1,  enabled1, admin1){

        let formData = {
            "admin": admin1,
            "enabled": !enabled1
        }

        // console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/user/'+id1+"/" ,
        method:'PUT', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not allowed to do this")
        })

        console.log(response);

        const users_data= await axios.get('http://127.0.0.1:8000/api/user/', {withCredentials:true}).then(console.log("done"));

        console.log(users_data.data);

        await this.setState({
            users: users_data.data
        });

        await this.setState({
            done:true
        });

        
    };

    async changeAdmin(id1,  enabled1, admin1){
        let formData = {
            "admin": !admin1,
            "enabled": enabled1
        }

        // console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/user/'+id1+"/" ,
        method:'PUT', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not allowed to do this")
        })

        console.log(response);

        const users_data= await axios.get('http://127.0.0.1:8000/api/user/', {withCredentials:true}).then(console.log("done"));

        console.log(users_data.data);

        await this.setState({
            users: users_data.data
        });

        await this.setState({
            done:true
        });

    }
        
}

export default Members;


// (user.enabled===true)?(<button key={user.id} onClick={console.log(this.changeAdmin)}> Disable </button>):
//                                     (<button> Enable </button>)