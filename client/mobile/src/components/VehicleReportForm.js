import React, {Component} from "react";
import Input from "react-toolbox/lib/input";

export class VehicleReportForm extends Component {

    constructor() {
        super();
        this.state = {
            make: '',
            model: '',
            license_plate: '',
            color: ''
        };
    }

    updateParent() {
        this.props.onUpdate(this.state)
    }


    render() {
        return (
            <div>
                <a onClick={this.props.onDelete} style={{color: 'red', float: 'right', cursor: 'pointer'}}>X</a>
                <h3 >{this.props.id}</h3>
                <hr/>
                <Input
                    label='Make'
                    onChange={make => this.setState({make}, this.updateParent.bind(this))}
                    value={this.state.make}
                />

                <Input
                    label='Model'
                    onChange={model => this.setState({model}, this.updateParent.bind(this))}
                    value={this.state.model}
                />

                <Input
                    label='License Plate'
                    onChange={license_plate => this.setState({license_plate}, this.updateParent.bind(this))}
                    value={this.state.license_plate}
                />

                <Input
                    label='Color'
                    onChange={color => this.setState({color}, this.updateParent.bind(this))}
                    value={this.state.color}
                />

            </div>
        );
    }
}

