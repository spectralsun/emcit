import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';

import { account } from 'common/reducers'


export default combineReducers({
    routing,
    
    account
});
