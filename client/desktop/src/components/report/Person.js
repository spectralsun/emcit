import React from 'react';

import { capitalize } from 'common/util';

export default /* Person */ ({ sex, eye_color, hair_length, hair_color, weight, details }) => {
    const getEyes = () => eye_color && eye_color.replace('_',' ') + ' eyes';
    const getHair = () => ([
        hair_length,
        hair_color && hair_color.replace('_',' '),
        (hair_length && hair_color) && 'hair'
    ].filter(v => v).join(' '));
    const person = [
        [
            sex ? capitalize(sex) : 'Person',
            [getEyes(), getHair()].filter(v => v).join(' and '),
        ].filter(v => v).join(' with '),
        weight && `weighing ${weight}lbs`,
    ].join(' ');
    return (
        <div>
            <div>{person}</div>
            {details && <div>{details}</div>}
        </div>
    )
}
