import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'seamless-immutable'

import configureRoutes from './routes'
import configureStore from './store'

import './entry.css'

const store = configureStore({
    account: Immutable(INITIAL_STATE.account)
});

const routes = configureRoutes(store);

const history = syncHistoryWithStore(browserHistory, store);

const App = (
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
);

render(App, document.getElementById('entry'));
