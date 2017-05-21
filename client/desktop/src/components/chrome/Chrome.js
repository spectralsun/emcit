import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Navbar from './Navbar';
import classes from './Chrome.css'


@connect(({ currentUser, routing }) => ({ currentUser, routing }))
export default class Chrome extends React.Component {

    render() {
        const { currentUser, children } = this.props;
        const { pathname } = this.props.routing.locationBeforeTransitions;
        return (
            <div>
                {currentUser && <Navbar currentUser={currentUser} pathname={pathname} />}
                <div className={cx(classes.views, {[classes.anonymous]: !currentUser})}>
                    {children}
                </div>
            </div>
        )
    }
}
