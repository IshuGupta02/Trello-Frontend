import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {Button, Form , Modal, Icon, Dropdown, Input, Card, Feed} from 'semantic-ui-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from 'js-cookie';
import { connection, w3cwebsocket as W3CWebSocket } from "websocket";

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Comments extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            card:this.props.card,
            list:this.props.list,
            messages:[],
            name:"",
            websock:null,
            data:[],
            comment:""
           
        };

    }

    
    // chatSocket = new WebSocket(
    //     'ws://'
    //     + '127.0.0.1:8000'
    //     + '/ws/chat/'
    //     + this.state.card
    //     + '/'
    // );

    connectSocket=()=>{
        var ws = new WebSocket('ws://127.0.1:8000/ws/chat/' + this.state.card +'/');
        this.setState({websock:ws});

        ws.onopen = () =>{
            console.error('Chat socket opened');
        };


        ws.onclose = e => {
            console.error('Chat socket closed');
        }

        ws.onmessage = e =>{
            console.log(e.data);
            let thistime = JSON.parse(e.data);
            console.log(thistime);
            var already_data = this.state.data;
            thistime.message.User.profile= "http://127.0.0.1:8000"+thistime.message.User.profile
            already_data.push(thistime.message);
            this.setState({data:already_data});
            console.log(this.state.data);
        }
    }

    render(){
        return(

            <Modal 
            onClose={()=>{
                this.props.method(this.props.list, this.props.card);
                this.state.websock.close();
            }}
            
            open={this.props.open}

            onOpen={()=>{
                this.props.method(this.props.list, this.props.card)
                               
            }}
            >

            <Card>
                <Card.Content>
                <Card.Header>Comments</Card.Header>
                </Card.Content>
                <Card.Content>
                <Feed>

                    {
                        this.state.data.map((comment)=>{
                            return(
                                <Feed.Event key={comment.id}>
                                {
                            
                                    (comment.User.profile!=null)?(<Feed.Label image={`http://channeli.in/${comment.User.profile.substring(21)}`} />):(<Feed.Label image='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>)
                                    
                                }
                                
                                <Feed.Content>
                                    <Feed.Date content={comment.date_created} />
                                    <Feed.Summary>
                                    {comment.Comment}
                                    </Feed.Summary>
                                </Feed.Content>
                                </Feed.Event>


                            );

                        })

                    }

                    <Form onSubmit={event => this.handleSubmit1(event)} size='mini' >
                
                        <Form.Group inline>

                        <Form.Field
                            required
                            // label='List name'
                            control='input'
                            value={this.state.comment} 
                            onChange={(event)=>{this.setState({
                                comment: event.target.value
                            });}}
                            inline
                        />

                        <Icon name="send" onClick={()=>{this.submitMessage()}}/>

                        </Form.Group>
            
                    </Form>               

                    
                </Feed>
                </Card.Content>
            </Card>



            </Modal>
        );
        
        }

        async submitMessage(){
            const message = this.state.comment;
            this.state.websock.send(JSON.stringify({
                'message': message,
                'card':this.state.card
                
            }));

            this.setState({
                comment:""
            })
        }

        async componentDidMount(){

            this.setState({
                card: this.props.card
            })

            this.connectSocket();

            const cardData= await axios.get('http://127.0.0.1:8000/api/cardComments/'+this.state.card+"/", {withCredentials:true}).then(console.log("done"));

            console.log(cardData)

            this.setState({
                data:cardData.data.commentsofcards
            })

            this.setState({
                name:cardData.data.Card_name
            })
           
            
        }

    }

    
export default Comments;