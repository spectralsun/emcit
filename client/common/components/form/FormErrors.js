import React from 'react'

import classes from './FormErrors.css'

export default ({ errors }) => (
    (!errors || errors.length === 0) ? null : (
        <div className={classes.errors}>
            {(Array.isArray(errors) ? errors : [errors]).map(error =>
                <div className={classes.error}>{error}</div>
            )}
        </div>
    )
)
