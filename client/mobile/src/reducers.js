import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import Immutable from 'seamless-immutable';

import { currentUser } from 'common/reducers'
import { createReducer, requestReducer as request } from 'common/util';
import {
    setReportValue,
    addPerson,
    setPersonValue,
    removePerson,

    addVehicle,
    setVehicleValue,
    removeVehicle,

    incrementCount,
    resetReport,
    getCurrentPosition,
    getAddressPosition,
    setGeoSearch,
    setPositionError,
    setPosition
} from 'actions';
import { createReport } from 'api';


const REPORT_INITIAL_STATE = {
    date: new Date(),
    location: '',
    room_number: '',
    details: '',
    people: [],
    vehicles: []
}

const people = createReducer({
    [addPerson]: (state, person) => state.concat(Immutable(person)),
    [setPersonValue]: (state, { id, key, value }) =>
        state.map(p => p.id === id ? p.merge({ [key]: value }) : p),
    [removePerson]: (state, id) => state.filter(p => p.id !== id)
})

const vehicles = createReducer({
    [addVehicle]: (state, vehicle) => state.concat(Immutable(vehicle)),
    [setVehicleValue]: (state, { id, key, value }) =>
        state.map(v => v.id === id ? v.merge({ [key]: value }) : v),
    [removeVehicle]: (state, id) => state.filter(v => v.id !== id)
})

// TODO(garrett): make this subReduce thing moar sleek
const subReduce = (reducer, key) => (state, payload, type) =>
    state.merge({ [key]: reducer(state[key], { payload, type })});

const report = createReducer({
    [createReport]: (state, report) => report,
    [setReportValue]: (state, { key, value }) => state.merge({ [key]: value }),
    [addPerson]: subReduce(people, 'people'),
    [setPersonValue]: subReduce(people, 'people'),
    [removePerson]: subReduce(people, 'people'),
    [addVehicle]: subReduce(vehicles, 'vehicles'),
    [setVehicleValue]: subReduce(vehicles, 'vehicles'),
    [removeVehicle]: subReduce(vehicles, 'vehicles'),
    [resetReport]: state => Immutable(REPORT_INITIAL_STATE)
}, Immutable(REPORT_INITIAL_STATE));

const COUNTER_INITIAL_STATE = {
    suspicious_person: 0,
    buyer: 0,
    victim: 0,
    vehicle: 0
}

const counter = createReducer({
    [incrementCount]: (state, type) => state.merge({ [type]: state[type] + 1}),
    [resetReport]: state => Immutable(COUNTER_INITIAL_STATE)
}, Immutable(COUNTER_INITIAL_STATE));

const GEO_INITIAL_STATE = {
    address: null,
    search: '',
    locating: false,
    error: false,
    position: null
}

const CURRENT_LOCATING = 'Waiting for location permission...';
const ADDRESS_LOCATING = 'Looking up address coordinates...';

const geo = createReducer({
    [getCurrentPosition]: (state, locating) =>
        state.merge({ address: null, locating: CURRENT_LOCATING, }),
    [getAddressPosition]: (state, address) =>
        state.merge({ address, locating: ADDRESS_LOCATING }),
    [setPositionError]: (state, error) =>
        state.merge({ locating: false, error }),
    [setPosition]: (state, { address, position }) =>
        state.merge({ address, position, search: '', locating: false }),
    [setGeoSearch]: (state, search) => state.merge({ search }),
    [resetReport]: () => Immutable(GEO_INITIAL_STATE)
}, Immutable(GEO_INITIAL_STATE));

export default combineReducers({
    routing,

    currentUser,
    request,

    counter,
    geo,
    report,
});
