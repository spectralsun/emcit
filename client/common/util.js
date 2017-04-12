import axios from 'axios'

import { requestStarted, requestFinished, requestError } from 'common/actions';

export function createAction(name) {
    const type = Symbol(name);
    const action = payload => ({ type, payload });
    action.type = type;
    action.toString = () => type;
    return action;
}

export const createReducer = (handlers, initialState) =>
    (state = initialState, { type, payload }) =>
            handlers[type] ? handlers[type](state, payload, type) : state;

export const createApi = (baseUrl='') => {
    const api = {}
    const formatUrl = (url, ...params) =>
        baseUrl + (typeof url !== 'string' ? url.apply({}, params) : url);
    ['get', 'post', 'put', 'delete'].forEach(method => {
        api[method] = url => {
            const symbol = Symbol();
            const apiMethod = (...params) => dispatch => {
                const requestData = params[0];
                const requestUrl = formatUrl.apply({}, [url, ...params]);
                const requestArgs = [requestUrl];
                if ('post' === method || 'put' === method) {
                    requestArgs.push(requestData);
                }
                dispatch(requestStarted({ symbol, params, requestData }));
                request[method].apply(request, requestArgs)
                    .then(({ data }) => {
                        dispatch(requestFinished({ symbol, data, requestData, params }));
                    }, ({ response }) => {
                        const data = response ? response.data : undefined;
                        dispatch(requestError({ symbol, data, requestData, params }));
                    })
            }
            apiMethod.symbol = symbol;
            return apiMethod;
        }
    });
    return api;
}


const request_factory = csrfToken => {
    return axios.create({
        headers: { 'X-CSRFToken': csrfToken }
    });
}

export const request = request_factory() //(document.getElementById('csrf').content);

export const exists = v => !!v;

export const capitalize = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const getPersonTitle = person => person.name;

export const getVehicleTitle = vehicle =>
    [vehicle.color, vehicle.make, vehicle.model, vehicle.license_plate]
        .filter(exists).map(capitalize).join(' ');

export const makeCatchAllRoute = redirectPath =>
    ({ path: '*', onEnter: ({params}, replace) => replace(redirectPath) })

export const configureRoutes = (Chrome, routeMap, store) => ({
    component: Chrome,
    getChildRoutes(partialNextState, cb) {
        const { user } = store.getState().account;
        console.log(user)
        if (user) {
            cb(null, routeMap[user.role]);
        } else {
            cb(null, routeMap.external);
            const unsubscribe = store.subscribe(() => {
                const { user } = store.getState().account;
                if (user)  {
                    unsubscribe();
                    cb(null, routeMap[user.role]);
                }
            });
        }
    }
});
