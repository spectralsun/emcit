import React from 'react';

import { capitalize } from 'common/util';

export default /* Person */ ({ sex, eye_color, hair_length, hair_color, weight }) => {
    const getEyes = () => eye_color && eye_color.replace('_',' ') + ' eyes';
    const getHair = () => ([
        hair_length,
        hair_color && hair_color.replace('_',' '),
        (hair_length && hair_color) && 'hair'
    ].filter(v => v).join(' '));
    const person = [
        [
            [capitalize(sex), getEyes()].filter(v => v).join(' with '),
            getHair()
        ].filter(v => v).join(' '),
        weight && weight + 'lbs'
    ].join(' weighing ');
    return <div>{person}</div>
}
