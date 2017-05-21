import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'seamless-immutable'
import './main.css';

import configureRoutes from './routes'
import configureStore from './store'
import Geo from './geo'


const store = configureStore({
    currentUser: Immutable(INITIAL_STATE.currentUser)
});

const geo = new Geo(store);

const routes = configureRoutes(store)

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
, document.getElementById('entry'));
