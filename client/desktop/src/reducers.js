import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';

import { currentUser } from 'common/reducers'
import {
    createReducer,
    createRequestReducer,
    requestReducer as request
} from 'common/util'
import { addFilter, removeFilter } from 'actions';

import { getReports, getReport, getUser, getUsers } from 'api';

const reports = createRequestReducer(getReports, {
    end: ({ data }) => Immutable(data)
}, Immutable([]));

const reportDetails = createRequestReducer(getReport, {
    end: ({ data }) => Immutable(data)
}, Immutable(null));

const filters = createReducer({
    [addFilter]: (state, filter) => state.concat(filter),
    [removeFilter]: (state, filter) => state.filter(f => f !== filter)
}, [])

const users = createRequestReducer(getUsers, {
    end: ({ data }) => Immutable(data)
}, Immutable([]));

const user = createRequestReducer(getUser, {
    start: null,
    end: ({ data }) => Immutable(data)
}, Immutable(null));

export default combineReducers({
    routing,

    // common reducers
    currentUser,
    request,

    // desktop reducers
    reports,
    reportDetails,
    filters,
    users,
    user
});
