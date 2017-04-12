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


class UserFormPage extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        phone_number: '',
        role: ''
    }

    componentDidMount() {
        if (this.props.id) {
            this.props.getUser(this.props.id);
        }
    }

    componentWillReceiveProps({ user, request: { started, symbol } }) {
        if (user) {
            const { name, email, phone_number, role } = user;
            this.setState({ name, email, phone_number, role });
        }
        if (this.props.request.started && !started &&
                [createUser.symbol, updateUser.symbol].includes(symbol)) {
            this.props.router.push('/users');
        }
    }

    handleSubmit = e => {
        const { createUser, updateUser, id } = this.props;
        const { name, email, password, phone_number, role } = this.state;
        const data = { name, email, password, phone_number, role };
        id ? createUser(data) : updateUser(id, data);
    }

    render() {
        const { id } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormErrors errors={this.state.errors} />
                <Input
                  type='text'
                  label='Name'
                  name='name'
                  value={this.state.name}
                  onChange={name => this.setState({ name })}
                />
                <Input
                  type='email'
                  label='Email'
                  name='email'
                  value={this.state.email}
                  onChange={email => this.setState({ email })}
                />
                <Input
                  type='password'
                  label='Password'
                  name='password'
                  value={this.state.password}
                  onChange={password => this.setState({ password })}
                />
                <Input
                  type='text'
                  label='Phone'
                  name='phone'
                  value={this.state.phone_number}
                  onChange={phone_number => this.setState({ phone_number })}
                />
                <Dropdown
                  allowBlank
                  label="Role"
                  source={user_roles}
                  value={this.state.role}
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
