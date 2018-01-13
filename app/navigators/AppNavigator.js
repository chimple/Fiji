/**
 * Read https://reactnavigation.org/docs/guides/redux 
 * for integrating navigation with redux
 * @flow
 */

import React from 'react'
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FriendsScreen from '../screens/FriendsScreen'
import GamesScreen from '../screens/GamesScreen'
import StoriesScreen from '../screens/StoriesScreen'
import StoryScreen from '../screens/StoryScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ChatScreen from '../screens/ChatScreen'

const ChatNavigator = StackNavigator({
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      headerTitle: 'Friends',
      headerStyle:{backgroundColor: '#c11562'}
    },
  },
  ChatWith: {
    screen: ChatScreen,
    navigationOptions: {
      headerTitle: 'Chat',
      headerStyle:{backgroundColor: '#c11562'}
    }
  }  
},{headerMode:'none'})

const StoryNavigator = StackNavigator({
  Titles: {
    screen: StoriesScreen,
    navigationOptions: {
      headerTitle: 'Stories',
      headerStyle:{backgroundColor:'#c11562'}
    },
  },
  Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerTitle: 'Story',
      headerStyle:{backgroundColor:'#c11562'}
    }
  }  
},{
  headerMode:'none'
})

const MainNavigator = TabNavigator({
  Chat: {
    screen: ChatNavigator
  },
  Stories: {
    screen: StoryNavigator
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      headerTitle: 'Games',
      headerStyle:{backgroundColor:'#c11562'}
    }
  }
}, {
  tabBarOptions:{
    labelStyle:{fontSize: 15, fontWeight:'bold', color:'black'},
    style:{backgroundColor:'#c11562'},
    indicatorStyle:{backgroundColor:'white'}
  }
})

export const AppNavigator = StackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Homez',
      headerStyle:{backgroundColor:'#c11562'}
    }
  },
  Main: {
    screen: MainNavigator
  }
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
