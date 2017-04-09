import React, {Component} from 'react';
import {ReportForm} from './ReportForm';

import classes from './ReportContainer.css'

export class ReportContainer extends Component {

    constructor() {
        super();
        this.state = {
            submitted: false,
            loading: false,
            error: ''
        };
    }

    onFormSubmit(state){

        console.log(state);

        this.setState({loading: true})
        setTimeout(() => this.setState({loading: false, submitted: true}), 1000)
    }

    render() {
        if (this.state.submitted) {
            return (<div>thanks for submitting!!</div> )
        } else {
            return ( <ReportForm loading={this.state.loading} onSubmit={this.onFormSubmit.bind(this)} /> )
        }
    }
}
