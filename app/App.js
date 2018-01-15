import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import AppWithNavigationState from './navigators/AppNavigator'
import rootReducer from './redux'

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      logger
  )
)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
