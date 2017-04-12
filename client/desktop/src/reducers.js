import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';

import { account, request } from 'common/reducers'
import { createReducer } from 'common/util'
import { addFilter, removeFilter } from 'actions';
import {
    requestStarted, requestFinished, requestError
} from 'common/actions';

import { getReports, getUser, getUsers } from 'api';

const reports = createReducer({
    [requestFinished]: (state, { symbol, data }) =>
        (symbol === getReports.symbol ? Immutable(data) : state)
}, Immutable([]));

const filters = createReducer({
    [addFilter]: (state, filter) => state.concat(filter),
    [removeFilter]: (state, filter) => state.filter(f => f !== filter)
}, [])

const users = createReducer({
    [requestFinished]: (state, { symbol, data }) =>
        (symbol === getUsers.symbol ? Immutable(data) : state)
}, Immutable([]));

const user = createReducer({
    [requestFinished]: (state, { symbol, data }) =>
        (symbol === getUser.symbol ? Immutable(data) : state)
}, Immutable(null));

export default combineReducers({
    routing,

    // common reducers
    account,
    request,

    // desktop reducers
    reports,
    filters,
    users,
    user
});
