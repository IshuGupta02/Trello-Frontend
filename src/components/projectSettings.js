import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {Button, Form , Modal, Icon, Dropdown, Input} from 'semantic-ui-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from 'js-cookie';

class Settings extends Component{


    // <Settings 
    //         open={this.state.setting_modal} 
    //         method= {this.handleOpenClose_settings} 
    //         name={this.state.project_name}
    //         members={this.state.project_members}
    //         admins={this.state.project_admins}
    //         wiki={this.state.wiki}
    //         project_id={this.state.id}
    // />

    constructor(props)
    {
        super(props);

        this.state = {
            // project_id:this.props.project_id,
            project_name :"",
            userlist :[],
            project_members:[],
            project_admins:[],
            wiki : "<p>Empty</p>",
            member_values:[],
            admin_values:[],
            done:false                     

        };

    }

    async onOpen(){
        console.log("called")
        this.setState({
            done:!this.state.done
        })
        this.props.method()

    }


    render(){
        console.log(this.state.project_name)

        if(this.state.project_name!==undefined){
            return(
            
                <Modal onClose={()=>{
                    this.props.method()
                            
                }}
                
                open={this.props.open}
    
                onOpen={()=>{
                    this.props.method()
                    // this.onOpen()
                                   
                }}
                >
                {/* {this.componentDidMount()} */}
                    <Form>
                        <h2>
                            Settings
                        </h2>
    
                        <Form.Field inline>
                        <label>Project Name</label>
                        <Input type="text" value={this.state.project_name} onChange={event => this.handleNameChange(event)} placeholder="Project Name" required />
    
                        <Button color="black" onClick={()=>{this.editName()}}>Change Name</Button>
    
                        </Form.Field>
    
    
                        <Form.Field inline>
                        <label>Project Members</label>
    
                        <Dropdown
                            placeholder='Members'
                            options={this.state.userlist}
                            value={this.state.member_values}
                            multiple selection
                            onChange={(event,data) =>this.handleProjectMemberChange(event , data)
                            }
                            
                        />
                        <Button color="black" onClick={()=>{this.editMembers()}}>Make Changes</Button>
                        </Form.Field>
    
    
    
                        <Form.Field inline>
                        <label>Project Admins</label>
    
                        <Dropdown
                            placeholder='Admins'
                            options={this.state.project_members}
                            value={this.state.admin_values}
                            multiple selection
                            onChange={(event,data) =>this.handleProjectAdminChange(event , data)
                            
                            }
                            
                        />
                        <Button color="black" onClick={()=>{this.editAdmins()}}>Make Changes</Button>
                        </Form.Field>
    
                        
                        
                        <Form.Field inline>
    
                        <label> Wiki: </label>
    
                        <CKEditor 
                            data={this.state.wiki}
                            onChange={(event, editor) => this.handleWikiChange( event, editor)}
                            editor= {ClassicEditor}
                        />
    
                        </Form.Field>
    
                        <Button color="black" onClick={()=>{this.editWiki()}}>Change Wiki</Button>
    
                        </Form>
    
    
                </Modal>
                
            );
        }
        else{
            return(
                <Modal onClose={()=>{
                    this.props.method()
                            
                }}
                
                open={this.props.open}
    
                onOpen={()=>{
                    // this.props.method()
                    // this.onOpen()
                    console.log("open!")
                                   
                }}
                >
                    <p>loading...</p>
                </Modal>
            );
        }
    }

    editMembersCheck(){
        for(let i in this.state.admin_values){
            console.log(this.state.admin_values[i]);
            console.log(this.state.member_values.indexOf(this.state.admin_values[i]))
            if(this.state.member_values.indexOf(this.state.admin_values[i]) === -1)  
            {
                console.log("false")
                return false;
            }
            
        }
        return true;
    }

    async editMembers(){

        let i= this.editMembersCheck();
        console.log(i)
        if(i===true){
            let formData = {
            
                "members": this.state.member_values
                
            }
    
            // console.log(formData);
    
            let error= false;
    
            const response= await axios({url:'http://127.0.0.1:8000/api/project/'+this.props.project_id+"/" ,
            method:'PATCH', 
            data:formData , 
            withCredentials:true, 
            headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
            .then(console.log("done"))
            .catch(err => {
                error=true;
                alert("You are not allowed to do this")
            })
    
            console.log(response);
    
            if(response){
                let memberList=[];
    
                const data=response.data.members
    
                for(let i in data){
                
                    let dict = {};
                    dict["key"] = data[i];
                    dict["value"] = data[i];
                    // dict["label"] = this.state.userlist[3];
                    for(let j in this.state.userlist){
                        // console.log(this.state.userlist[j]["label"]);
                        if(this.state.userlist[j]["key"]===data[i]){
                            dict["label"] = this.state.userlist[j]["label"];
                            dict["text"] = this.state.userlist[j]["text"];
                            break;
                        }
    
                    }
    
                    memberList.push(dict);
                    // console.log(memberList);
                }
    
                this.setState({
                    project_members: memberList
                });
    
            }
        }
        else{
            console.log("qqq")
            alert("to remove an admin from member, remove him/her from members first")
        }
        

        


        console.log(this.state.project_members)
        console.log(this.state.admin_values)



    }

    async editAdmins(){

        console.log(this.state.admin_values)

        let formData = {
            
            "admins": this.state.admin_values
            
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/project/'+this.props.project_id+"/" ,
        method:'PATCH', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not allowed to do this")
        })

        console.log(response);

    }


    async editName(){

        let formData = {
            
            "Project_name": this.state.project_name
            
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/project/'+this.props.project_id+"/" ,
        method:'PATCH', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not allowed to do this")
        })

        console.log(response);

    }

    async editWiki(){

        let formData = {
            "wiki": this.state.wiki
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/project/'+this.props.project_id+"/" ,
        method:'PATCH', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not allowed to do this")
        })

        console.log(response);

    }

    async handleProjectMemberChange(event , data){

    
        this.setState({
            member_values: data.value
        });
        

    }
    async handleProjectAdminChange(event , data){
        console.log(this.state.admin_values)
        this.setState({
            admin_values: data.value
        });

        console.log(this.state.admin_values)

        
    }

    async handleNameChange(event){
        this.setState({
            project_name: event.target.value
        });

    }

    async handleWikiChange(event, editor){
        
        this.setState({
            wiki:editor.getData()
            
        });

    }


    async componentDidMount(){
        const id= this.props.project_id;
        console.log("id "+id)

        const project= await axios.get('http://127.0.0.1:8000/api/projectData/'+id, {withCredentials:true}).then(console.log("done"));

        // console.log(project)

        const data= project.data;


        console.log(data)

        // this.setState({id:data.id });
        this.setState({project_name:data.Project_name });
        this.setState({wiki:data.wiki});
        // this.setState({project_members:data.members });
        this.setState({project_admins:data.admins });
        // this.setState({due_date:data.due_date });

        console.log(this.state.project_members);
        console.log(this.state.project_admins);

        
        let memberList=[];
        let memberList1=[];
        
        let users1=data.members;
        
        for(let u in users1){
            let dict = {};
            dict["key"] = users1[u]["id"];
            dict["value"] = users1[u]["id"];
            dict["label"] = users1[u]["User_name"];
            dict["text"] = users1[u]["User_name"];
            memberList1.push(dict);

            memberList.push(users1[u]["id"]);
        }
        
        this.setState({
            member_values:memberList
        })
        this.setState({
            project_members:memberList1
        })


        let adminList=[];
        let adminList1=[];
        
        users1=data.admins;
        
        for(let u in users1){
            let dict = {};
            dict["key"] = users1[u]["id"];
            dict["value"] = users1[u]["id"];
            dict["label"] = users1[u]["User_name"];
            dict["text"] = users1[u]["User_name"];
            adminList1.push(dict);

            adminList.push(users1[u]["id"]);
        }
        
        this.setState({
            admin_values:adminList
        })
        this.setState({
            project_admins:adminList1
        })

        console.log(this.state.admin_values);
        console.log(this.state.project_members);



        const response= await axios({url:'http://127.0.0.1:8000/api/user/' ,method:'GET', withCredentials:true} ).then(console.log("done"));

        let user_list=[];
        
        const users=response.data;
        
        for(let u in users){
            let dict = {};
            dict["key"] = users[u]["id"];
            dict["value"] = users[u]["id"];
            dict["label"] = users[u]["User_name"];
            dict["text"] = users[u]["User_name"];

            user_list.push(dict);
        }
        
        this.setState({
            userlist:user_list
        })

    }
}

export default Settings;