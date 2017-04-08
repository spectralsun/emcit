import { createAction } from 'common/util'


/* Account Actions */
export const loggingIn = createAction('LOGGING_IN');
export const loadedCurrentUser = createAction('LOADED_CURRENT_USER');
export const loginFailed = createAction('LOGIN_ERROR');
