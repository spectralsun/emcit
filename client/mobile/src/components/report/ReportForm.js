import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Input from 'react-toolbox/lib/input';
import FontIcon from 'react-toolbox/lib/font_icon';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Button from 'react-toolbox/lib/button';

import { ChipField, Form, FormErrors } from 'common_form';
import { getPersonTitle, getVehicleTitle } from 'common/util';
import GeoLocation from "./GeoLocation";
import { addPerson, addVehicle, incrementCount, setReportValue } from 'actions';

import classes from './ReportForm.css';

const peopleNameMap = {
    suspicious_person: 'Suspicious Person',
    buyer: 'Buyer',
    victim: 'Victim'
}

class ReportForm extends Component {
    getChipCount(type) {
        this.props.incrementCount(type);
        return this.props.counter[type] + 1;
    }

    handleChipClick = (form, { id }) => this.props.router.push(`/form/${form}/${id}`);

    handlePersonAdd = category => {
        const count = this.getChipCount(category);
        const id = `${category}_${count}`
        const name = `${peopleNameMap[category]} ${count}`
        this.props.addPerson({ id, title: name, name, category })
        this.props.router.push(`/form/person/${id}`);
    }

    handleVehicleAdd = e => {
        const count = this.getChipCount('vehicle');
        const id = `vehicle_${count}`;
        const title = `Vehicle ${count}`;
        this.props.addVehicle({ id, title });
        this.props.router.push(`/form/vehicle/${id}`);
    }

    setValue(key, value) {
        this.props.setReportValue({ key, value });
        return this;
    }

    render() {
        const { report, onSubmit, errors } = this.props;
        return (
            <Form onSubmit={onSubmit} className={classes.reportForm}>
                <h1><FontIcon value='note_add' /> Incident Report</h1>
                <FormErrors errors={errors} />
                <DatePicker
                  label='Date of Incidence'
                  sundayFirstDayOfWeek
                  onChange={v => this.setValue('date', v)}
                  value={report.date}
                />
                <TimePicker
                  label='Time of Incidence'
                  onChange={v => this.setValue('date', v)}
                  value={report.date}
                  format='ampm'
                />
                <GeoLocation label='Location of Incident' />
                <Input
                  label='Room Number'
                  value={report.room_number}
                  onChange={v => this.setValue('room_number', v)}
                />
                <ChipField
                  label='Suspicious People'
                  buttonLabel='Suspicious Person'
                  color='red'
                  icon='person'
                  chips={report.people.filter(p => p.category === 'suspicious_person')}
                  onChipAdd={c => this.handlePersonAdd('suspicious_person', c)}
                  onChipClick={p => this.handleChipClick('person', p)}
                  getTitle={person => getPersonTitle(person) || person.title}
                />
                <ChipField
                  label='Buyer(s)'
                  buttonLabel='Buyer'
                  color='orange'
                  icon='person'
                  chips={report.people.filter(p => p.category === 'buyer')}
                  onChipAdd={c => this.handlePersonAdd('buyer', c)}
                  onChipClick={p => this.handleChipClick('person', p)}
                  getTitle={person => getPersonTitle(person) || person.title}
                />
                <ChipField
                  label='Victim(s)'
                  buttonLabel='Victim'
                  color='yellow'
                  icon='person'
                  chips={report.people.filter(p => p.category === 'victim')}
                  onChipAdd={c => this.handlePersonAdd('victim', c)}
                  onChipClick={p => this.handleChipClick('person', p)}
                  getTitle={person => getPersonTitle(person) || person.title}
                />
                <ChipField
                  label='Vehicle(s)'
                  buttonLabel='Vehicle'
                  color="blue"
                  icon='directions_car'
                  chips={report.vehicles}
                  onChipAdd={this.handleVehicleAdd}
                  onChipClick={v => this.handleChipClick('vehicle', v)}
                  getTitle={vehicle => getVehicleTitle(vehicle) || vehicle.title}
                />
                <br/>
                <Input
                  multiline={true}
                  className={classes.details}
                  value={report.details}
                  label='Incident Details'
                  hint='Please write everything you witness in as much detail as possible.
                        Any detail could help.'
                  onChange={v => this.setValue('details', v)}
                />
                <Button type='submit' label='Submit' className={classes.submitButton} raised primary/>
            </Form>
        );
    }
}

const mapStateToProps = ({ counter, report }) => ({ counter, report });

export default connect(mapStateToProps, {
    addPerson,
    addVehicle,
    incrementCount,
    setReportValue
})(withRouter(ReportForm));
