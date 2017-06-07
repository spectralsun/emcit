import React from 'react';

import { makeCatchAllRoute, configureRoutes } from 'common/util';
import LoginPage from 'common/components/views/LoginPage';
import Chrome from 'c/chrome';
import { PersonFormPage, ReportPage, VehicleFormPage } from 'c/views';

const externalRoutes = [{ path: '*', component: LoginPage }]

const routes = [
    { path: '/', component: ReportPage },
    { path: '/form/person/:id', component: PersonFormPage },
    { path: '/form/vehicle/:id', component: VehicleFormPage },
    makeCatchAllRoute('/')
];

const routeMap = {
    reporter: routes,
    admin: routes,
    analyst: routes,
    external: externalRoutes
}

export default store => configureRoutes(Chrome, routeMap, store);
