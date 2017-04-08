import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux'
import { Link } from 'react-router'


class Chrome extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div>
                <AppBar title="Emcit Desktop">
                    <Navigation type="horizontal">
                        {user && <div data-react-toolbox="link">{user.name}</div>}
                        {user && <div data-react-toolbox="link"><a href="/logout">Logout</a></div>}
                    </Navigation>
                </AppBar>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = ({ account: { user }}) => ({ user });

export default connect(mapStateToProps, {})(Chrome);
