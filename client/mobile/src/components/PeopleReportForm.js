import React, {Component} from "react";
import {uniqueId, map} from "lodash";
import {PersonForm} from "common/PersonForm"
import {categoryOptions} from "common/PersonOptions"
import Button from 'react-toolbox/lib/button';

export class PeopleReportForm extends Component {

    constructor() {
        super();
        this.state = {}
        this.counter = new Counter();
    }

    updateParent() {
        this.props.onUpdate(Object.values(this.state))
    }

    renderPersonFormType(typeValue) {
        return map(this.state, (form, id) => {
            if(form && form.category === typeValue)
               return <PersonForm key={id} id={id}
                                  category={form.category}
                                  onUpdate={form => this.setState({[id]: form}, this.updateParent.bind(this))}
                                  onDelete={() => this.setState({[id]: null}, this.updateParent.bind(this))}
               />
            })
    }

    addForm(category) {
        this.setState({[`${this.counter.getNextIdFor(category)}`]: {category}})
    }

    renderPersonForms() {
        return categoryOptions.map(({value, label}) => {
            return (
                <div key={value}>
                    <h3>{label}</h3>
                    {this.renderPersonFormType(value)}
                    <Button accent type='button' onClick={() => this.addForm(value)}>add</Button>
                </div>
            )
        })

    }

    render() {
        return (
            <div>
                {this.renderPersonForms()}
            </div>
        );
    }
}

class Counter {

    constructor(){
        this.keyHolder = {}
    }

    getNextIdFor(str) {
        const currentCount =  this.keyHolder[str] || 0;
        this.keyHolder[str] = currentCount + 1;
        return str + this.keyHolder[str];
    }
}
