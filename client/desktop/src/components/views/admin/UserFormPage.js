import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';

import { withRequests } from 'common/util';
import FormErrors from 'common/components/form/FormErrors';
import { user_roles } from 'common/consts';
import { Form } from 'common_form';
import { getUser, createUser, updateUser } from 'api';
import { observeRequest } from 'common/util';

import classes from './UserFormPage.css';

@withRequests
class UserFormPage extends React.Component {
    state = {
        username: '',
        password: '',
        role: '',
        error: {}
    }

    componentDidMount() {
        const { id } = this.props;
        if (id) {
            this.props.getUser({ id });
        }
    }

    componentWillReceiveProps({ user }) {
        if (this.props.user !== user && user) {
            const { name, username, phone_number, role } = user;
            this.setState({ name, username, phone_number, role });
        }
        this.props.observeRequest([createUser, updateUser], {
            end: () => this.props.router.push('/users'),
            error: error => this.setState({ error })
        });
    }

    handleSubmit = () => {
        const { id } = this.props;
        const { username, password, role } = this.state;
        const data = { username, password, role };
        id ? this.props.updateUser({ id, data }) : this.props.createUser({ data });
    }

    render() {
        const { id } = this.props;
        const { error } = this.state;
        if (id && !this.props.user) {
            return <div className={classes.userFormPage}><h1>Loading User...</h1></div>;
        }
        return (
            <Form onSubmit={this.handleSubmit} className={classes.userFormPage}>
                <h1>{id ? 'Edit' : 'Add'} User</h1>
                <FormErrors errors={error.form} />
                <Input
                  type='text'
                  label='Username'
                  name='username'
                  value={this.state.username}
                  error={error.username && error.username.join('\r\n')}
                  onChange={username => this.setState({ username })}
                />
                <Input
                  type='password'
                  label='Password'
                  name='password'
                  value={this.state.password}
                  error={error.password && error.password.join('\r\n')}
                  onChange={password => this.setState({ password })}
                />
                <Dropdown
                  allowBlank
                  label="Role"
                  source={user_roles}
                  value={this.state.role}
                  error={error.role && error.role.join('\r\n')}
                  onChange={role => this.setState({ role })}
                />
                <Button type='submit' raised primary>
                    { !id ? 'Add User' : 'Update User' }
                </Button>
            </Form>
        )
    }
}

export const CreateUserPage = connect(
    ({ request }) => ({ request, id: null }),
    { getUser, createUser, updateUser }
)(withRouter(UserFormPage));

export const UpdateUserPage = connect(
    ({ user, request }, { params: { id } }) => ({ user, request, id }),
    { getUser, createUser, updateUser }
)(withRouter(UserFormPage));
