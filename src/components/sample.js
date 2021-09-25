import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';

class Sample extends Component{
    constructor(props){
        super(props);
        this.state = { data :[] , isDisplayed:false};
    }
    render(){
        return(
            <div>
                Hello Sample
            </div>
            // window.location.href = "http://localhost:8000/api/login/login"
            
        );
    }
        
}

Sample.defaultProps = {
    'message': "",
}

export default Sample;