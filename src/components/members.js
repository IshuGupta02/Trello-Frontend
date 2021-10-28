import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import SideBar from './../components/sidebar'
import { Button, Card, Image, Segment, Header } from 'semantic-ui-react'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Members extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            users:[],
            done: false,
            isAdmin:false
        };
        this.changeEnable = this.changeEnable.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
    }

    render(){

        const header= {
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            // margin:'0'
        }

        const Removemargin={
            margin:'0'
        }


        const mystyle = {
            display: "flex",
            flexDirection: "row",
        };

        const style1={
            // display: "flex",
            // flexDirection: "column",
            // flexWrap: "wrap"
        };
        const card={
            // height:'400px'

        }

        const buttons={
            height:'45px'

        }

        const projectList={
            display: 'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-between',
            // alignContent:'stretch'
            // flexBasis:'20px'
        }

        const projectStyle={
            width:'95%',
            margin:'1%',            
            overflow: 'scroll',
            
            
        }

        return(

            
            <div style={mystyle}>

            <SideBar/>

            <div style={{width:'90vw'}}>

                <Segment inverted fluid style={Removemargin}>

                <Header as='h3' style={header}>

                TRELLO
                    
                </Header>

                </Segment>

                <br/>
            

            <Card.Group sytle={style1}>
                {
                    this.state.users.map((user)=>{
                        return (
                            <Card key={user.id} style={card} color={(user.enabled)?('green'):('red')} raised={user.admin}>
                                <Card.Content>

                                {
                            
                                    (user.profile!=null)?(<Image 
                                    floated='right'
                                    size='tiny' 
                                    src={`http://channeli.in/${user.profile.substring(21)}`}/>):
                                    (<Image 
                                    floated='right'
                                    size='tiny'
                                    src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />)
                            
                                }

                                    {/* <Image
                                    floated='right'
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                    /> */}
                                    <Card.Header>{user.User_name}</Card.Header>
                                    <Card.Meta>{user.enrollment_no}</Card.Meta>
                                    <Card.Meta style={{overflow:'scroll'}}>{user.email} </Card.Meta>

                                    <Card.Description>
                                    Projects:
                                    <Segment style={projectList}>

                                    {
                                        
                                        user.member.map((project)=>{
                                            return(
                                                <Button style={ projectStyle} size='small' key={project.id} onClick={()=>{window.location.href='../project?id='+project.id}}>
                                                {project.Project_name}
                                                </Button>                                              
                                                
                                            );
                                        })

                                    }

                                    </Segment>                                   
                                    
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra >
                                    <div className='ui two buttons' style={buttons}>

                                    {(user.enabled===true)?(<Button color='red' onClick={()=> this.changeEnable(user.id, user.enabled, user.admin)} disabled={!this.state.isAdmin}> Disable </Button>):(<Button  disabled={!this.state.isAdmin} color='green' onClick={()=> this.changeEnable(user.id, user.enabled, user.admin)}> Enable </Button>)}

                                    {(user.admin===true)?(<Button color='red' onClick={()=> this.changeAdmin(user.id, user.enabled, user.admin)}  disabled={!this.state.isAdmin}> Remove from admin </Button>):(<Button  disabled={!this.state.isAdmin} color='green' onClick={()=> this.changeAdmin(user.id, user.enabled, user.admin)}> Make Admin </Button>)}
                                    
                                    </div>
                                </Card.Content>
                                </Card>                                   
                            
                        );
                    })

                }

                              
                
            </Card.Group>

            </div>
                
            
            </div>
        );
    }

    async componentDidMount(){

        const users_data= await axios.get('http://127.0.0.1:8000/api/user/', {withCredentials:true}).then(console.log("done"));

        const my_data= await axios.get('http://127.0.0.1:8000/api/user/info/', {withCredentials:true}).then(console.log("done"));

        console.log(my_data);
        

        console.log(users_data.data);

        this.setState({
            users: users_data.data
        });

        this.setState({
            done:true
        });

        this.setState({
            isAdmin:my_data.data.admin
        })
        
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

        this.setState({
            users: users_data.data
        });

        this.setState({
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



