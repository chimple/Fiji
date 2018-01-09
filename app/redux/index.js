import { combineReducers } from 'redux'

import users from './users'
import nav from './nav'
import auth from './auth'
import chat from './chat'

const rootReducer = combineReducers({
    users,
    nav,
    auth,
    chat
})

export default rootReducer