import React from 'react'
import { connect } from 'react-redux'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';

import { capitalize } from 'common/util';
import { Person, Vehicle } from 'c/report';
import { getReports } from 'api';


const ReportTablePage = ({ list }) => (
    <Table selectable={false}>
        <TableHead>
            <TableCell>Created At</TableCell>
            <TableCell>Vehicle(s)</TableCell>
            <TableCell>Suspicious Person(s)</TableCell>
            <TableCell>Victim(s)</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Room Number</TableCell>
        </TableHead>
        {list.map(({ date, vehicles, people, location, room_number }, idx) => (
            <TableRow key={idx}>
                <TableCell>{date}</TableCell>
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

export default connect(({ reports: list }) => ({ list }))(ReportTablePage);
