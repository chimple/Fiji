import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchGameData } from '../redux/game'
import { addMyScore } from '../redux/score'
import ReflexBoard from '../components/games/ReflexBoard'

const TOP_HEIGHT = 100
const BOTTOM_PADDING = 20

const GameComponents = {
  'reflex': ReflexBoard
}

class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: Dimensions.get("window")
    }
  }

  _dimChangeHandler = (dims) => {
    this.setState(dims)
  }

  _onScore = (score) => {
    this.props.dispatch(addMyScore(score))
  }

  componentDidMount() {
    this.props.dispatch(fetchGameData())
    Dimensions.addEventListener("change", this._dimChangeHandler)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._dimChangeHandler)
  }

  render() {
    const GameComponent = GameComponents['reflex']
    const {width, height} = this.state.window
    return (
      this.props.isFetching
        ?
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
        :
        this.props.data.length
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
            <GameComponent
              data={this.props.data}
              onScore={this._onScore}
              style={{
                height: this.state.window.height-TOP_HEIGHT-BOTTOM_PADDING,
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
  data: PropTypes.array,
  theme: PropTypes.object,
  isFetching: PropTypes.bool
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
    fontSize: TOP_HEIGHT - BOTTOM_PADDING - 30
  },
  icon: {
    height: TOP_HEIGHT - BOTTOM_PADDING,
    width: TOP_HEIGHT - BOTTOM_PADDING,
    backgroundColor: '#B1D63E'    
  }
})

export default connect(state => ({
  data: state.game.data,
  theme: state.game.theme,
  isFetching: state.game.isFetching,
  myScore: state.score.myScore
}))(GameScreen)