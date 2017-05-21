import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'react-toolbox/lib/button';

import { ChipList } from 'common_form';
import { capitalize } from 'common/util';
import { incrementCount, addVehicle } from 'actions';


class VehiclesField extends React.Component {
    getVehicleTitle = vehicle =>
        [vehicle.color, vehicle.make, vehicle.model].filter(v => v).map(capitalize).join(' ');

    handleChipClick = (e, { id }) => {
        this.props.router.push(`/form/vehicle/${id}`);
    }

    handleAddClick = e => {
        const { counter, onGetData } = this.props;
        const id = `vehicle_${counter + 1}`;
        const data = onGetData ? onGetData
        this.props.incrementCount('vehicles');
        this.props.addVehicle({ id });
        this.props.router.push(`/form/vehicle/${id}`);
    }

    render() {
        const { vehicles } = this.props;
        return (
            <div>
                <h3>Vehicles</h3>
                <ChipList
                  chips={vehicles}
                  onClick={this.handleChipClick}
                  color="blue"
                  icon='car'
                  display='block'
                  getTitle={this.getVehicleTitle}
                />
                <div>
                    <Button
                      accent
                      type='button'
                      icon='add_circle_outline'
                      onClick={this.handleAddClick}
                     >
                        Add {label}
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ counter, report: vehicles }) =>
    ({ counter: counter.vehicles, vehicles });

export default connect(mapStateToProps, {
    incrementCount,
    addVehicle
})(withRouter(VehiclesField));
