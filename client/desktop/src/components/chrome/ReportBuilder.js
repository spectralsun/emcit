import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Chip from 'react-toolbox/lib/chip';

import CarForm from 'common/components/form/CarForm';
import classes from './ReportBuilder.css'

import { getReports } from 'api'
import { addFilter, removeFilter } from 'actions'


const initialFilterData = {
    car: {
        make: ''
    }
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

class ReportBuilder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterForm: null,
            filters: [],
            offsetView: 0
        }
    }

    componentWillMount() {
        this.getReports();
    }

    componentDidUpdate() {
        const node = findDOMNode(this.chipBar)
        const offsetView = node.clientHeight - 40
        if (node.clientHeight > 40 && this.state.offsetView !== offsetView) {
            this.setState({ offsetView })
        } else if (node.clientHeight === 40 && this.state.offsetView !== 0) {
            this.setState({ offsetView: 0 })
        }
    }

    getReports() {
        this.props.getReports(this.state.filters.map(f => {
            const filter = {entity: f.type, values:{}}
            const filterSchema = {
                Vehicle: ({ make, model, color, license_plate }) =>
                        [make, model, color, license_plate].filter(v => !!v).forEach(v => { filter.values[v] = v })
            }
            filterSchema[f.type](f);
            return filter;
        }))
    }

    handleFilterSubmit(filter) {
        const filters = this.state.filters.concat(filter)
        this.setState({ filterForm: null, filters }, this.getReports);
    }

    handleDeleteFilter(filter) {
        const filters = this.state.filters.filter(f => f !== filter);
        this.setState({ filters }, this.getReports)
    }

    setFormData(key, value) {
        const { filterFormData } = this.state;
        filterFormData[key] = value;
        this.setState({ filterFormData });
    }

    getChipText(filter) {
        const formatters = {
            Vehicle: ({ make, model, color, license_plate }) =>
                [color, make, model].filter(v => !!v).map(capitalize).concat(license_plate ? license_plate.toUpperCase() : []).join(' ')
        }
        return formatters[filter.type](filter);
    }

    renderForm() {
        return (
            <CarForm onSubmit={this.handleFilterSubmit.bind(this)} />
        )
    }

    render() {
        const { filterForm, filters } = this.state;
        const viewStyle = { marginTop: this.state.offsetView }
        return (
            <div className={classes.reportBuilder}>
                <div className={classes.chipBar} ref={c => this.chipBar = c}>
                    {filters.map((filter, idx) => (
                        <Chip className={classes.chip} deletable onDeleteClick={e => this.handleDeleteFilter(filter)}>
                            {this.getChipText(filter)}
                        </Chip>
                    ))}
                </div>
                <div className={classes.filters}>
                    { !filterForm &&
                        <div>
                            <h3>Filter Reports</h3>
                            <Button
                              label='Add Car'
                              raised
                              primary
                              onClick={e => this.setState({ filterForm: 'car' }) } />
                        </div>
                    }
                    { filterForm &&
                        this.renderForm()
                    }
                </div>
                <div className={classes.reportView} style={viewStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ filters }) => ({ filters });

export default connect(mapStateToProps, {
    getReports,
})(ReportBuilder);
