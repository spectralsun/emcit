import React from 'react'
import Button from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

import FormErrors from './FormErrors';
import Form from './Form';
import {
    MAKE_OPTIONS, MODEL_OPTIONS, ALL_MODEL_OPTIONS, COLOR_OPTIONS
} from 'common/consts/vehicleOptions';

export default class VehicleForm extends React.Component {
    setMake = make => {
        const { model } = this.props.vehicle;
        if (model && !MODEL_OPTIONS[make].some(m => m.value === model)) {
            this.props.onChange('model', null);
        }
        this.props.onChange('make', make);
    }

    setModel = model => {
        if (!this.props.vehicle.make) {
            this.props.onChange('make', ALL_MODEL_OPTIONS.find(m => m.value === model).make);
        }
        this.props.onChange('model', model);
    }

    render() {
        const { vehicle, onSubmit, onChange } = this.props;
        const modelSource = vehicle.make ? MODEL_OPTIONS[vehicle.make] : ALL_MODEL_OPTIONS;
        return (
            <Form onSubmit={onSubmit}>
                <Dropdown
                  allowBlank
                  label="Make"
                  source={MAKE_OPTIONS}
                  onChange={this.setMake}
                  value={vehicle.make}
                />
                <Dropdown
                  allowBlank
                  label="Model"
                  source={modelSource}
                  onChange={this.setModel}
                  value={vehicle.model}
                />
                <Dropdown
                  allowBlank
                  label="Color"
                  source={COLOR_OPTIONS}
                  onChange={val => onChange('color', val)}
                  value={vehicle.color}
                />
                <Input
                  type='text'
                  label='License Plate'
                  name='license_plate'
                  onChange={val => onChange('license_plate', val)}
                  value={vehicle.license_plate}
                />
            </Form>
        )
    }
}
