import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {Button, Dropdown, Form , Modal} from 'semantic-ui-react';
import Cookies from 'js-cookie';


class Project extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            id:"",
            project_name :"",
            wiki: "",
            project_members:[],
            project_admins:[],
            date_created:"",
            due_date: "",
            lists:[], 
            new_list:"",
            open_Modal:{},
            open_Modal_Card:{},
            Card_name:{},
            userlist:[],
            assigned:{},
            create_card_description:{}
        };
    }

    render(){
        return(
            <div>

            <div>
            Green:Admins
            Blue:members

            {
                this.state.project_members.map((member)=>{
                    return(
                        <div key={member.id}>
                        {member.id}, {member.User_name}
                        </div>
                    )
                })

            }
            </div>

            <div>

            <Form onSubmit={event => this.handleSubmit1(event)}>
                <h2>
                    Add new List
                </h2>
                <input type="text" value={this.state.new_list} onChange={event => this.handleNameChange(event)} />

                <br/>

                <Button type="submit" >Add</Button>

    
            </Form>

            </div>

            <div>
            {
                this.state.lists.map((list)=>{
                    return(
                        <div key={list.id}>
                            <hr/>
                            <button onClick={()=>this.openModal(list.id)}>List: {list.id}, {list.List_name}
                            </button>

                            <Form onSubmit={event => this.handleSubmitCard(event, list.id)}>

                                <h4>
                                    Add new Card
                                </h4>
                                <input type="text" value={this.state.Card_name[list.id]} onChange={event => this.handleNameChangeCard(event, list.id)} />
                                <br/>

                                <label>Assigned To:</label>

                                <Dropdown
                                    placeholder='assign'
                                    options={this.state.userlist}
                                    fluid multiple selection
                                    onChange={(event,data) =>this.handleAssignedMemberChange(event , data, list.id)
                                    }
                                    
                                />

                                <h6>
                                    Description
                                </h6>
                                <input type="text" value={this.state.create_card_description[list.id]} onChange={event => this.handleDescriptionChange(event, list.id)} />
                                <br/>
                                

                                <Button type="submit" >Add new Card</Button>
                            
                            </Form>


                            <Modal onClose={()=>this.closeModal(list.id)} 
                            open={this.state.open_Modal[list.id]}
                            onOpen={()=>this.openModal(list.id)}
                            >
                            Hello {list.List_name}

                            {
                                list.cardsoflist.map((card)=>{
                                    return(
                                        <div key={card.id}>
                                            <button onClick={()=>this.openModalCard(list.id, card.id)}> {card.id}
                                            </button>

                                            <Modal onClose={()=>this.closeModalCard(list.id, card.id)} 
                                            open={this.state.open_Modal_Card[list.id][card.id]}
                                            onOpen={()=>this.openModalCard(list.id, card.id)}
                                            >
                                            Hello {card.Card_name}

                                            

                                            </Modal>

                                        </div>
                                    )
                                })
                            }

                            </Modal>

                            <hr/>

                        </div>
                    )
                })
            }
            
            </div>

            </div>
        );
    }

    async handleSubmit1(event){
        event.preventDefault();
        
        let formData = { 
            List_name: this.state.new_list,
            Project:this.state.id
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/list/' ,
        method:'POST', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("You are not a member of this project, not allowed to create a list here")
        })

        await this.setState({
            new_list: ""
        });
        
        console.log(response);
        this.componentDidMount();

    }

    async handleNameChange(event){
        await this.setState({
            new_list: event.target.value
        });

    }

    async handleNameChangeCard(event, list_id){

        let arr= this.state.Card_name;
        arr[list_id]=event.target.value;

        await this.setState({
            Card_name: arr
        });
        
    }

    async componentDidMount(){
        // eslint-disable-next-line no-restricted-globals
        const params= new URLSearchParams(location.search);
        const id= params.get("id");

        const project= await axios.get('http://127.0.0.1:8000/api/project/'+id, {withCredentials:true}).then(console.log("done"));

        const data= project.data;

        console.log(data)

        await this.setState({id:data.id });
        await this.setState({project_name:data.Project_name });
        await this.setState({wiki:data.wiki});
        await this.setState({project_members:data.members });
        await this.setState({project_admins:data.admins });
        await this.setState({date_created:data.date_created });
        await this.setState({due_date:data.due_date });
    
        console.log(this.state.project_members);

        let arr1= {};
        let arr2= {};
        let arr3= {};
        let arr4= {};

        await data.listsassociated.map((list)=>{
            arr1[list.id]=  false;
            arr3[list.id]="";
            arr4[list.id]="";
            let arr_card={};

            list.cardsoflist.map((card)=>{
                arr_card[card.id]=  false;
            })

            arr2[list.id]=arr_card;

        })

        await this.setState({
            create_card_description:arr4
        })

        await this.setState({
            Card_name:arr3
        })
        
        await this.setState({
            open_Modal_Card:arr2
        })

        await this.setState({
            open_Modal:arr1
        })
                
        console.log(this.state.open_Modal_Card);
        await this.setState({lists:data.listsassociated });
        console.log(this.state.open_Modal);
        console.log(this.state.lists);

        let user_list=[];
        
        const users=this.state.project_members;
        
        for(let u in users){
            // console.log(u);
            let dict = {};
            dict["key"] = users[u]["id"];
            dict["value"] = users[u]["id"];
            dict["label"] = users[u]["User_name"];
            dict["text"] = users[u]["User_name"];

            user_list.push(dict);
        }
        
        await this.setState({
            userlist:user_list
        })
    }

    async openModal(id){
        let arr=this.state.open_Modal;
        arr[id]= true;

        await this.setState({
            open_Modal: arr

        })

        console.log(this.state.open_Modal);
    }

    async closeModal(id){
        let arr=this.state.open_Modal;
        arr[id]= false;

        await this.setState({
            open_Modal: arr

        })

        console.log(this.state.open_Modal);
    }

    async openModalCard(list_id, card_id){
        let arr=this.state.open_Modal_Card;
        arr[list_id][card_id]= true;

        await this.setState({
            open_Modal_Card: arr

        })

        console.log(this.state.open_Modal_Card);

    }
    
    async closeModalCard(list_id, card_id){
        let arr=this.state.open_Modal_Card;
        arr[list_id][card_id]= false;

        await this.setState({
            open_Modal_Card: arr

        })

        console.log(this.state.open_Modal_Card);

    }

    async handleAssignedMemberChange(event , data, list_id){

        let arr=this.state.assigned;
        arr[list_id]= data.value;

        await this.setState({
            assigned:arr
        })

    }

    async handleDescriptionChange(event, list_id){

        let arr= this.state.create_card_description;
        arr[list_id]=event.target.value;

        await this.setState({
            create_card_description:arr
        })
    }

    async handleSubmitCard(event, list_id){
        event.preventDefault();

        let formData = { 
            Card_name: this.state.Card_name[list_id],
            List: list_id ,
            assigned:this.state.assigned[list_id],
            description:this.state.create_card_description[list_id]
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/card/' ,
        method:'POST', 
        data:formData , 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            console.log(err)
        })

        console.log(response);

    }
}


export default Project;