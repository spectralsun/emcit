import React from 'react';
import { connect } from 'react-redux';

import Chrome from 'c/chrome';
import Splash from 'c/splash';


const catchAll = { path: '*', onEnter: ({params}, replace) => replace('/mobile') }

const routes = [
    { path: '/', component: Splash },
    { path: '/mobile', component: Splash },
    //{ path: '/login', component: Login },
    catchAll
];

export default function configureRoutes(store) {
    return {
        component: Chrome,
        getChildRoutes(partialNextState, cb) {
            cb(null, routes);
        }
    }
}
