import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'semantic-ui-react'

class HomePage extends Component{

    constructor(props)
    {
        super(props);
        this.state = { 
            loggedIn :false,
        };
    }

    renderRedirect= () =>{
        if(this.state.loggedIn===true)
        {
            return <Redirect to={{pathname:'../dashboard'}}/>
        }
    }

    render(){
        return(
            <div style={{height:'100vh', width:'100%', display:'flex', justifyContent:'center', 
            backgroundColor:'#D7E5EE'}
            }>
                {this.renderRedirect()}
                {/* <a href="https://internet.channeli.in/oauth/authorise/?client_id=z1T5401eydvctrKve1qOJpYBGdTrWSaMZWhAe98j&redirect_uri=http://127.0.0.1:3000/login&state=done">Login with Omniport</a> */}

                <Button style={{height:'50px', width:'500px', alignSelf:'center'}} content='Login with Omniport' icon='right arrow' labelPosition='right' primary 
                    onClick={()=>{
                        window.location.href="https://internet.channeli.in/oauth/authorise/?client_id=z1T5401eydvctrKve1qOJpYBGdTrWSaMZWhAe98j&redirect_uri=http://127.0.0.1:3000/login&state=done"
                    }}
                />

            </div>

        );
    }

    async componentDidMount(){
        
        const response= await axios({url:'http://127.0.0.1:8000/api/check/' ,method:'GET',withCredentials:true} ).then(console.log("done"));

        // console.log(response)

        if(response.status==202){

            // console.log(response.data)
            // console.log(response.data['loggedin'])
            
            if(response.data['loggedin']==true){
                this.setState({loggedIn : true});
            }
            
        }
       
    }
}

export default HomePage;



 