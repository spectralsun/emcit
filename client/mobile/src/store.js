import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

import GeoService from './geo';

const geo = store => next => action => {
    if (!store.geo) {
        store.geo = new Geo()
    }
    const state = next(action);
    return state
}


export default function configureStore(preloadedState = {}) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    );
}
