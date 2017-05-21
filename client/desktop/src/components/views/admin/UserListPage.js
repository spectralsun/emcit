import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';

import { getUsers } from 'api';

class UserListPage extends React.Component {

    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        return (
            <Table selectable={false}>
                <TableHead>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                </TableHead>
                {this.props.users.map((user, idx) => (
                    <TableRow key={idx}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, {
    getUsers
})(UserListPage);
