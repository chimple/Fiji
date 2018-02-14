import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchGameData } from '../redux/game'
import { addMyScore, finalizeScore } from '../redux/score'
import ReflexBoard from '../components/games/ReflexBoard'
import ScoreScreen from '../../app/screens/ScoreScreen'
import TapHome from '../components/games/TapHome';
import TapWrongGridComponent from '../components/games/TapWrongGridComponent';
import WordGrid from '../components/games/WordGrid';
import Quiz from '../components/games/Quiz';
import ConnectDotsScreen from './ConnectDotsScreen';
import MemoryMatching from '../components/games/MemoryMatching';
import { fetchMultipleChoiceData, fetchSerialData, fetchWordData, fetchConsecutiveData, fetchMatchData, fetchGameDataFailure } from '../redux/data';
import WordScreen from './WordScreen'
import SingleGame from '../components/games/SingleGame'
import HeadToHeadGame from '../components/games/HeadToHeadGame'

const GameComponents = {
  'game:reflex': ReflexBoard,
  'game:tap-home': TapHome,
  'game:tap-wrong': TapWrongGridComponent,
  'game:word': WordScreen,
  'game:multiple-choice': Quiz,
  'game:connect-dots': ConnectDotsScreen,
  'game:memory-matching': MemoryMatching
}

class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOver: false
    }
  }

  componentWillMount() {
    if (this.props.navigation.state.params.game._id == 'game:reflex') {
      this.props.dispatch(fetchConsecutiveData('set:letters', 20, 0, 2))
    } else if (this.props.navigation.state.params.game._id == 'game:multiple-choice') {
      this.props.dispatch(fetchMultipleChoiceData('set:letters', 4, 2))
    } else if (this.props.navigation.state.params.game._id == 'game:tap-home') {
      this.props.dispatch(fetchSerialData('set:letters', 10))
    } else if (this.props.navigation.state.params.game._id == 'game:tap-wrong') {
      this.props.dispatch(fetchWordData('set:letters', 3, 1, 1))
    } else if (this.props.navigation.state.params.game._id == 'game:word') {
      this.props.dispatch(fetchWordData('set:letters', 5, 4, 3))
    } else if (this.props.navigation.state.params.game._id == 'game:connect-dots') {
      this.props.dispatch(fetchConsecutiveData('set:letters', 5, 4, 3))
    } else if (this.props.navigation.state.params.game._id == 'game:memory-matching') {
      this.props.dispatch(fetchMatchData('set:letters', 8, 1))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(fetchGameDataFailure())
  }

  render() {
    console.log('GameScreen', this.props.mode)
    const GameComponent = GameComponents[this.props.navigation.state.params.game._id]
    return (
      this.state.gameOver
        ?
        <ScoreScreen item={this.props.navigation.state.params.item} game={this.props.navigation.state.params.game} user={this.props.navigation.state.params.user} />
        :
        this.props.isFetching
          ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }} />
          :
          this.props.gameData.length
            ?
            this.props.navigation.state.params.mode == 'SINGLE'
              ?
              <SingleGame
                myScore={this.props.myScore}
                play={this.props.navigation.state.params.play}
                gameComponent={GameComponent}
                onEnd={this._onEnd}
                onScore={this._onScore}
                gameData={this.props.gameData} />
              :
              <HeadToHeadGame
                myScore={this.props.myScore}
                play={this.props.navigation.state.params.play}
                gameComponent={GameComponent}
                onEnd={this._onEnd}
                onScore={this._onScore}
                gameData={this.props.gameData} />
            :
            <View>
              <Text>No games found</Text>
            </View>
    )
  }

  _onEnd = () => {
    this.props.dispatch(finalizeScore(this.props.user._id, this.props.navigation.state.params.game._id, this.props.myScore))
    this.setState(...this.state, { gameOver: true })
  }

  _onScore = (score) => {
    this.props.dispatch(addMyScore(score))
  }
}

GameScreen.propTypes = {
  gameData: PropTypes.array,
  theme: PropTypes.object,
  isFetching: PropTypes.bool,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        game: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        mode: PropTypes.string.isRequired,
        play: PropTypes.string.isRequired
      })
    })
  })
}

export default connect(state => ({
  gameData: state.data.gameData,
  theme: state.game.theme,
  isFetching: state.data.isFetching,
  myScore: state.score.myScore,
  user: state.auth.user
}))(GameScreen)