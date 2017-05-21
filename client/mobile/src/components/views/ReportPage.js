import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from "react-toolbox/lib/button";

import { withRequests } from 'common/util';
import { PageContainer } from 'c/chrome';
import { ReportForm } from 'c/report';
import { createReport } from 'api';
import { resetReport } from 'actions';
import classes from './ReportPage.css';


@withRequests
@connect(({ report, geo }) => ({ report, geo }), { createReport, resetReport })
export default class ReportPage extends Component {
    state = {
        success: false,
        sending: false,
        error: ''
    };

    componentWillMount() {
        this.props.observeRequest(createReport, {
            start: () => this.setState({ sending: true }),
            end: () => this.setState({ success: true }),
            finally: () => this.setState({ sending: false })
        });
    }

    handleFormSubmit = e => {
        const { report, geo: { address, search, position }} = this.props;
        const data = report.merge({
            date: report.date.getTime(),
            location: address || search,
            geo_latitude: position ? position.lat : undefined,
            geo_longitude: position ? position.lng : undefined
        });
        this.props.createReport({ data });
    };

    handleReset = e => this.setState({ success: false }, this.props.resetReport);

    render() {
        if (this.state.success) {
            return (
                <PageContainer className={classes.thanksPage}>
                    <h1>Thanks for submitting a report</h1>
                    <p>Every bit of information helps free sex trafficing victims.</p>
                    <Button
                      primary
                      raised
                      onClick={this.handleReset}
                      icon='refresh'
                      label='File another report'
                    />
                </PageContainer>
            );
        }
        const { sending } = this.state;
        return (
            <PageContainer className={classes.reportPage}>
                {sending && <h1>Submitting report, please wait</h1>}
                {!sending && <ReportForm onSubmit={this.handleFormSubmit} />}
            </PageContainer>
        )
    }
}
