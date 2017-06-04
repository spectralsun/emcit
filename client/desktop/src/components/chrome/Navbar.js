import React from 'react';
import { Link } from 'react-router';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import cx from 'classnames';

import classes from './Navbar.css';

export default /* Navbar */ ({ currentUser, currentUser: { role }, pathname }) => (
    <AppBar title="Emerald Citizen" fixed>
        <Navigation type="horizontal" className={classes.centerNav}>
            {(role === 'admin' || role === 'analyst') &&
                <div className={cx({[classes.activeNav]: pathname === '/reports/table'})} data-react-toolbox="link">
                    <Link to="/reports/table">Table</Link>
                </div>
            }
            {(role === 'admin' || role === 'analyst') &&
                <div className={cx({[classes.activeNav]: pathname === '/reports/map'})} data-react-toolbox="link">
                    <Link to="/reports/map">Map</Link>
                </div>
            }
            {role === 'admin' &&
                <div className={cx({[classes.activeNav]: pathname === '/users/new'})}  data-react-toolbox="link">
                    <Link to="/users/new">New User</Link>
                </div>
            }
            {role === 'admin' &&
                <div className={cx({[classes.activeNav]: pathname === '/users'})}  data-react-toolbox="link">
                    <Link to="/users">Users</Link>
                </div>
            }
        </Navigation>
        <Navigation type="horizontal">
            <div className={classes.userInfo} data-react-toolbox="link">
                {currentUser.name}
            </div>
            <div className={classes.logoutButton} data-react-toolbox="link">
                <a href="/logout">Logout</a>
            </div>
        </Navigation>
    </AppBar>
);
