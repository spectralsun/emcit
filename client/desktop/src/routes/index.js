import React from 'react';
import { connect } from 'react-redux';

import Chrome from 'c/chrome';
import Splash from 'c/splash';
import LoginPage from 'common/components/views/LoginPage'
import ReportTablePage from 'c/views/analyze/ReportTablePage'
import ReportBuilder from 'c/chrome/ReportBuilder'


const catchAllAnon = { path: '*', onEnter: ({params}, replace) => replace('/login') }
const catchAllUser = { path: '*', onEnter: ({params}, replace) => replace('/') }

const externalRoutes = [
    { path: '/login', component: LoginPage },
    catchAllAnon
]

const userRoutes = []

const adminRoutes = [
    { path: '/', component: Splash },
    catchAllUser
];

const reportRoutes = {
    component: ReportBuilder,
    childRoutes: [
        { path: '/reports', component: ReportTablePage }
    ]
}

const analystRoutes = [
    { path: '/', component: Splash },
    //{ path: '/reports', component: ReportTablePage },
    reportRoutes,
    catchAllUser
]

export default function configureRoutes(store) {

    const routeMap = {
        admin: adminRoutes,
        analyst: analystRoutes
    }

    return {
        component: Chrome,
        getChildRoutes(partialNextState, cb) {
            const { user } = store.getState().account;
            if (user) {
                cb(null, routeMap[user.role]);
            } else {
                cb(null, externalRoutes);
                const unsubscribe = store.subscribe(() => {
                    const { user } = store.getState().account;
                    if (user)  {
                        unsubscribe();
                        cb(null, routeMap[user.role]);
                    }
                });
            }
        }
    }
}
