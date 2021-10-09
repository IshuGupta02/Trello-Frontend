import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {Button, Dropdown, Form , Modal, Header, Segment, Icon, Card} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import SideBar from './../components/sidebar'
import Settings from './../components/projectSettings'
import Avatar from 'react-avatar'


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
            create_card_description:{},
            setting_modal:false
        };

        this.handleOpenClose_settings=this.handleOpenClose_settings.bind(this);
        // this.editProject=this.editProject.bind(this); 
    }

    

    render(){
        const mystyle = {
            display: "flex",
            flexDirection: "row",
        };

        

        const header= {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            // margin:'0'
        }

        const Removemargin={
            margin:'0'
        }

        

        return(

            <div style={mystyle}>

            <SideBar/>
            
            <div style={{width:'90vw'}}>

            <Segment inverted fluid style={Removemargin}>

            <Header as='h3' style={header}>
                {this.state.project_name}
                <Icon name='setting' size='large' link onClick={()=>{
                    this.setState({
                        setting_modal: true
                    });
                    // console.log(this.state.setting_modal)
                }}/>
            </Header>

            <Settings 
            open={this.state.setting_modal} 
            method= {this.handleOpenClose_settings} 
            name={this.state.project_name}
            members={this.state.project_members}
            admins={this.state.project_admins}
            wiki={this.state.wiki}
            project_id={this.state.id}
            />

            </Segment>

            <Segment tertiary fluid style={Removemargin}>

            <div dangerouslySetInnerHTML={this.createMarkup(this.state.wiki)} />

            </Segment>


            <div style={header}>

            <div >
            
            {
                this.state.project_members.map((member)=>{
                    return(

                        <Avatar key={member.id} name={member.User_name} size="30" round={true} />
                        
                    )
                })
            }
            </div>
           
           
            <div >
            Admins:
            {
                this.state.project_admins.map((member)=>{
                    return(

                        <Avatar key={member.id} name={member.User_name} size="30" round={true} />
                        
                    )
                })

            }
            </div>
            </div>

            <div>

            <Form onSubmit={event => this.handleSubmit1(event)} size='mini'>
                
                {/* <input type="text" value={this.state.new_list} onChange={event => this.handleNameChange(event)} /> */}

                <Form.Group inline>

                <Form.Field
                    required
                    // label='List name'
                    control='input'
                    placeholder='List name'
                    value={this.state.new_list} 
                    onChange={event => this.handleNameChange(event)}
                    inline
                />

                <Button type="submit" size='mini' >Add</Button>
                </Form.Group>
    
            </Form>

            </div>

            <div>
            {
                this.state.lists.map((list)=>{
                    return(
                        <Card key={list.id} >
                            <Card.Content>

                            <Card.Header >
                            <span onClick={()=>this.openModal(list.id)}>{list.List_name}</span>
                            
                            <Icon name='delete' color='red' onClick={()=>this.deleteList(list.id)} floated='right'/>

                            </Card.Header>

                            {/* <Card.Meta>Friends of Elliot</Card.Meta> */}

                            {
                                list.cardsoflist.map((card)=>{
                                    return(
                                        <div key={card.id}>
                                            {card.Card_name}: 
                                            {
                                                card.assigned.map((assign_member)=>{
                                                    return(
                                                        <span>
                                                        {assign_member.User_name}, 
                                                        </span>

                                                    )                                                    
                                                })

                                            }
                                            

                                        </div>
                                    )
                                })
                            }

                            </Card.Content>

                            <Card.Content extra>

                            <Form onSubmit={event => this.handleSubmitCard(event, list.id)} size='mini'>

                            <Form.Group inline>

                            {/* <Form.Field
                                required
                                // label='List name'
                                control='input'
                                placeholder='Name'
                                value={this.state.Card_name[list.id]} 
                                onChange={event => this.handleNameChangeCard(event, list.id)}
                                inline
                            /> */}

                            <input type="text" placeholder='Name' value={this.state.Card_name[list.id]} onChange={event => this.handleNameChangeCard(event, list.id)} />
                                

                                <Dropdown
                                    placeholder='assign'
                                    options={this.state.userlist}
                                    multiple selection
                                    onChange={(event,data) =>this.handleAssignedMemberChange(event , data, list.id)
                                    }
                                    
                                />

                            </Form.Group>

                            <Form.Group>

                                <input type="text" placeholder='Description' value={this.state.create_card_description[list.id]} onChange={event => this.handleDescriptionChange(event, list.id)} />
                                                                
                                <Button type="submit" >Add</Button>

                            </Form.Group>
                            
                            </Form>


                            </Card.Content>
                            
                        
                            <Modal onClose={()=>this.closeModal(list.id)} 
                            open={this.state.open_Modal[list.id]}
                            onOpen={()=>this.openModal(list.id)}
                            >
                            Hello {list.List_name}

                            <button onClick={()=>this.deleteList(list.id)}>Delete
                            </button>

                            {
                                list.cardsoflist.map((card)=>{
                                    return(
                                        <div key={card.id}>
                                        <hr/>
                                            <button onClick={()=>this.openModalCard(list.id, card.id)}> {card.Card_name}
                                            </button>

                                            <div>

                                            Assigned to:-

                                            {
                                                card.assigned.map((assign_member)=>{
                                                    return(
                                                        <div key={assign_member.id}>
                                                        {assign_member.User_name},
                                                        {assign_member.enrollment_no},
                                                        {assign_member.email}, 
                                                        </div>

                                                    )                                                    
                                                })

                                            }

                                            </div>
                                    
                                            Description:

                                            {card.description}

                                            <br/>

                                            <button onClick={()=>this.deleteCard(list.id, card.id)}> Delete
                                            </button>

                                            <button onClick={()=>this.openModalCard(list.id, card.id)}> Update
                                            </button>


                                            <Modal onClose={()=>this.closeModalCard(list.id, card.id)} 
                                            open={this.state.open_Modal_Card[list.id][card.id]}
                                            onOpen={()=>this.openModalCard(list.id, card.id)}
                                            >

                                            {card.Card_name}

                                            <div>

                                            Assigned to:-

                                            {
                                                card.assigned.map((assign_member)=>{
                                                    return(
                                                        <div key={assign_member.id}>
                                                        {assign_member.User_name},
                                                        {assign_member.enrollment_no},
                                                        {assign_member.email}, 
                                                        </div>

                                                    )                                                    
                                                })

                                            }

                                            </div>
                                    
                                            Description:

                                            {card.description}

                                            <br/> 


                                            </Modal>

                                            <hr/>

                                        </div>
                                    )
                                })
                            }

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
                                    multiple selection
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

                            </Modal>

                            <hr/>

                        </Card>
                    )
                })
            }
            
            </div>

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

        const project= await axios.get('http://127.0.0.1:8000/api/projectData/'+id, {withCredentials:true}).then(console.log("done"));

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

        console.log(this.state.assigned[list_id])

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

    async deleteCard(list_id, card_id){
        const response= await axios({url:'http://127.0.0.1:8000/api/card/'+card_id+'/' ,
        method:'DELETE', 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            console.log(err)
        })

        console.log(response);
        
    }

    async deleteList(list_id){

        const response= await axios({url:'http://127.0.0.1:8000/api/list/'+list_id+'/' ,
        method:'DELETE', 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            console.log(err)
        })

        console.log(response);


    }

    createMarkup(content){
        return {__html: content};
    }

    handleOpenClose_settings (){
        this.setState({ setting_modal: !this.state.setting_modal });
    };

    
}


export default Project;