/**
 * Read https://reactnavigation.org/docs/guides/redux 
 * for integrating navigation with redux
 * @flow
 */

import React from 'react'
import {Icon} from 'react-native-elements'
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
import GameFrontScreen from '../screens/GameFrontScreen'
import multipleChoiceHome from '../screens/multipleChoiceHome'
import SinglePlay from '../screens/SinglePlay'
import ReflexScreen from '../screens/ReflexScreen'
import MemoryMatchingScreen from '../screens/MemoryMatchingScreen'
import TapHomeScreen from '../screens/TapHomeScreen'
import TapWrongScreen from '../screens/TapWrongScreen'
import WordScreen from '../screens/WordScreen' 
import ConnectDotsScreen from '../screens/ConnectDotsScreen'
import ScoreScreen from '../screens/ScoreScreen'
import CamPage from '../components/CamPage'
import GameScreen from '../screens/GameScreen';
import NewLevel from '../screens/NewLevel'
import HeadToHeadPlayScreen from '../screens/HeadToHeadPlayScreen'
import ModeScreen from '../screens/ModeScreen'

// const CamNavigator = StackNavigator({
//   Cam: {
//     screen: CamPage,
//     navigationOptions:{
//       headerTitle: 'Take photo',
//       headerStyle:{ backgroundColor:'#19a4f2'}
//     }
//   }
// }, {headerMode:'none'}) 
  //
const ChatNavigator = StackNavigator({
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Friends',
      headerStyle:{backgroundColor: '#19a4f2'},
    },
  },
  /*ChatWith: {
    screen: ChatScreen,
    navigationOptions: {
      headerTitle: 'Chat',
      headerStyle:{backgroundColor: '#e24076'}
    }
  }*/  
},{headerMode:'none'})

const StoryNavigator = StackNavigator({
  Titles: {
    screen: StoriesScreen,
    navigationOptions: {
      headerTitle: 'Stories',
      headerStyle:{backgroundColor:'#19a4f2'}
    },
  },
  /*Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerTitle: 'Story',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  }*/  
},{
  headerMode:'none'
})

const MainNavigator = TabNavigator({
  Chat: {
    screen: ChatNavigator
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      headerTitle: 'Games',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  Stories: {
    screen: StoryNavigator
  }
}, {
  tabBarPosition:"top",
  tabBarOptions:{
    labelStyle:{fontSize: 15, fontWeight:'bold', color:'black'},
    style:{backgroundColor:'#19a4f2'},
    indicatorStyle:{backgroundColor:'white'}
  }
})

export const AppNavigator = StackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Homez',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  CamPage: {
    screen: CamPage,
    navigationOptions:{
      headerTitle: 'Take photo',
      headerStyle:{ backgroundColor:'#19a4f2'}
    }
  },
  Main: {
    screen: MainNavigator
  },
  Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerTitle: 'Story',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  ChatWith: {
    screen: ChatScreen,
    navigationOptions: {
      headerTitle: 'Chat',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
  },
  GameFrontScreen: {
    screen: GameFrontScreen,
    navigationOptions:{
      headerTitle:'Game',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
  },
  CommonGameScreen: {
    screen: GameScreen
  },
  Score:{
    screen: ScoreScreen,
    navigationOptions: {
      headerTitle: 'Score',
      headerStyle:{backgroundColor: '#19a4f2'}
    },
  },
  HeadToHead:{
    screen: HeadToHeadPlayScreen,
    navigationOptions: {
      headerTitle: 'Head to Head',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
  },
  Modes:{
    screen: ModeScreen,
    navigationOptions: {
      headerTitle: 'Select Mode',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
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
