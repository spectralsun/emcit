import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'seamless-immutable'

import configureRoutes from './routes'
import configureStore from './store'

import './entry.css'

const store = configureStore({ currentUser: Immutable(INITIAL_STATE.currentUser) });

const routes = configureRoutes(store);

const history = syncHistoryWithStore(browserHistory, store);

const App = (
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
);

render(App, document.getElementById('entry'));
