import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import classes from './Chrome.css'

class Chrome extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div>
                <AppBar title="Emcit Desktop" fixed>
                    <Navigation type="horizontal">
                        {user && <div data-react-toolbox="link">{user.name}</div>}
                        {user && <div data-react-toolbox="link"><Link to="/users/new">New User</Link></div>}
                        {user && <div data-react-toolbox="link"><Link to="/users">Users</Link></div>}
                        {user && <div data-react-toolbox="link"><a href="/logout">Logout</a></div>}
                    </Navigation>
                </AppBar>
                <div className={classes.views}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ account: { user }}) => ({ user });

export default connect(mapStateToProps, {})(Chrome);
