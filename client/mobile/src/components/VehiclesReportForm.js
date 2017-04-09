import React, {Component} from "react";
import {uniqueId, map} from "lodash";
import {VehicleReportForm} from "./VehicleReportForm"
import Button from 'react-toolbox/lib/button';

export class VehiclesReportForm extends Component {

    constructor() {
        super();
        this.state = {}
    }

    updateParent() {
        this.props.onUpdate(Object.values(this.state))
    }

    addForm() {
        this.setState({[`${uniqueId('vehicle')}`]: {}})
    }

    render() {
        return (
            <div>
                <h3>Vehicles</h3>
                {map(this.state, (form, id) => form &&
                    <VehicleReportForm key={id} id={id}
                                       onUpdate={form => this.setState({[id]: form}, this.updateParent.bind(this))}
                                       onDelete={() => this.setState({[id]: null}, this.updateParent.bind(this))}
                    />
                )}
                <Button accent type='button' onClick={this.addForm.bind(this)}>add</Button>
            </div>
        );
    }
}

