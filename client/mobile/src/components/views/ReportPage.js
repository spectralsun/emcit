import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from "react-toolbox/lib/button";

import { exists } from 'common/util';
import { PageContainer } from 'c/chrome';
import { ReportForm } from 'c/report';
import { createReport } from 'api';
import { resetReport } from 'actions';
import classes from './ReportPage.css';

class ReportPage extends Component {
    state = {
        submitted: false,
        loading: false,
        error: ''
    };

    componentWillReceiveProps({ request: { started, symbol, error, success, data }}) {
        if (!this.props.request.started && started && symbol === createReport.symbol) {
            this.setState({ sending: true });
        }
        if (this.props.request.started && !started && symbol === createReport.symbol) {
            if (success) {
                this.setState({ submitted: true });
            }
        }
    }

    handleFormSubmit = state => this.setState({ loading: true }, () => {
        this.props.createReport(Object.assign({}, this.props.report, {
            date: this.props.report.date.getTime()
        }));
    });

    handleReset = e => {
        this.setState({ submitted: false });
        this.props.resetReport();
    }

    render() {
        if (this.state.submitted) {
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

const mapStateToProps = ({ report, request }) => ({ report, request });

export default connect(mapStateToProps, { createReport, resetReport })(ReportPage);
