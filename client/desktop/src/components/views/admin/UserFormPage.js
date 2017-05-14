import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';

import FormErrors from 'common/components/form/FormErrors';
import { user_roles } from 'common/consts';
import { Form } from 'common_form';
import { getUser, createUser, updateUser } from 'api';
import { checkRequest } from 'common/util';

import classes from './UserFormPage.css';


class UserFormPage extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        phone_number: '',
        role: '',
        error: {}
    }

    componentDidMount() {
        const { id } = this.props;
        if (id) {
            this.props.getUser({ id });
        }
    }

    componentWillReceiveProps({ user, request }) {
        if (this.props.user !== user && user) {
            const { name, email, phone_number, role } = user;
            this.setState({ name, email, phone_number, role });
        }
        checkRequest(this.props.request, request, [createUser, updateUser], {
            end: () => this.props.router.push('/users'),
            error: error => this.setState({ error })
        });
    }

    handleSubmit = e => {
        const { id } = this.props;
        const { name, email, password, phone_number, role } = this.state;
        const data = { name, email, password, phone_number, role };
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
                  label='Name'
                  name='name'
                  value={this.state.name}
                  error={error.name && error.name.join('\r\n')}
                  onChange={name => this.setState({ name })}
                />
                <Input
                  type='email'
                  label='Email'
                  name='email'
                  value={this.state.email}
                  error={error.email && error.email.join('\r\n')}
                  onChange={email => this.setState({ email })}
                />
                <Input
                  type='password'
                  label='Password'
                  name='password'
                  value={this.state.password}
                  error={error.password && error.password.join('\r\n')}
                  onChange={password => this.setState({ password })}
                />
                <Input
                  type='text'
                  label='Phone'
                  name='phone'
                  value={this.state.phone_number}
                  error={error.phone_number && error.phone_number.join('\r\n')}
                  onChange={phone_number => this.setState({ phone_number })}
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
