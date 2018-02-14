import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import GameWrapper from './GameWrapper'

const TOP_HEIGHT = 100
const BOTTOM_PADDING = 80

export default class SingleGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      window: Dimensions.get("window"),
    }
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this._dimChangeHandler)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._dimChangeHandler)
  }

  render() {
    const { width, height } = this.state.window
    return (
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
        <GameWrapper
          gameComponent={this.props.gameComponent}
          play={this.props.play}
          onEnd={this.props.onEnd}
          onScore={this.props.onScore}
          gameData={this.props.gameData}
          style={{
            height: this.state.window.height - TOP_HEIGHT - BOTTOM_PADDING,
            width: this.state.window.width
          }} />
      </View>
    )
  }

  _dimChangeHandler = (dims) => {
    this.setState(...this.state, dims)
  }

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

SingleGame.propTypes = {
  myScore: PropTypes.number,
  play: PropTypes.string,
  onEnd: PropTypes.func,
  onScore: PropTypes.func,
  gameComponent: PropTypes.func,
  gameData: PropTypes.array  
}