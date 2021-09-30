import * as React from 'react'
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
// import { Select } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css'
import {Button, Dropdown, Form , Header} from 'semantic-ui-react';
// import {CustomCalendar} from 'semantic-ui-calendar-react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
// import Datetime from 'react-datetime';
import 'react-datepicker/dist/react-datepicker.css';


// {
//not req//     "id": 2,
//done//     "Project_name": "vhjvkhhk",
//     "wiki": "tfckjv",
//     "date_created": "2021-09-07",
//     "due_date": "2021-09-08",
//done//     "members": [],  
//done//     "admins": [],
//not req//     "listsassociated": []
// }



//remember

//1. ensure that people chosen as admins are also members

//next task
//1. date field
//2. wiki field


class CreateProject extends React.Component{
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
            project_admins:[],
            due_date: "",
            date_value:"",

        };
        
    }

    // renderRedirect= () =>{

    //     // console.log(this.state.error);
    //     if(this.state.failed===true)
    //     {
    //         // alert("Could not create the project!")
    //         return <Redirect to={{pathname:'../dashboard'}}/>
    //     }

    //     if(this.state.redirect===true)
    //     {
    //         // alert("Could not create the project!")
    //         return <Redirect to={{pathname:'../project?'}}/>
    //     }
    // }

    async handleSubmit(event){
        // event.preventDefault();

        // let formData = { project_name: this.state.project_name, wiki: this.state.wiki , project_members:this.state.project_members }

        // const response= await axios({url:'http://127.0.0.1:8000/project/' ,method:'POST', data:formData , withCredentials:true} ).then(response=>{this.setState({redirect:true})}).catch(error=>{this.setState({failed:true})})

        // console.log(response);

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
            dict["key"] = users[u]["id"];
            dict["value"] = users[u]["id"];
            dict["label"] = users[u]["User_name"];

            user_list.push(dict);
        }

        // console.log(arr);
        
        await this.setState({
            userlist:user_list
        })

        // console.log(this.state.userlist);
           
    }

    render(){

        return(
            <div>

                <Form onSubmit={event => this.handleSubmit(event)}>
                    <h2>
                        Add new Project
                    </h2>
                    <input type="text" value={this.state.project_name} onChange={event => this.handleNameChange(event)} />

                    <br/>

                    <label>Project Members</label>

                    <Dropdown
                        placeholder='Members'
                        options={this.state.userlist}
                        fluid multiple selection
                        onChange={(event,data) =>this.handleProjectMemberChange(event , data)
                        }
                        
                    />

                    <label>Project Admins</label>

                    <Dropdown
                        placeholder='Project Admins'
                        options={this.state.userlist}
                        fluid multiple selection
                        onChange={(event,data) =>this.handleProjectAdminChange(event , data)
                        }
                        
                    />

                    <br/>
                    {/* <Form.Field label='Date' control={CustomCalendar} start='1' end='7' /> */}
                    
                    <label>Due Date: </label>
                    {/* <div className="ui calendar" id="dueDate">
                        <div className="ui input right fluid icon"> 
                            
                            <input type="date" placeholder="Date/Time" onChange={(event, data) =>this.handleDueDateChange(event, data)}
                                // value={this.state.due_date}
                            />
                        </div>
                    </div> */}

                    <DatePicker onChange={(event) => this.handleDueDateChange( event)} selected={this.state.date_value}/>

                    {/* <Datetime
                    placeholder='Due Date'
                    name='due_date'
                    value = {start_date}
                    width={8}
                    timeFormat = {true}
                    onChange={handleSDateChange}
                    /> */}

                    {/* <DatePicker locale="es" selected={new Date()}  /> */}

                    


    
                </Form>
            </div>
        );
    }

    async handleNameChange(event){
        await this.setState({
            project_name: event.target.value
        });

    }

    async handleProjectMemberChange(event, data){

        await this.setState({
            project_members: data.value
        });

    }

    async handleProjectAdminChange(event, data){

        await this.setState({
            project_admins: data.value
        });

    }

    // async handleDueDateChange1(event, data){
    //     console.log(event);
    //     console.log(data);
    //     // console.log(this.state.due_date);

    //     var date= new Date("2021-09-07");
    //     // console.log(date);
    //     // console.log(date.toString());
    //     // console.log(date.getDate());
    //     // console.log(date.getMonth());
    //     // console.log(date.getFullYear());

    //     let date1=data.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    //     console.log(date1);


    // }

    async handleDueDateChange(data){
        console.log(data);
        let date1=data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
        console.log(date1);

        // await this.setState({date_value: data});
        // await this.setState({due_date: due_date});

        await this.setState({
            date_value: data
        });

        await this.setState({
            due_date: date1
        });
        

    }



}

export default CreateProject;