import { combineReducers } from 'redux'

import users from './users'
import nav from './nav'
import auth from './auth'
import chat from './chat'
import story from './story'
import game from './game'
import user from './user'

const rootReducer = combineReducers({
    users,
    nav,
    auth,
    chat,
    story,
    game,
    user
})

export default rootReducer