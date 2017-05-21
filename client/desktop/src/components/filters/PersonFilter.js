import React from 'react';
import Dropdown from "react-toolbox/lib/dropdown";

import { Form } from 'common_form';
import {
    CATEGORY_OPTIONS, EYE_COLOR_OPTIONS, HAIR_COLOR_OPTIONS, SEX_OPTIONS
} from 'common/consts/personOptions';
import BaseFilter from './BaseFilter';


export default class PersonFilter extends React.Component {
    state = {
        category: '',
        sex: '',
        hair_color: '',
        eye_color: ''
    }

    handleSubmit = e => this.props.onSubmit(this.state);

    render() {
        const { onCancel } = this.props;
        return (
            <BaseFilter title="Person" onSubmit={this.handleSubmit} onCancel={onCancel}>
                <Form onSubmit={this.handleSubmit}>
                    <Dropdown
                      label='Type of Person'
                      onChange={category => this.setState({category})}
                      source={CATEGORY_OPTIONS}
                      value={this.state.category}
                    />

                    <Dropdown
                      auto
                      onChange={sex => this.setState({sex})}
                      label='Sex'
                      source={SEX_OPTIONS}
                      value={this.state.sex}
                    />

                    <Dropdown
                      auto
                      onChange={hair_color => this.setState({hair_color})}
                      label='Hair Color'
                      source={HAIR_COLOR_OPTIONS}
                      value={this.state.hair_color}
                    />

                    <Dropdown
                      auto
                      onChange={eye_color => this.setState({eye_color})}
                      label='Eye Color'
                      source={EYE_COLOR_OPTIONS}
                      value={this.state.eye_color}
                    />
                </Form>
            </BaseFilter>
        )
    }
}
