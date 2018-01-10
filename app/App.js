import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import fijiDB from './db'

import AppWithNavigationState from './navigators/AppNavigator'
import rootReducer from './redux'

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      logger
  )
)
console.log(store.getState())
const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
)

export default App
