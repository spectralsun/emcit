import React from 'react'
import cx from 'classnames';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';

import classes from './ChipList.css';


export default /* ChipList */ ({ chips, onClick, color, icon, getTitle, display }) => (
    <div className={cx(classes.chipList, { [classes.clickable]: !!onClick, [classes.displayInline]: display === 'inline' })}>
        {chips.map((chip, idx) =>
            <div key={idx} className={classes.chip}>
                <Chip onClick={onClick && (e => onClick(chip))}>
                    <Avatar
                      style={{backgroundColor: color}}
                      icon={icon}
                    />
                    <span>{getTitle(chip)}</span>
                </Chip>
            </div>
        )}
    </div>
)
