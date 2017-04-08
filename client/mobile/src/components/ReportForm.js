import React, {Component} from 'react';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Button from 'react-toolbox/lib/button';
import GeoLocation from "./GeoLocation";


import classes from './ReportForm.css'

export class ReportForm extends Component {

    constructor() {
        super();
        this.state = {
            details: '',
            date: new Date(),
            vehicles: [],
            people: [],
            location: '',
            room_number: '',
            geo_latitude: '',
            geo_longitude: '',
        };
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div className={classes.reportContainer}>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Incident Report</h3>

                    <Input
                        id='incidentDetails'
                        multiline={true}
                        className={classes.details}
                        value={this.state.details}
                        label='Incident Details'
                        hint='Please write everything you witness in as much detail as possible.
                            Any detail could help.'
                        onChange={details => this.setState({details})}/>

                    <DatePicker
                        label='Date of Incidence'
                        sundayFirstDayOfWeek
                        onChange={date => this.setState({date})}
                        value={this.state.date} />

                    <TimePicker
                        label='Time of Incidence'
                        onChange={date => this.setState({date})}
                        value={this.state.date}
                        format='ampm'
                    />


                    <GeoLocation
                        placeholder='Location of Incident'
                        onUpdate={({lat, lng, address}) => this.setState({
                            location: address,
                            geo_latitude: lat,
                            geo_longitude: lng
                        })}/>

                    <Input
                        label='Room Number'
                        onChange={room_number => this.setState({room_number})}
                        value={this.state.room_number}
                    />


                    <Button type='submit' label='Submit' raised primary/>

                </form>
            </div>
        );
    }
}

