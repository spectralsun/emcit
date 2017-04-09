import React from 'react';

import Chrome from 'c/chrome';
import LoginPage from 'common/components/views/LoginPage';
import ReportContainer from "../components/ReportContainer";

const catchAll = {path: '*', onEnter: ({params}, replace) => replace('/desktop')}

const routes = [
    {path: '/', component: ReportContainer},
    { path: '/login', component: LoginPage },
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
