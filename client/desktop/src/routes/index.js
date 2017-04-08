import React from 'react';
import { connect } from 'react-redux';

import Chrome from 'c/chrome';
import Splash from 'c/splash';
import LoginPage from 'common/components/views/LoginPage'


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

const analystRoutes = [
    { path: '/', component: Splash },
    catchAllUser
]

export default function configureRoutes(store) {

    function getUserRoutes(user) {
        switch(user.role) {
            case 'admin':    return adminRoutes;
            case 'analyst':  return analystRoutes;
        }
    }

    return {
        component: Chrome,
        getChildRoutes(partialNextState, cb) {
            const { user } = store.getState().account;
            if (user) {
                cb(null, getUserRoutes(user))
            } else {
                cb(null, externalRoutes);
                const unsubscribe = store.subscribe(() => {
                    const { user } = store.getState().account;
                    if (user)  {
                        unsubscribe();
                        cb(null, getUserRoutes(user))
                    }
                });
            }
        }
    }
}
