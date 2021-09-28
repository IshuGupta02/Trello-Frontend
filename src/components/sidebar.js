import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

class SideBar extends Component{
    constructor(props)
    {
        super(props);
        this.state = { 
            projectlist_dict:[],
        };
    }

    render(){
        return(
            <div>
                <div>
                    DashBoard
                </div>
                <div>
                    Members
                </div>
                <div>
                    projects

                    {
                    this.state.projectlist_dict.map(function(proj){
                        return (
                            <button key={proj.id} onClick={() => 
                             window.location.href='../project?'+proj.id}> {proj.name}</button>
                        );
                    })
                    }   
                </div>

                <div>
                    Create Project
                </div>
                
            </div>
            
        );
    }

    async componentDidMount(){

        const projects= await axios({url:'http://127.0.0.1:8000/api/project/' ,method:'GET', withCredentials:true} ).then(console.log("done"));

        
        await this.setState({projectlist:projects.data});
        // console.log(this.state.projectlist);
        var ProjectDict = []; 
        for(var key in this.state.projectlist){
            // console.log(this.state.projectlist[key]);

            // console.log(this.state.projectlist[key]['id']);
            // console.log(this.state.projectlist[key]['Project_name']);
            ProjectDict.push({
                id:   this.state.projectlist[key]['id'],
                name: this.state.projectlist[key]['Project_name'],
            });
        }

        // console.log(ProjectDict)
        await this.setState({projectlist_dict:ProjectDict});

        // console.log(this.state.projectlist_dict)
        // console.log(user1["isAdmin"]);

    }
        
}

SideBar.defaultProps = {
    'message': "",
}

export default SideBar;