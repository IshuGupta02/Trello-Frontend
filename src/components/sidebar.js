import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, Image, Menu, Segment, Sidebar , Accordion} from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class SideBar extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
            projectlist_dict:[],
            loggedIn1:false,
            visible:false,
            visible1:true,
            activeIndex:-1
            
        };
    }

    // renderRedirect= () =>{
    //     if(this.state.loggedIn1===true)
    //     {
    //         alert("you are not logged in");
    //         return <Redirect to={{pathname:'../'}}/>
    //     }
    // }

    render(){
        return(
          
            <div style={{minHeight:'100vh', width:'10vw'}}>

            <Sidebar.Pushable as={Segment} style={{minHeight:'100vh', width:'100%'}}>
                <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                visible= {this.state.visible1}
                inverted
                vertical
                style={{width:'100%'}}
                >

                {/* <Menu.Item onClick={()=>{this.setState({visible1: false})}} style={{width:'10vw'}}>
                    <Icon name='arrow left' />
                </Menu.Item> */}

                <Menu.Item onClick={()=>{window.location.href='../logout'}} style={{width:'100%'}}>
                    <Icon name='arrow circle left' size='mini' />
                    Logout
                </Menu.Item>

                <Menu.Item as={Link} to="../dashboard" style={{width:'100%'}}>
                    <Icon name='user' size='mini'/>
                    Dashboard
                </Menu.Item>
                <Menu.Item as={Link} to="../members" style={{width:'100%'}}>
                    <Icon name='users' size='mini' />
                    Members
                </Menu.Item>
                
                {/* <Menu.Item as='a' onClick={()=>{this.setState({visible: !this.state.visible})}} style={{width:'10vw'}}>
                    <Icon name='unordered list' size='mini'/>
                    Projects

                </Menu.Item> */}

                {/* <Menu.Item onClick={()=>{this.setState({visible: !this.state.visible})}} style={{width:'10vw'}}> */}
                <Accordion inverted>

                <Accordion.Title
                active={this.state.activeIndex === 0}
                index={0}
                onClick={this.handleClick}
                >
                {/* <Icon name='unordered list' size='big'/>
                <br/>
                Projects */}

                <Menu.Item as='a' onClick={()=>{this.setState({visible: !this.state.visible})}} style={{width:'100%'}}>
                    <Icon name='unordered list' size='mini'/>
                    Projects

                </Menu.Item>
                
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 0}>
                {
                     this.state.projectlist_dict.map(function(proj){
                         return (
                            <Menu.Item link key={proj.id} onClick={() => window.location.href='../project?id='+proj.id}>
                                {proj.name}
                            </Menu.Item>
                         );
                     })
                }
                </Accordion.Content>

                </Accordion>

                {/* </Menu.Item> */}


                {/* <Sidebar.Pushable as={Segment} style={{ maxHeight: '50vh', width:'10vw'}} >
                        <Sidebar
                        as={Menu}
                        animation='scale down'
                        icon='labeled'
                        visible
                        inverted
                        vertical
                        width='thin'
                        >


                    {
                     this.state.projectlist_dict.map(function(proj){
                         return (
                            <Menu.Item link key={proj.id} onClick={() => window.location.href='../project?id='+proj.id}>
                                {proj.name}
                            </Menu.Item>
                         );
                     })
                    }  

                    </Sidebar>                       

                </Sidebar.Pushable> */}

                <Menu.Item as={Link} to="/new" style={{position:'fixed', bottom:'0px'}} style={{width:'100%'}} >

                {/* style={{bottom: '0', position:'sticky'}} */}
                    <Icon name='add' size='mini'/>
                    New project
                </Menu.Item>

                </Sidebar>

                <Sidebar.Pusher>
                    <Segment>

                        <Menu.Item color="black" onClick={()=>{this.setState({visible1: !this.state.visible1})}} style={{width:'100%'}}>
                            <Icon name='arrow right' size='mini' />
                        </Menu.Item>
                        
                    </Segment>
                </Sidebar.Pusher>

            </Sidebar.Pushable>

            </div>
            
        );
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

    async componentDidMount(){

        const response= await axios({url:'http://127.0.0.1:8000/api/check/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        console.log(this.state.loggedIn1);

        if(response.status==202){

            if(response.data['loggedin']==true){
                await this.setState({loggedIn1 : true});
            }
            else{
                alert("you are not logged in");
                window.location.href = "http://localhost:3000/"
            }
        }
        else{
            alert("you are not logged in");
            window.location.href = "http://localhost:3000/"

        }

        console.log(this.state.loggedIn1);

        if(this.state.loggedIn1==true){

            const projects= await axios({url:'http://127.0.0.1:8000/api/project/' ,method:'GET', withCredentials:true} ).then(console.log("done"));

        
            await this.setState({projectlist:projects.data});
            // console.log(this.state.projectlist);
            var ProjectDict = []; 
            for(var key in this.state.projectlist){
            
                ProjectDict.push({
                    id:   this.state.projectlist[key]['id'],
                    name: this.state.projectlist[key]['Project_name'],
                });
            }
    
            // console.log(ProjectDict)
            await this.setState({projectlist_dict:ProjectDict});

        }
        

    }
        
}

SideBar.defaultProps = {
    'message': "",
}

export default SideBar;