import React, {Component} from 'react';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';

class HomePage extends Component{

    render(){
        return(
            <div>
                <a href="https://internet.channeli.in/oauth/authorise/?client_id=z1T5401eydvctrKve1qOJpYBGdTrWSaMZWhAe98j&redirect_uri=http://127.0.0.1:3000/login&state=done">Login with Omniport</a>

            </div>
            
            

//             /oauth/authorise/?client_id=MY_CLIENT_ID
//   <&redirect_uri=REDIRECT_URI>
//   <&state=RANDOM_STATE_STRING>

        );
    }
}

export default HomePage;



 