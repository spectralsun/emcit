import axios from 'axios';
import Immutable from 'seamless-immutable';


export const checkRequest = (prevRequest, { started, success, data, symbol }, apiMethod, callbacks) => {
    const apiMethods = [].concat(apiMethod).map(({ symbol }) => symbol);
    if (!prevRequest.started && started && apiMethods.includes(symbol)) {
        callbacks.start && callbacks.start();
    }
    if (prevRequest.started && !started && apiMethods.includes(symbol)) {
        if (success)  {
            callbacks.end && callbacks.end(data);
        } else if (data) {
            callbacks.error && callbacks.error(data);
        }
        callbacks.finally && callbacks.finally();
        return true;
    }
    return false;
}

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


export const requestStarted = createAction('REQUEST_STARTED');
export const requestFinished = createAction('REQUEST_FININSHED');
export const requestError = createAction('REQUEST_ERROR');

export const NETWORK_ERROR = { form: ['Unable to reach server'] };

export const createApi = (baseUrl='') => {
    const api = {};
    const getUrl = (url, params) => baseUrl + (typeof url !== 'string' ? url(params) : url);
    ['get', 'post', 'put', 'delete'].forEach(method => {
        api[method] = url => {
            const symbol = Symbol(getUrl(url, {}).replace('undefined', '{}'));
            const apiMethod = (params={}) => dispatch => {
                const requestData = params.data;
                const requestArgs = [getUrl(url, params)];
                if (('post' === method || 'put' === method) && requestData) {
                    requestArgs.push(requestData);
                }
                dispatch(requestStarted({ symbol, params, requestData }));
                request[method].apply(request, requestArgs)
                    .then(({ data }) => {
                        dispatch(requestFinished({ symbol, data, requestData, params }));
                    }, ({ response }) => {
                        const data = response ? response.data : NETWORK_ERROR;
                        dispatch(requestError({ symbol, data, requestData, params }));
                    })
            }
            apiMethod.symbol = symbol;
            return apiMethod;
        }
    });
    return api;
}

const typeMap = {
    [requestStarted]: 'start',
    [requestFinished]: 'end',
    [requestError]: 'error'
}
export const processRequest = ({ newState, state, data, params }) =>
    typeof newState === 'function' ? newState({ data, params, state }) : Immutable(newState);

export const handleRequest = (apiMethod, newState) => (state, { symbol, data, params }) =>
    symbol === apiMethod.symbol ? processRequest({ newState, state, data, params }) : state;

export const createRequestReducer = (apiMethod, handlers, initialState) =>
    (state=initialState, { type, payload }) =>
        typeMap[type] && handlers[typeMap[type]]
            ? handleRequest(apiMethod, handlers[typeMap[type]])(state, payload)
            : state;

export const requestReducer = createReducer({
    [requestStarted]: (state, { symbol, requestData }) => state.merge({
        started: true,
        success: undefined,
        error: undefined,
        data: undefined,
        symbol, requestData
    }),
    [requestFinished]: (state, { symbol, data, requestData }) => state.merge({
        started: false,
        success: true,
        symbol, data, requestData
    }),
    [requestError]: (state, { symbol, data, requestData }) => state.merge({
        started: false,
        error: true,
        success: false,
        symbol, data, requestData
    })
}, Immutable({ started: false, error: false, success: false, symbol: null }));

const request_factory = csrfToken => {
    return axios.create({
        headers: { 'X-CSRFToken': csrfToken }
    });
}

export const request = request_factory() //(document.getElementById('csrf').content);

export const capitalize = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const getPersonTitle = person => person.name;

export const getVehicleTitle = vehicle =>
    [vehicle.color, vehicle.make, vehicle.model, vehicle.license_plate]
        .filter(v => v).map(capitalize).join(' ');

export const makeCatchAllRoute = redirectPath =>
    ({ path: '*', onEnter: ({params}, replace) => replace(redirectPath) })

export const configureRoutes = (Chrome, routeMap, store) => ({
    component: Chrome,
    getChildRoutes(partialNextState, cb) {
        const { currentUser } = store.getState();
        if (currentUser) {
            cb(null, routeMap[currentUser.role]);
        } else {
            cb(null, routeMap.external);
            const unsubscribe = store.subscribe(() => {
                const { currentUser } = store.getState();
                if (currentUser)  {
                    unsubscribe();
                    cb(null, routeMap[currentUser.role]);
                }
            });
        }
    }
});
