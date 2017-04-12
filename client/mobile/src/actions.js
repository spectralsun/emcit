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
