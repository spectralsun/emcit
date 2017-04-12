import React from 'react';
import cx from 'classnames';

import classes from './ButtonBar.css';


const ButtonBar = ({ className, children }) => (
    <div className={cx(classes.buttonBar, className)}>
        {children}
    </div>
)

ButtonBar.left = ({ children }) => (
    <div>{children}</div>
)

ButtonBar.right = ({ children }) => (
    <div className={classes.right}>{children}</div>
)

export default ButtonBar;
