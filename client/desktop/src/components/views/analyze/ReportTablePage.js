import React from 'react'
import { connect } from 'react-redux'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';
import { Link } from 'react-router';

import { capitalize } from 'common/util';
import { Person, Vehicle } from 'c/report';
import { getReports } from 'api';


@connect(({ reports: list }) => ({ list }))
export default class ReportTablePage extends React.Component {
    render = () => (
        <Table selectable={false}>
            <TableHead>
                <TableCell>Created At</TableCell>
                <TableCell>Vehicle(s)</TableCell>
                <TableCell>Suspicious Person(s)</TableCell>
                <TableCell>Victim(s)</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Room Number</TableCell>
            </TableHead>
            {this.props.list.map(({ id, date, vehicles, people, location, room_number }, idx) => (
                <TableRow key={idx}>
                    <TableCell><Link to={`/reports/details/${id}`}>{date}</Link></TableCell>
                    <TableCell>
                        {vehicles.map((vehicle, key) =>
                            <Vehicle key={key} {...vehicle} />
                        )}
                    </TableCell>
                    <TableCell>
                        {people.filter(p => p.category === 'victim').map((person, key) =>
                            <Person key={key} {...person} />
                        )}
                    </TableCell>
                    <TableCell>
                        {people.filter(p => ['suspicious_person', 'buyer'].includes(p.category)).map((person, key) =>
                            <Person key={key} {...person} />
                        )}
                    </TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{room_number}</TableCell>
                </TableRow>
            ))}
        </Table>
    );
}
