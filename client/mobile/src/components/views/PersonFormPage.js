import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Input from "react-toolbox/lib/input";
import Dropdown from "react-toolbox/lib/dropdown";

import {
    SEX_OPTIONS, AGE_OPTIONS, HEIGHT_OPTIONS, WEIGHT_OPTIONS,
    HAIR_COLOR_OPTIONS, EYE_COLOR_OPTIONS
} from 'common/consts/personOptions';
import { PageContainer } from 'c/chrome';
import { setPersonValue, removePerson } from 'actions';
import { SaveButtonBar } from 'form';


@withRouter
@connect(
    ({ report: { people } }, { params: { id } }) => ({ person: people.find(p => p.id === id), id }),
    { removePerson, setPersonValue }
)
export default class PersonFormPage extends Component {
    componentWillMount() {
        if (!this.props.person) {
            this.props.router.push('/');
        }
    }

    handleSave = () => this.props.router.push('/');

    handleDelete = () => {
        this.props.removePerson(this.props.id);
        this.props.router.push('/')
    }

    setValue(key, value) {
        const { id } = this.props;
        this.props.setPersonValue({ id, key, value });
    }

    render() {
        const { person } = this.props;
        if (!person) {
            return null;
        }
        return (
            <PageContainer>
                <SaveButtonBar onDelete={this.handleDelete} onSave={this.handleSave} />
                <Input
                    label='Name'
                    onChange={v => this.setValue('name', v)}
                    value={person.name}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('age', v)}
                    label='Approx. Age'
                    source={AGE_OPTIONS}
                    value={person.age}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('sex', v)}
                    label='Sex'
                    source={SEX_OPTIONS}
                    value={person.sex}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('height', v)}
                    label='Approx. Height'
                    source={HEIGHT_OPTIONS}
                    value={person.height}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('weight', v)}
                    label='Approx. Weight'
                    source={WEIGHT_OPTIONS}
                    value={person.weight}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('hair_color', v)}
                    label='Hair Color'
                    source={HAIR_COLOR_OPTIONS}
                    value={person.hair_color}
                />
                <Input
                    label='Hair Length'
                    onChange={v => this.setValue('hair_length', v)}
                    value={person.hair_length}
                />
                <Dropdown
                    auto
                    onChange={v => this.setValue('eye_color', v)}
                    label='Eye Color'
                    source={EYE_COLOR_OPTIONS}
                    value={person.eye_color}
                />
                <Input
                    multiline
                    label='Noticeable Characteristics / Other Details'
                    onChange={v => this.setValue('details', v)}
                    value={person.details}
                />
                <SaveButtonBar onSave={this.handleSave} />
            </PageContainer>
        );
    }
}
