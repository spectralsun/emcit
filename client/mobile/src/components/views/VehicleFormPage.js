import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PageContainer } from 'c/chrome';
import { VehicleForm } from 'common_form';
import { SaveButtonBar } from 'form';
import { setVehicleValue } from 'actions';


class VehicleFormPage extends React.Component {
    componentWillMount() {
        if (!this.props.vehicle) {
            this.props.router.push('/');
        }
    }

    handleChange = (key, value) =>
        this.props.setVehicleValue({ id: this.props.vehicle.id, key, value });

    handleSave = e => this.props.router.push('/');

    render() {
        const { vehicle } = this.props;
        if (!vehicle) {
            return null;
        }
        return (
            <PageContainer>
                <SaveButtonBar onSave={this.handleSave} />
                <h3>{vehicle.title}</h3>
                <VehicleForm
                  vehicle={vehicle}
                  onChange={this.handleChange}
                  onSubmit={this.handleSave}
                />
                <SaveButtonBar onSave={this.handleSave} />
            </PageContainer>
        )
    }
}

const mapStateToProps = ({ report: { vehicles }}, { params: { id } }) =>
    ({ vehicle: vehicles.find(v => v.id === id) });

export default connect(mapStateToProps, {
    setVehicleValue
})(withRouter(VehicleFormPage));
