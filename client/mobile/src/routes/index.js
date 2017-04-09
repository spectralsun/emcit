import React from 'react';
import { connect } from 'react-redux';

import Chrome from 'c/chrome';
import {ReportContainer} from "../components/ReportContainer";


const catchAll = { path: '*', onEnter: ({params}, replace) => replace('/desktop') }

const routes = [
    { path: '/', component: ReportContainer },
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
