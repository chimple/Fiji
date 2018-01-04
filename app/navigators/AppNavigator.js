/**
 * Read https://reactnavigation.org/docs/guides/redux 
 * for integrating navigation with redux
 * @flow
 */

import React from 'react'
import { addNavigationHelpers, TabNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FriendsScreen from '../screens/FriendsScreen'
import GamesScreen from '../screens/GamesScreen'
import StoriesScreen from '../screens/StoriesScreen'
import HomeScreen from '../screens/HomeScreen'

export const AppNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Homez',
    },
  },
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      headerTitle: 'Friends',
    },
  },
  Stories: {
    screen: StoriesScreen,
    navigationOptions: {
      headerTitle: 'Stories'
    }
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      headerTitle: 'Games'
    }
  },
})

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
