import { createAction } from 'common/util'


export const loadedReports = createAction('LOADED_REPORTS');

export const addFilter = createAction('ADD_FILTER');
export const removeFilter = createAction('REMOVE_FILTER');
