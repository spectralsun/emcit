import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Chip from 'react-toolbox/lib/chip';
import cx from 'classnames'

import { VehicleFilter, PersonFilter } from 'c/filters';
import { getReports } from 'api';
import { capitalize } from 'common/util';
import { addFilter, removeFilter } from 'actions'

import classes from './ReportBuilder.css'

const CHIP_BAR_HEIGHT = 42;

class ReportBuilder extends React.Component {
    state = {
        filterForm: null,
        filters: [],
        offsetView: 0
    }

    componentWillMount() {
        this.getReports();
    }

    componentDidUpdate() {
        const node = findDOMNode(this.chipBar)
        const offsetView = node.clientHeight - CHIP_BAR_HEIGHT
        if (node.clientHeight > CHIP_BAR_HEIGHT && this.state.offsetView !== offsetView) {
            this.setState({ offsetView })
        } else if (node.clientHeight === CHIP_BAR_HEIGHT && this.state.offsetView !== 0) {
            this.setState({ offsetView: 0 })
        }
    }

    getReports() {
        const data = this.state.filters;
        this.props.getReports({ data });
    }

    handleFilterSubmit = (entity, values) => {
        const filters = this.state.filters.concat({ entity, values })
        this.setState({ filterForm: null, filters }, this.getReports);
    }

    handleDeleteFilter = filter => {
        const filters = this.state.filters.filter(f => f !== filter);
        this.setState({ filters }, this.getReports)
    }

    getChipText = ({ entity, values }) => this.formatters[entity](values);

    formatters = {
        vehicle: ({ make, model, color, license_plate }) =>
            [color, make, model]
            .filter(v => v)
            .map(capitalize)
            .concat(license_plate && license_plate.toUpperCase())
            .filter(v => v)
            .join(' '),
        person: ({ category, sex, hair_color, eye_color }) => [
            category && category.split('_').map(capitalize).join(' ') + ': ',
            hair_color && hair_color + ' hair',
            eye_color && eye_color + ' eyes'
        ].filter(v => v).map(capitalize).join(' ')
    }

    filterForms = {
        vehicle: (
            <VehicleFilter
              onSubmit={data => this.handleFilterSubmit('vehicle', data)}
              onCancel={e => this.setState({ filterForm: null })}
            />
        ),
        person: (
            <PersonFilter
              onSubmit={data => this.handleFilterSubmit('person', data)}
              onCancel={e => this.setState({ filterForm: null })}
            />
        )
    }

    render() {
        const { filterForm, filters } = this.state;
        const viewStyle = { marginTop: this.state.offsetView }
        const chipBarClass = cx(classes.chipBar, {[classes.emptyChipBar]: filters.length === 0})
        return (
            <div className={classes.reportBuilder}>
                <div className={chipBarClass} ref={c => this.chipBar = c}>
                    {filters.length === 0 &&
                        <div>No Filters Selected</div>
                    }
                    {filters.map((filter, key) => (
                        <Chip
                          key={key}
                          className={classes.chip}
                          deletable
                          onDeleteClick={e => this.handleDeleteFilter(filter)}
                        >
                            {this.getChipText(filter)}
                        </Chip>
                    ))}
                </div>
                <div className={classes.filters}>
                    {!filterForm &&
                        <div>
                            <h3 className={classes.title}>Filter Reports</h3>
                            <div className={classes.addFilterButton}>
                                <Button
                                  label='Add Vehicle'
                                  raised primary
                                  onClick={e => this.setState({ filterForm: 'vehicle' }) }
                                />
                            </div>
                            <div className={classes.addFilterButton}>
                                <Button
                                  label='Add Person'
                                  raised primary
                                  onClick={e => this.setState({ filterForm: 'person' }) }
                                />
                            </div>
                        </div>
                    }
                    {filterForm && this.filterForms[filterForm]}
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
