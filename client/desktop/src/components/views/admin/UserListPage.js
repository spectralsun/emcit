import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';

import { getUsers } from 'api';


@connect(({ users }) => ({ users }), { getUsers })
export default class UserListPage extends React.Component {

    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        return (
            <Table selectable={false}>
                <TableHead>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                </TableHead>
                {this.props.users.map((user, idx) => (
                    <TableRow key={idx}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                        <TableCell>{user.role}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}
