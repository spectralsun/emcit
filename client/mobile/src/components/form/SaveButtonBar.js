import React from 'react';
import Button from "react-toolbox/lib/button";

import { ButtonBar } from 'common_form';


export default ({ onSave }) => (
    <ButtonBar>
        <ButtonBar.right>
            <Button primary raised onClick={onSave}>Save</Button>
        </ButtonBar.right>
    </ButtonBar>
)
