import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {Button, Form , Modal, Icon, Divider} from 'semantic-ui-react';

class Settings extends Component{
    constructor(props)
    {
        super(props);
        // this.state = {
        //     showModal:this.pro
        // };

    }

    // handleOpenClose_settings = () => {
    //     this.setState(prev => ({ showModal: !prev.showModal }));
    // };

    render(){
        return(
            <Modal onClose={()=>{
                this.props.method()
                               
            }}
            open={this.props.open}
            onOpen={()=>{
                this.props.method()
                
            }}
            >

            
    
            </Modal>
            
        );
    }

    async componentDidMount(){
        this.state = {
            open_modal:this.props.open
        };
           
    }
}

export default Settings;