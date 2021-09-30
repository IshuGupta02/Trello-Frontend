import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'

class CreateProject extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            project_name :"",
            wiki: false,
            redirect: false,
            failed: false,
            userlist : [],
            project_members:[],

        };
    }

    renderRedirect= () =>{

        // console.log(this.state.error);
        if(this.state.failed===true)
        {
            // alert("Could not create the project!")
            return <Redirect to={{pathname:'../dashboard'}}/>
        }

        if(this.state.redirect===true)
        {
            // alert("Could not create the project!")
            return <Redirect to={{pathname:'../project?'}}/>
        }
    }

    async handleSubmit(event){
        // event.preventDefault();

        // let formData = { project_name: this.state.project_name, wiki: this.state.wiki , project_members:this.state.project_members }

        // const response= await axios({url:'http://127.0.0.1:8000/project/' ,method:'POST', data:formData , withCredentials:true} ).then(response=>{this.setState({redirect:true})}).catch(error=>{this.setState({failed:true})})

        // console.log(response);

    }

    render(){
        return(
            <div>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <h2>
                        Add new Project
                    </h2>
                    <input id="project_name" placeholder='Project Name'></input>
                </form>
            </div>
        );
    }

    async componentDidMount(){

        const response= await axios({url:'http://127.0.0.1:8000/api/user/' ,method:'GET', withCredentials:true} ).then(console.log("done"));

        // console.log(users.data);

        let user_list=[];
        
        const users=response.data;

        // console.log(users);
        
        for(let u in users){
            // console.log(u);
            let dict = {};
            dict["user_id"] = users[u]["id"];
            dict["name"] = users[u]["User_name"];
            user_list.push(dict);
        }

        // console.log(arr);
        
        await this.setState({
            userlist:user_list
        })

        // console.log(this.state.userlist);
           
    }
}

export default CreateProject;