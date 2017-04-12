import React from 'react';
import Immutable from 'seamless-immutable';

import BaseFilter from './BaseFilter';
import { VehicleForm } from 'common_form';

export default class VehicleFilter extends React.Component {
    state = {
        vehicle: Immutable({
            make: '',
            model: '',
            color: '',
            license_plate: ''
        })
    }

    handleChange = (key, value) => this.setState({
        vehicle: this.state.vehicle.merge({ [key]: value })
    });

    handleSubmit = () => this.props.onSubmit(this.state.vehicle);

    render() {
        const { onCancel, onSubmit } = this.props;
        const { vehicle } = this.state;
        return (
            <BaseFilter title="Vehicle" onSubmit={this.handleSubmit} onCancel={onCancel}>
                <VehicleForm
                  vehicle={vehicle}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                />
            </BaseFilter>
        )
    }
}
