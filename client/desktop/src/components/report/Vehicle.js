import React from 'react';

import { capitalize } from 'common/util';


export default /* Vehicle */ ({ color, make, model, license_plate }) => (
    <div>
        {[
            capitalize(color),
            capitalize(make),
            capitalize(model),
            license_plate
        ].filter(v => v).join(' ')}
    </div>
)
