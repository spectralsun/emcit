import { createAction } from 'common/util'

/* Report Actions */
export const setReportValue = createAction('SET_REPORT_VALUE')
export const resetReport = createAction('RESET_REPORT');
export const addPerson = createAction('ADD_PERSON');
export const setPersonValue = createAction('SET_PERSON_VALUE');
export const removePerson = createAction('REMOVE_PERSON');
export const addVehicle = createAction('ADD_VEHICLE');
export const setVehicleValue = createAction('SET_VEHICLE_VALUE');
export const removeVehicle = createAction('REMOVE_VEHICLE');

/* Counter Actions */
export const incrementCount = createAction('INCREMENT_COUNT')

/* Geo Actions */
export const getCurrentPosition = createAction('GET_CURRENT_POSITION');
export const getAddressPosition = createAction('GET_ADDRESS_POSITION');
export const setPositionError = createAction('SET_POSITION_ERROR');
export const setPosition = createAction('SET_POSITION');
export const setGeoSearch = createAction('SET_SEARCH');
