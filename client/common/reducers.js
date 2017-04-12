import Immutable from 'seamless-immutable';

import { createReducer } from 'common/util';
import {
    clearLoginErrors,
    loggingIn,
    loadedCurrentUser,
    loginFailed,
    requestStarted,
    requestFinished,
    requestError
} from 'common/actions';


export const request = createReducer({
    [requestStarted]: (state, { symbol, requestData }) =>
        state.merge({
            started: true,
            success: undefined,
            error: undefined,
            data: undefined,
            symbol, requestData
        }),
    [requestFinished]: (state, { symbol, data, requestData }) =>
        state.merge({
            started: false,
            success: true,
            symbol, data, requestData
        }),
    [requestError]: (state, { symbol, data, requestData }) =>
        state.merge({
            started: false,
            error: true,
            success: false,
            symbol, data, requestData
        })
}, Immutable({ started: false, error: false, success: false, symbol: null }));

export const account = createReducer({
    [clearLoginErrors]: state => state.merge({ loginError: {} }),
    [loggingIn]: state => state.merge({ loggingIn: true, loginError: {} }),
    [loadedCurrentUser]: (state, user) => state.merge({ logginIn: false, user }),
    [loginFailed]: (state, loginError) => state.merge({ logginIn: false , loginError })
}, Immutable({
    user: null,
    loggingIn: false,
    loginError: {}
}));
