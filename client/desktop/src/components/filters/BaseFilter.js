import React from 'react';
import {Button} from 'react-toolbox/lib/button';

import classes from './BaseFilter.css';


export default /* BaseFilter */ ({ onCancel, onSubmit, title, children }) => (
    <div className={classes.baseFilter}>
        <Button
          accent
          raised
          label='Cancel'
          onClick={onCancel}
        />
        <h3 className={classes.title}>{title} Filter</h3>
        {children}
        <br/>
        <Button
          raised
          primary
          label={`Add ${title} Filter`}
          onClick={onSubmit}
        />
    </div>
)
