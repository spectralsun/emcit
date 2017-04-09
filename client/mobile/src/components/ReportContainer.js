import React, {Component} from 'react';
import {ReportForm} from './ReportForm';
import { connect } from 'react-redux'
import { createReport } from '../api';
import classes from './ReportContainer.css';

const exists = v => !!v;

class ReportContainer extends Component {

    constructor() {
        super();

        this.state = {
            submitted: false,
            loading: false,
            error: ''
        };

        this.onFormSubmit = state => {
            this.setState({ loading: true });

            this.props.createReport(Object.assign({}, state, {
                date: state.date.getTime(),
                people: state.people.filter(exists),
                vehicles: state.vehicles.filter(exists)
            }));
        };
    }

    render() {
        if (this.props.report) {
            return (<div>thanks for submitting!!</div> )
        } else {
            return ( <ReportForm loading={this.state.loading} onSubmit={this.onFormSubmit}/> )
        }
    }
}

const mapStateToProps = ({ report }) => ({ report });
const mapDispatchToProps = { createReport };

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
