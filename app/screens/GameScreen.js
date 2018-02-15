import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchGameData } from '../redux/game'
import { addMyScore, finalizeScore } from '../redux/score'
import ProgressBar from '../components/ProgressBar'
import ReflexBoard from '../components/games/ReflexBoard'
import ScoreScreen from '../../app/screens/ScoreScreen'
import TapHome from '../components/games/TapHome';
import TapWrongGridComponent from '../components/games/TapWrongGridComponent';
import WordGrid from '../components/games/WordGrid';
import Quiz from '../components/games/Quiz';
import ConnectDotsScreen from './ConnectDotsScreen';
import MemoryMatching from '../components/games/MemoryMatching';
import { fetchMultipleChoiceData, fetchSerialData, fetchWordData, fetchConsecutiveData, fetchMatchData } from '../redux/data';
import WordScreen from './WordScreen';

const TOP_HEIGHT = 100
const BOTTOM_PADDING = 80

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
      window: Dimensions.get("window"),
      gameOver: false,
      progress: 0,
      dataIndex: 0
    }
  }

  _dimChangeHandler = (dims) => {
    this.setState(...this.state, dims)
  }

  _onScore = (score) => {
    this.props.dispatch(addMyScore(score))
  }

  _setProgress = (progress) => {
    this.setState(...this.state,
      { progress: (progress + this.state.dataIndex) / this.props.gameData.length })
  }

  _onEnd = () => {
    let dataIndex = this.state.dataIndex
    if (++dataIndex < this.props.gameData.length) {
      this.setState(...this.state, { dataIndex })
    } else {
      this.props.dispatch(finalizeScore(this.props.user._id, this.props.navigation.state.params.game._id, this.props.myScore))
      this.setState(...this.state, { gameOver: true })
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.game._id == 'game:reflex') {
      this.props.dispatch(fetchConsecutiveData('set:letters', 20, 0, 2))
    } else if (this.props.navigation.state.params.game._id == 'game:multiple-choice') {
      this.props.dispatch(fetchMultipleChoiceData('set:letters', 4, 2))
    } else if (this.props.navigation.state.params.game._id == 'game:tap-home') {
      this.props.dispatch(fetchSerialData('set:letters', 4))
    } else if (this.props.navigation.state.params.game._id == 'game:tap-wrong') {
      this.props.dispatch(fetchWordData('set:letters', 3, 2, 3))
    } else if (this.props.navigation.state.params.game._id == 'game:word') {
      this.props.dispatch(fetchWordData('set:letters', 5, 4, 3))
    } else if (this.props.navigation.state.params.game._id == 'game:connect-dots') {
      this.props.dispatch(fetchConsecutiveData('set:letters', 5, 4, 3))
    } else if (this.props.navigation.state.params.game._id == 'game:memory-matching') {
      this.props.dispatch(fetchMatchData('set:letters', 8, 1))
    }
    Dimensions.addEventListener("change", this._dimChangeHandler)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._dimChangeHandler)
  }

  render() {
    console.log(this.props.navigation.state.params.game._id)
    console.log(this.props.navigation.state.params.user.name)
    console.log(this.props.navigation.state.params.item.name)
    const GameComponent = GameComponents[this.props.navigation.state.params.game._id]
    const { width, height } = this.state.window
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
            <View
              style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.info}>
                  {this.props.myScore}
                </Text>
                <View style={styles.icon}>

                </View>
                <Text style={styles.info}>

                </Text>
              </View>
              <ProgressBar
                fillStyle={{}}
                backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
                style={{ width: this.state.window.width }}
                progress={this.state.progress}
              // progress={1}
              // duration={3000}
              // onEnd={this._onEnd}
              />
              <GameComponent
                data={this.props.gameData[this.state.dataIndex]}
                runIndex={this.state.dataIndex}
                onScore={this._onScore}
                onEnd={this._onEnd}
                setProgress={this._setProgress}
                style={{
                  height: this.state.window.height - TOP_HEIGHT - BOTTOM_PADDING,
                  width: this.state.window.width
                }}
              />
            </View> :
            <View>
              <Text>No games found</Text>
            </View>
    )
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
        user: PropTypes.object.isRequired
      })
    })
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E53554',
  },
  header: {
    height: TOP_HEIGHT,
    alignSelf: 'stretch',
    backgroundColor: '#34E8E8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  game: {
    alignContent: 'stretch',
    backgroundColor: '#34E8E8'
  },
  info: {
    height: TOP_HEIGHT - BOTTOM_PADDING,
    width: TOP_HEIGHT - BOTTOM_PADDING,
    backgroundColor: '#B1D63E',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: TOP_HEIGHT - BOTTOM_PADDING
  },
  icon: {
    height: TOP_HEIGHT - BOTTOM_PADDING,
    width: TOP_HEIGHT - BOTTOM_PADDING,
    backgroundColor: '#B1D63E'
  }
})

export default connect(state => ({
  gameData: state.data.gameData,
  theme: state.game.theme,
  isFetching: state.game.isFetching,
  myScore: state.score.myScore,
  user: state.auth.user
}))(GameScreen)