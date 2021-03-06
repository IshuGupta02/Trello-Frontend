import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from './../components/sidebar'
import { Button, Card, Image, Segment, Tab, Icon, Header } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import ReactHover from 'react-hover'

class Dashboard extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
        error:false,
        data:{},
        done1:false
        };
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

        const panes = [
            {
              menuItem: 'Projects',
              render: () => <Tab.Pane attached={false}>

              {
                  (this.state.done1)?(

                    <Card.Group>
                        {
                            this.state.data.member.map((project)=>{
                                return (
                                    <Card key={project.id} onClick={()=>{window.location.href='../project?id='+project.id}}>
                                        <Card.Content>
                                            
                                            <Card.Header>{project.Project_name}</Card.Header>
                                            <br/>
                                            
                                            <Card.Meta>
                                             

                                            {
                                                project.members.map((user)=>{

                                                    return(
                                                        
                                                        <Avatar key={user.id} name={user.User_name} size="30" round={true} />

                                                    );
                                                    

                                                })

                                            }
                                           
                                             </Card.Meta>
                                            <Card.Description>
                                            WIKI: <div dangerouslySetInnerHTML={this.createMarkup(project.wiki)} />

                                            </Card.Description>
                                        </Card.Content>
                                        
                                        </Card>                                   
                                    
                                );
                            })

                        }

                    </Card.Group>

                      
                  ):("loading")
              }              

              </Tab.Pane>,
            },
            {
              menuItem: 'Assigned Cards',
              render: () => <Tab.Pane attached={false}>

                {
                    (this.state.done1)?(

                        <Card.Group>
                            {
                                this.state.data.mycards.map((card)=>{
                                return (

                                    <Card key={card.id}>
                                        <Card.Content>
                                            
                                            <Card.Header>{card.Card_name}</Card.Header>

                                            <br/>
                                            
                                            <Card.Meta>

                                            {
                                                card.assigned.map((user)=>{

                                                    return(
                                                        
                                                        <Avatar key={user.id} name={user.User_name} size="30" round={true} />

                                                    );
                                                })
                                            }
                                                </Card.Meta>
                                                <br/>

                                                <Card.Meta >
                                                
                                                Project: {card.List.Project.Project_name}
                                                <Icon name='arrow alternate circle right' onClick={()=>{window.location.href='../project?id='+card.List.Project.id}}/>

                                                </Card.Meta>

                                                <Card.Meta>
                                                List: {card.List.List_name}
                                                </Card.Meta>

                                                

                                            <Card.Description>
                                            
                                            Description:
                                            {card.description}

                                            </Card.Description>
                                        </Card.Content>

                                        </Card>  
                                )
                                })


                            }

                        </Card.Group>

                        
                    ):("loading")
                }



              </Tab.Pane>,
            },
            
        ]

        return(
            <div style={mystyle}>
                <SideBar/>

                <div style={{width:'90vw'}}>

                <Segment inverted fluid style={Removemargin}>

                <Header as='h3' style={header}>

                TRELLO
                    
                </Header>

                </Segment>

                <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:'90vw'}}/>

                </div>

            
                
            </div>

            
        );
    }

    async componentDidMount(){

        const user1= await axios.get('http://127.0.0.1:8000/api/user/info/', {withCredentials:true}).then(console.log("done"));
        console.log(user1.data);
        console.log(user1.data.profile);

        this.setState({
            data: user1.data
        })

        this.setState({
            done1: true
        })
        
    }

    createMarkup(content){
        return {__html: content};
    }
        
}

    

Dashboard.defaultProps = {
    
}

export default Dashboard;





            


            