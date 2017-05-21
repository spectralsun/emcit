import React from 'react'
import {connect} from 'react-redux'
import {getReport} from 'api';
import {contains} from 'lodash';

@connect(({reportDetails}, {params}) => ({reportDetails, id: params.id}), {getReport})
export default class ReportDetailsPage extends React.Component {
    componentDidMount() {
        const {getReport, id} = this.props;
        getReport({id});
    }

    // fields that are more for database consistency
    confusingFields = ["created_at", "updated", "report_id"]

    filterNulls = (key, value) => {
        if (!this.confusingFields.includes(key) && value || value === false) {
            return value;
        }
    }

    render = () => {
        const {reportDetails} = this.props;

        if (!reportDetails) {
            return (<div>Loading</div>)
        }
        return (
            <div>
                <h1>Report Id: {reportDetails.id}</h1>
                <h3>Incident Date: {new Date(reportDetails.date).toLocaleString()}</h3>
                <h5>Date Reported: {new Date(reportDetails.created_at).toLocaleString()}</h5>
                <pre>{JSON.stringify(reportDetails, this.filterNulls, 4)}</pre>
            </div>
        );
    };
}
