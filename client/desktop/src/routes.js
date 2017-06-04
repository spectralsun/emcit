import React from 'react';
import { connect } from 'react-redux';

import LoginPage from 'common/components/views/LoginPage'
import { makeCatchAllRoute, configureRoutes } from 'common/util';

import Chrome from 'c/chrome';
import ReportTablePage from 'c/views/analyze/ReportTablePage'
import ReportDetailsPage from 'c/views/analyze/ReportDetailsPage'
import ReportMapPage from 'c/views/analyze/ReportMapPage'
import ReportBuilder from 'c/chrome/ReportBuilder'
import UserListPage from 'c/views/admin/UserListPage'
import { CreateUserPage, UpdateUserPage } from 'c/views/admin/UserFormPage'


const externalRoutes = [
    { path: '/login', component: LoginPage },
    makeCatchAllRoute('/login')
]

const reportRoutes = {
    component: ReportBuilder,
    childRoutes: [
        { path: '/reports/table', component: ReportTablePage },
        { path: '/reports/map', component: ReportMapPage }
    ]
}

const adminRoutes = [
    { path: '/users', component: UserListPage },
    { path: '/users/new', component: CreateUserPage },
    { path: '/users/:id', component: UpdateUserPage },
    { path: '/reports/details/:id', component: ReportDetailsPage },
    reportRoutes,
    makeCatchAllRoute('/users')
];

const analystRoutes = [
    { path: '/reports/details/:id', component: ReportDetailsPage },
    reportRoutes,
    makeCatchAllRoute('/reports/table')
]

const routeMap = {
    admin: adminRoutes,
    analyst: analystRoutes,
    external: externalRoutes
}

export default store => configureRoutes(Chrome, routeMap, store);
