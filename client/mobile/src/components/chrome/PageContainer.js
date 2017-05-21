import React from 'react'
import cx from 'classnames';

import classes from './PageContainer.css'

export default ({ children, className }) => (
    <div className={cx(classes.pageContainer, className)}>
        {children}
    </div>
);
