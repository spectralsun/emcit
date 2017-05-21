import React from 'react'
import {connect} from 'react-redux'
import {getReport} from 'api';

@connect(({report}) => ({report}), {getReport})
export default class ReportDetailPage extends React.Component {
    componentDidMount() {
        const {getReport, id} = this.props;
        getReport(id)
    }

    render = () => (
        <div>{this.props.report}</div>
    );
}
