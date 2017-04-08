import {
    loggingIn,
    loadedCurrentUser
} from 'common/actions';


/* Account API */
export const loginUser = (email, password) => dispatch => {
    dispatch(loggingIn());
    request.post('/api/v1/account/login', { email, password })
        .then(res => dispatch(loadedCurrentUser(res.data.user)))
        //.catch()
}

export const loadCurrentUser = () => dispatch => {
    request.get('/api/v1/account/me')
        .then(res => dispatch(loadedCurrentUser(res.data.user)))
        //.catch()
}
