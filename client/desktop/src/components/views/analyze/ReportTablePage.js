import React from 'react'
import { connect } from 'react-redux'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';

import { getReports } from 'api';


const ReportModel = {
    date: { type: String },
    location: { type: String },
    room_number: { type: String }
}

class ReportTablePage extends React.Component {

    componentWillMount() {
    }

    renderVehicle(vehicle) {
        return (
            <div>
                <div>{vehicle.color} {vehicle.make} {vehicle.model}</div>
            </div>
        )
    }

    renderPerps() {
        return (
            null
        )
    }

    render() {
        return (
            <Table selectable={false}>
                <TableHead></TableHead>
                {this.props.list.map((report, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.location}</TableCell>
                        <TableCell>{report.room_number}</TableCell>
                        <TableCell>{report.vehicles.map(this.renderVehicle)}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}

const mapStateToProps = ({ reports: { list } }) => ({ list });

export default connect(mapStateToProps, {
    getReports
})(ReportTablePage);
