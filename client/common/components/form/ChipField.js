import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'react-toolbox/lib/button';

import ChipList from './ChipList';


export default ({
    label,
    buttonLabel,
    icon,
    color,
    chips,
    onChipClick,
    onChipAdd,
    getTitle
}) => (
    <div>
        <h3>{label}</h3>
        <ChipList
          chips={chips}
          onClick={onChipClick}
          color={color}
          icon={icon}
          display='block'
          getTitle={getTitle}
        />
        <div>
            <Button
              accent
              type='button'
              icon='add_circle_outline'
              onClick={onChipAdd}
            >
                Add {buttonLabel}
            </Button>
        </div>
    </div>
);
