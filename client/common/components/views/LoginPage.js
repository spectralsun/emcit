import React from "react";
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Form, FormErrors } from '../form';
import { loginUser } from 'common/api';
import { withRequests } from 'common/util';

import classes from './LoginPage.css'


@withRouter
@withRequests
@connect(null, { loginUser })
export default class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
        error: {}
    };

    componentWillMount() {
        this.props.observeRequest(loginUser, {
            end: () => this.props.router.push('/'),
            error: error => this.setState({ error })
        });
    }

    onSubmit = e => {
        this.setState({ error: {} });
        const { email, password } = this.state;
        this.props.loginUser({ data: { email, password }});
    }

    render() {
        const { error } = this.state;
        return (
            <Form onSubmit={this.onSubmit} className={classes.loginPage}>
                <div className={classes.logo}>
                    <img src='/static/EmeraldCitizen.svg' alt='Emerald Citizen logo'/>
                </div>
                <FormErrors errors={error.form} />
                <Input
                  value={this.state.email}
                  className='email'
                  type='email'
                  label='Email'
                  error={error.email && error.email.join('\r\n')}
                  onChange={email => this.setState({email})}
                />
                <Input
                  value={this.state.password}
                  className='password'
                  type='password'
                  label='Password'
                  error={error.password && error.password.join('\r\n')}
                  onChange={password => this.setState({password})}
                />
                <Button type='submit' raised primary>Login</Button>
            </Form>
        );
    }
}
