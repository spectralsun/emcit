import Immutable from 'seamless-immutable';

import { createReducer } from 'common/util';
import {
    loggingIn,
    loadedCurrentUser,
    loginError
} from 'common/actions';

const account = createReducer({
    [loggingIn]: state => state.merge({ loggingIn: true }),
    [loadedCurrentUser]: (state, user) => state.merge({ logginIn: false, user }),
    [loginError]: (state, loginError) => state.merge({ logginIn: false , loginError })
}, Immutable({
    user: null,
    loggingIn: false,
    loginError: null
}));
