import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {Button, Dropdown, Form , Modal, Header, Segment, Icon, Card, Input, Label, Confirm} from 'semantic-ui-react';
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
            setting_modal:false,
            card_name:"",
            card_desc:"",
            card_assign:[],
            open_confirm:false,
            deletelist:false,
            deletecard:false,
            list_id_delete:"",
            card_id_delete:"",
            card_id_delete_list:"",
        };

        this.handleOpenClose_settings=this.handleOpenClose_settings.bind(this);
        // this.editProject=this.editProject.bind(this); 
    }

    

    render(){
        const mystyle = {
            display: "flex",
            flexDirection: "row",
        };

        // const giveMarginInput={
        //     margin:'20px',
            
        // }

        let list_id_delete="";
        let card_id_delete="";

        const header= {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            // margin:'0'
        }

        const Removemargin={
            margin:'0'
        }

        const projectDetails={
            margin:'0',
            marginBottom:'20px'

        }

        // eslint-disable-next-line no-restricted-globals
        const params= new URLSearchParams(location.search);
        const id= params.get("id");

        

        return(

            <div style={mystyle}>

            <SideBar/>
            
            <div style={{width:'90vw'}}>



            <Segment inverted fluid style={Removemargin}>

            <Header as='h3' style={header}>

            TRELLO
                
            </Header>

            </Segment>


            <Segment tertiary fluid style={projectDetails} >

            <Header as='h1' style={header}>
                {this.state.project_name}
                <Icon name='setting' size='large' link onClick={()=>{
                    this.setState({
                        setting_modal: true
                    });
                    // console.log(this.state.setting_modal)
                }}/>
            </Header>

            <Segment tertiary fluid style={projectDetails}>

            WIKI: <div dangerouslySetInnerHTML={this.createMarkup(this.state.wiki)} />

            </Segment>

            <Settings 
            open={this.state.setting_modal} 
            method= {this.handleOpenClose_settings} 
            name={this.state.project_name}
            members={this.state.project_members}
            admins={this.state.project_admins}
            wiki={this.state.wiki}
            project_id={id}
            />

            <div style={header}>

            <div>

            {/* Members: */}

            {/* <Avatar key={member.id} name={member.User_name} size="30" round={true} /> */}

            {
                this.state.project_members.map((member)=>{
                    return(

                        <Label as='a' image>
                        
                        
                        {
                            
                            (member.profile!=null)?(<img src={`http://channeli.in/${member.profile.substring(21)}`}/>):(<img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />)
                            
                        }
                            
                            {member.User_name}
                        </Label>                        
                        
                    )
                })
            }
            </div>


            <div >
            Admins:
            {
                this.state.project_admins.map((member)=>{
                    return(

                        <Label as='a' image>
                        
                        
                        {
                            
                            (member.profile!=null)?(<img src={`http://channeli.in/${member.profile.substring(21)}`}/>):(<img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />)
                            
                        }
                            
                            {member.User_name}
                        </Label>
                        
                    )
                })

            }
            </div>
            </div>



            </Segment>

            
            <div style={{width:'100%'}}>

            <Form onSubmit={event => this.handleSubmit1(event)} size='mini' >
                
                {/* <input type="text" value={this.state.new_list} onChange={event => this.handleNameChange(event)} /> */}
                Add List
                <Form.Group inline>

                <Form.Field
                    required
                    // label='List name'
                    control='input'
                    placeholder='List name'
                    value={this.state.new_list} 
                    // onChange={event => this.handleNameChange(event)}
                    onChange={(event)=>{this.setState({
                        new_list: event.target.value
                    });}}
                    inline
                />

                <Button type="submit" size='mini' >Add</Button>
                </Form.Group>
    
            </Form>
            <br/>

            </div>

            <Card.Group>
            {
                this.state.lists.map((list)=>{
                    return(
                        <Card key={list.id} >
                            <Card.Content>

                            <Card.Header >
                            <span onClick={()=>this.openModal(list.id)}>{list.List_name}</span>
                            
                            <span>
                            

                            <Icon name='delete' color='red' onClick={()=>{
                                this.setState({
                                    list_id_delete:list.id
                                })
                                // console.log(list_id_delete)
                                this.setState({
                                    deletelist:true
                                });

                            }
                            
                            } floated='right'/>

                            <Confirm
                                open={this.state.deletelist}
                                onCancel={this.notDeleteList}
                                onConfirm={()=>{this.deleteList(this.state.list_id_delete)}}
                            />
                            <Confirm
                                open={this.state.deletecard}
                                onCancel={this.notDeleteCard}
                                onConfirm={()=>{this.deleteCard(this.state.card_id_delete_list, this.state.card_id_delete)}}
                            />

                            </span>
                            

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
                                                        
                                                        <Avatar key={assign_member.id} name={assign_member.User_name} size="20"  />

                                                    )                                                    
                                                })

                                            }
                                           <Icon name='delete' color='red' onClick={()=>{
                                                this.setState({
                                                    card_id_delete_list:list.id
                                                })
                                                this.setState({
                                                    card_id_delete:card.id
                                                })                                                
                                                this.setState({
                                                    deletecard:true
                                                });

                                            }
                                            
                                            } floated='right'/>

                                           
                                           {/* <Icon name='angle double right' color='green' onClick={()=>this.openModalCard(list.id, card.id)}/> */}
                                           
                                        </div>
                                    )
                                })
                            }

                            </Card.Content>

                            <Card.Content extra>

                            <Form onSubmit={event => this.handleSubmitCard(event, list.id)} size='mini'>

                            <Form.Group inline>


                            <input type="text" placeholder='Name' value={this.state.Card_name[list.id]} onChange={event => this.handleNameChangeCard(event, list.id)} />
                                

                                <Dropdown
                                    placeholder='assign'
                                    options={this.state.userlist}
                                    // defaultValue={this.state.card_assign}
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

                            <Segment inverted fluid style={Removemargin}>

                            <Header as='h2' style={header} >
                                {list.List_name}

                                <Button onClick={()=>{
                                this.setState({
                                    list_id_delete:list.id
                                })
                                // console.log(list_id_delete)
                                this.setState({
                                    deletelist:true
                                });

                            }
                            
                            }
                            negative>Delete
                                </Button>
                                
                            </Header>
                            </Segment>

                            <Card.Group>
                            
                            {
                                
                                list.cardsoflist.map((card)=>{
                                    return(
                                        <Card key={card.id}>

                                        <Card.Content>
                                        <Card.Header>{card.Card_name}</Card.Header>
                                        

                                            {/* <Button onClick={()=>this.openModalCard(list.id, card.id)}> {card.Card_name}
                                            </Button> */}

                                            <div>

                                            

                                            {
                                                card.assigned.map((assign_member)=>{
                                                    return(
                                                        <Card.Meta key={assign_member.id}>
                                                        
                                                        {assign_member.User_name}
                                                                                                            
                                                        </Card.Meta>
                                                        

                                                    )                                                    
                                                })

                                            }

                                            </div>
                                            <br/>
                                    
                                            <Card.Description>
                                            Desc: 
                                            {card.description}
                                            </Card.Description>        

                                            </Card.Content>

                                            <Card.Content extra >
                                                <div className='ui two buttons' >

                                                <Button color='red' onClick={()=>{
                                                this.setState({
                                                    card_id_delete_list:list.id
                                                })
                                                this.setState({
                                                    card_id_delete:card.id
                                                })                                                
                                                this.setState({
                                                    deletecard:true
                                                });

                                            }
                                            
                                            } basic> Delete </Button>

                                                <Button color='green' onClick={()=>this.openModalCard(list.id, card.id)} basic> Update </Button>
                                                
                                                </div>
                                            </Card.Content>


                                            <Modal onClose={()=>this.closeModalCard(list.id, card.id)} 
                                            open={this.state.open_Modal_Card[list.id][card.id]}
                                            onOpen={()=>this.openModalCard(list.id, card.id)}
                                            >

                                            {/* {card.Card_name}

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

                                            {card.description} */}

                                            

                                            <Form >

                                            <Form.Field inline>

                                            <Input value={this.state.card_name} onChange={event => this.handleCardNameChange(event)} required/>

                                            <Button onClick={()=>{this.editCardName(card.id)}}>Change Name</Button>
                                            
                                            </Form.Field>


                                            <Form.Field inline>

                                            <Input value={this.state.card_desc} onChange={event => this.handleCardDescChange(event)} required/>

                                            <Button onClick={()=>{this.editCardDesc(card.id)}}>Change Description</Button>
                                            
                                            </Form.Field>

                                            <Form.Field inline>
                                            

                                            <Dropdown
                                                placeholder='AssignedTo'
                                                options={this.state.userlist}
                                                defaultValue={this.state.card_assign}
                                                multiple selection
                                                onChange={(event,data) =>this.handleCardAssignChange(event , data)
                                                
                                                }
                                                
                                            />

                                            <Button onClick={()=>{this.editCardAssign(card.id)}}>Assign</Button>


                                            </Form.Field>

                                            </Form>


                                            </Modal>

                                            <hr/>

                                        </Card>
                                    )
                                })
                            }

                            </Card.Group>

                            {/* <Form onSubmit={event => this.handleSubmitCard(event, list.id)}>

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
                            
                            </Form> */}

                            <Segment style={{paddingTop:'0px', paddingBottom:'0px'}}>

                            <Form onSubmit={event => this.handleSubmitCard(event, list.id)} size='mini'>

                            <Form.Group inline>


                                <input type="text" placeholder='Name' value={this.state.Card_name[list.id]} onChange={event => this.handleNameChangeCard(event, list.id)}
                                style={{width:'30%', marginRight:'2px'}} />
                                

                                <Dropdown
                                    
                                    placeholder='assign'
                                    options={this.state.userlist}
                                    // defaultValue={this.state.card_assign}
                                    multiple selection
                                    onChange={(event,data) =>this.handleAssignedMemberChange(event , data, list.id)                                    
                                    }
                                    style={{width:'30%', marginRight:'2px'}}
                                    
                                />

                                <input type="text" placeholder='Description' value={this.state.create_card_description[list.id]} onChange={event => this.handleDescriptionChange(event, list.id)} 
                                style={{width:'40%', marginRight:'2px'}}
                                />
                                                                
                                <Button type="submit" size='tiny'>Add</Button>

                            </Form.Group>
                            
                            </Form>

                            </Segment>

                            </Modal>

                            <hr/>

                        </Card>
                    )
                })
            }
            
            </Card.Group>

            {/* <Confirm
                open={this.state.deletelist}
                onCancel={this.notDeleteList}
                onConfirm={this.deleteList(list_id_delete)}
            /> */}

            </div>

            </div>
        );
    }

    async handleSubmit1(event){
        event.preventDefault();

        // confirm("are you sure")

        // this.setState({
        //     open_confirm:true
        // })
        
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

        this.setState({
            new_list: ""
        });
        
        console.log(response);
        this.componentDidMount();

    }

    async handleNameChange(event){
        this.setState({
            new_list: event.target.value
        });

    }

    async handleNameChangeCard(event, list_id){

        let arr= this.state.Card_name;
        arr[list_id]=event.target.value;

        this.setState({
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

        this.setState({id:data.id });
        this.setState({project_name:data.Project_name });
        this.setState({wiki:data.wiki});
        this.setState({project_members:data.members });
        this.setState({project_admins:data.admins });
        this.setState({date_created:data.date_created });
        this.setState({due_date:data.due_date });
    
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

        if(Object.keys(this.state.open_Modal).length!==0){
            this.setState({lists:data.listsassociated});

        }

        this.setState({
            create_card_description:arr4
        })

        this.setState({
            Card_name:arr3
        })
        
        this.setState({
            open_Modal_Card:arr2
        })

        this.setState({
            open_Modal:arr1
        })

        this.setState({lists:data.listsassociated});
                
        console.log(this.state.open_Modal_Card);
        
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
        
        this.setState({
            userlist:user_list
        })
    }

    async openModal(id){
        let arr=this.state.open_Modal;
        arr[id]= true;

        this.setState({
            open_Modal: arr

        })

        console.log(this.state.open_Modal);
    }

    async closeModal(id){
        let arr=this.state.open_Modal;
        arr[id]= false;

        this.setState({
            open_Modal: arr

        })

        console.log(this.state.open_Modal);
    }

    async setCardData(card_id){

        const card= await axios.get('http://127.0.0.1:8000/api/cardData/'+card_id, {withCredentials:true}).then(console.log("done"));

        console.log(card);

        this.setState({card_name: card.data.Card_name});
        this.setState({card_desc: card.data.description});

        const users=card.data.assigned;

        let user_list=[];
        
        for(let u in users){
            // console.log(u);
            // let dict = {};
            // dict["key"] = users[u]["id"];
            // dict["value"] = users[u]["id"];
            // dict["label"] = users[u]["User_name"];
            // dict["text"] = users[u]["User_name"];

            user_list.push(users[u]["id"]);
        }

        
        this.setState({
            card_assign:user_list
        })
        

    }

    async openModalCard(list_id, card_id){
        await this.setCardData(card_id);
        let arr=this.state.open_Modal_Card;
        arr[list_id][card_id]= true;

        this.setState({
            open_Modal_Card: arr

        })

        console.log(this.state.open_Modal_Card);

    }
    
    async closeModalCard(list_id, card_id){
        let arr=this.state.open_Modal_Card;
        arr[list_id][card_id]= false;

        this.setState({
            open_Modal_Card: arr

        })

        console.log(this.state.open_Modal_Card);

        await this.componentDidMount();
            let arr1=this.state.open_Modal;
            arr1[list_id]=true
            this.setState({
                open_Modal:arr1

            })

    }

    async handleAssignedMemberChange(event , data, list_id){

        let arr=this.state.assigned;
        arr[list_id]= data.value;

        this.setState({
            assigned:arr
        })

        console.log(this.state.assigned[list_id]);

    }

    async handleDescriptionChange(event, list_id){

        let arr= this.state.create_card_description;
        arr[list_id]=event.target.value;

        this.setState({
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
            alert("you cannot create a card here, you are not a member of this project")
        })

        console.log(response);

        console.log(this.state.open_Modal[list_id])

        if(this.state.open_Modal[list_id]===true){
            console.log("hello")
            await this.componentDidMount();
            let arr1=this.state.open_Modal;
            arr1[list_id]=true
            this.setState({
                open_Modal:arr1

            })
        }
        else{
            await this.componentDidMount();
        }

    }

    async deleteCard(list_id, card_id){
        const response= await axios({url:'http://127.0.0.1:8000/api/card/'+card_id+'/' ,
        method:'DELETE', 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("you cannot delete a card here, you are not a member of this project")
        })

        console.log(response);

        if(this.state.open_Modal[list_id]===true){
            console.log("hello")
            await this.componentDidMount();
            let arr1=this.state.open_Modal;
            arr1[list_id]=true
            this.setState({
                open_Modal:arr1

            })
        }
        
        else{
            await this.componentDidMount();
        }

        this.setState({
            deletecard:false
        })
        
    }

    notDeleteList= ()=>{
        this.setState({
            deletelist:false
        })

    }

    notDeleteCard=()=>{
        this.setState({
            deletecard:false
        })

    }
        
    // close = () => this.setState({ open: false })

    // async DeleteList(list_id){
    //     this.setState({
    //         deletelist:false
    //     })

    //     const response= await axios({url:'http://127.0.0.1:8000/api/list/'+list_id+'/' ,
    //     method:'DELETE', 
    //     withCredentials:true, 
    //     headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
    //     .then(console.log("done"))
    //     .catch(err => {
    //         console.log(err)
    //     })

    //     console.log(response);


    // }

    async deleteList(list_id){

        console.log("deleting")

        const response= await axios({url:'http://127.0.0.1:8000/api/list/'+list_id+'/' ,
        method:'DELETE', 
        withCredentials:true, 
        headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get("csrftoken") }})
        .then(console.log("done"))
        .catch(err => {
            alert("you are not a member of this project, you cannot delete a list here")
        })

        console.log(response);

        await this.componentDidMount();

        this.setState({
            deletelist:false
        })

    }

    createMarkup(content){
        return {__html: content};
    }

    handleOpenClose_settings (){
        this.setState({ setting_modal: !this.state.setting_modal });
        if(!this.state.setting_modal){
            this.componentDidMount();
        }
    };

    async handleCardNameChange(event){
        this.setState({
            card_name: event.target.value
        });


    }

    async handleCardDescChange(event){
        this.setState({
            card_desc: event.target.value
        });

    }

    async handleCardAssignChange(event , data){
        
        this.setState({
            card_assign: data.value
        });
       
    }

    async editCardAssign(card_id){
        let formData = {
            
            "assigned": this.state.card_assign
            
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/card/'+card_id+"/" ,
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

    async editCardName(card_id){

        let formData = {
            
            "Card_name": this.state.card_name
            
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/card/'+card_id+"/" ,
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

    async editCardDesc(card_id){
        let formData = {
            
            "description": this.state.card_desc
            
        }

        console.log(formData);

        const response= await axios({url:'http://127.0.0.1:8000/api/card/'+card_id+"/" ,
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
    
}
export default Project;