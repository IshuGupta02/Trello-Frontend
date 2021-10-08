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
import {Button, Dropdown, Form , Header, TextArea, Input, Message} from 'semantic-ui-react';
// import {CustomCalendar} from 'semantic-ui-calendar-react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
// import Datetime from 'react-datetime';
import 'react-datepicker/dist/react-datepicker.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ReactQuill from 'react-quill';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from 'js-cookie';
import SideBar from './../components/sidebar';

//remember

//1. ensure that people chosen as admins are also members

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


class CreateProject extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            project_name :"",
            wiki: false,
            redirect: false,
            failed: false,
            submitted:false,
            userlist : [],
            members_list:[],
            project_members:[],
            project_admins:[],
            due_date: "",
            date_value:"",
            wiki : "<p>Empty</p>",

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
            dict["text"] = users[u]["User_name"];

            user_list.push(dict);
        }

        // console.log(arr);
        
        await this.setState({
            userlist:user_list
        })

        // console.log(this.state.userlist);
           
    }

    render(){

        const mystyle = {
            display: "flex",
            flexDirection: "row",
        };

        const formStyle={
            boxSizing: "border-box",
            width: "100%",
            paddingTop:"5vw",
            paddingRight: "10vw",
            paddingLeft: "10vw",
            // backgroundColor:"grey"
        };

        return(
            <div style={mystyle}>

                <SideBar/>

                <Form onSubmit={event => this.handleSubmit(event)} style={formStyle}>
                    <h2>
                        Add a new Project
                    </h2>

                    <Form.Field >
                    <label>Project Name</label>
                    <Input type="text" value={this.state.project_name} onChange={event => this.handleNameChange(event)} placeholder="Project Name" required />

                    </Form.Field>

                    

                    <Form.Field>
                    <label>Project Members</label>

                    <Dropdown
                        placeholder='Members'
                        options={this.state.userlist}
                        fluid multiple selection
                        onChange={(event,data) =>this.handleProjectMemberChange(event , data)
                        }
                        
                    />
                    </Form.Field>

                    <Form.Field>

                    <label>Project Admins</label>

                    <Dropdown
                        placeholder='Project Admins'
                        options={this.state.members_list}
                        fluid multiple selection
                        onChange={(event,data) =>this.handleProjectAdminChange(event , data)
                        }
                        
                        
                    />
                    </Form.Field>

                    
                    {/* <Form.Field label='Date' control={CustomCalendar} start='1' end='7' /> */}

                    <Form.Field>
                    
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

                    </Form.Field>


                    <Form.Field>

                    <label> Wiki: </label>

                    <CKEditor 
                        data={this.state.wiki}
                        onChange={(event, editor) => this.handleWikiChange( event, editor)}
                        editor= {ClassicEditor}
                    />

                    </Form.Field>

                    <Button type="submit" color="black">Create Project</Button>

                    {
                        this.state.submitted?(<Message positive>
                        <Message.Header>Project successfully created!</Message.Header>
                        <p>
                        Redirecting you to the project oage
                        </p>
                        </Message>): null
                    }


                    {
                        this.state.failed?
                        (<Message negative>
                        <Message.Header>Project could not be created, Some Problem Occured</Message.Header>
                        </Message>):null

                    }                    

                    
                </Form>

                
            </div>
        );
    }

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


    async handleSubmit(event){
        event.preventDefault();

        // console.log(Cookies.get("csrftoken"));
        
        let formData = { 
            Project_name: this.state.project_name,
            wiki: this.state.wiki ,
            members:this.state.project_members ,
            admins: this.state.project_admins,
            due_date: this.state.due_date      
        }

        // console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/project/' ,
        method:'POST', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(
        this.setState({
            failed:false,
            submitted:true

        })
        
        )
        .catch(err => {
            this.setState({
                failed:true,
                submitted:false
            })
        })

        // console.log(response.status)

        console.log(response);

        // const config = {
        //     headers: {
        //         "Content-Type": 'multipart/form-data',
        //         'X-CSRFToken': Cookies.get("csrftoken"),
        //         // 'Cookie': "csrftoken:"+Cookies.get("csrftoken")+"; sessionI"
        //     }
        // }
        // await axios.post("http://127.0.0.1:8000/api/project/",
        //   formData, config, {withCredentials:true})
        //   .then(res => {
        //     console.log(res.data)
        //   }).catch(err => {
        //     console.log(err)
        // })

        if(this.state.submitted){
            window.location.href='../project?id='+response.data.id;
        }

    }

    async handleNameChange(event){
        await this.setState({
            project_name: event.target.value
        });

    }

    async handleProjectMemberChange(event, data){
        // console.log(data);
        // console.log(data.value);
        // console.log(data.options);

        let memberList=[];

        for(let i in data.value){
            // console.log(data.value[i]);
            // console.log(this.state.userlist[data.value[i]]);

            let dict = {};
            dict["key"] = data.value[i];
            dict["value"] = data.value[i];
            // dict["label"] = this.state.userlist[3];
            for(let j in this.state.userlist){
                // console.log(this.state.userlist[j]["label"]);
                if(this.state.userlist[j]["key"]===data.value[i]){
                    dict["label"] = this.state.userlist[j]["label"];
                    dict["text"] = this.state.userlist[j]["text"];
                    break;
                }

            }

            memberList.push(dict);
            // console.log(memberList);
        }

        await this.setState({
            project_members: data.value
        });
        
        await this.setState({
            members_list: memberList
        });
        // console.log(this.state.project_members);

        

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

    async handleWikiChange(event, editor){
        // console.log(event);
        // console.log(editor);
        // console.log(editor.getData());

        await this.setState({
            wiki:editor.getData()
            
        });

        // console.log(this.state.wiki);

    }

}

export default CreateProject;