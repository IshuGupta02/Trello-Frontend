import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component{
    // constructor(props)
    // {
    //     super(props);
    //     this.state = { data :[],
    //     isAdmin : "False",
    //     isEnabled:"True",
    //     error:false};
    // }

    render(){
        return(
            <div>
            Hello Dashboard
            </div>
        );
    }

    async componentDidMount(){

        const user1= await axios.get('http://127.0.0.1:8000/api/user/info/', {withCredentials:true}).then(console.log("done"));
        console.log(user1.data);
        
    }
        
}

Dashboard.defaultProps = {
    'message': "",
}

export default Dashboard;