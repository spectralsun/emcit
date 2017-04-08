import React, {Component} from "react";
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import classes from './LoginPage.css'


export class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    };


    render() {

        return (
            <div className={classes.loginPage}>
                <div className={classes.loginBox}>
                    <form onSubmit={this.onSubmit.bind(this)} className="loginForm">
                        <h2>Emerald Citizen Login</h2>
                        <Input
                            value={this.state.email}
                            className='email'
                            type="email"
                            label='Email'
                            onChange={email => this.setState({email})}/>
                        <Input
                            value={this.state.password}
                            className='password'
                            type="password"
                            label='Password'
                            onChange={password => this.setState({password})}/>
                        <Button className='submitButton' type='submit' raised primary>Submit</Button>
                    </form>

                </div>
            </div>
        );
    }
}
