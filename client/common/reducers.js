import Immutable from 'seamless-immutable';

import { createRequestReducer } from 'common/util';
import { loginUser } from 'common/api';

export const currentUser = createRequestReducer(loginUser, {
    end: ({ data }) => Immutable(data)
}, Immutable(null));
