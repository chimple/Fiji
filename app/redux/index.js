import { combineReducers } from 'redux'

import users from './users'
import nav from './nav'
import auth from './auth'
import chat from './chat'
import story from './story'

const rootReducer = combineReducers({
    users,
    nav,
    auth,
    chat,
    story
})

export default rootReducer