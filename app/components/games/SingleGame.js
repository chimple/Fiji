import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import GameWrapper from './GameWrapper'
import Nimo from '../Nimo'
import { touchDelegate } from './touchDelegate'

const TOP_HEIGHT = 100
const BOTTOM_PADDING = 80

class SingleGame extends Component {
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
        style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <View style={[styles.header, {backgroundColor: this.props.headerColor}]}>
          <Text style={[styles.info, {backgroundColor: this.props.backgroundColor}]}>
            {this.props.myScore}
          </Text>
          <Nimo
            style={styles.nimo}    
          />
          <Text style={styles.info}>

          </Text>
        </View>
        <GameWrapper
          gameComponent={this.props.gameComponent}
          play={this.props.play}
          onEnd={this.props.onEnd}
          onScore={this.props.onScore}
          gameData={this.props.gameData}
          progressBarColor={this.props.progressBarColor}
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

SingleGame.propTypes = {
  myScore: PropTypes.number,
  play: PropTypes.string,
  onEnd: PropTypes.func,
  onScore: PropTypes.func,
  gameComponent: PropTypes.func,
  gameData: PropTypes.array,
  backgroundColor: PropTypes.string,
  headerColor: PropTypes.string,
  progressBarColor: PropTypes.string
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
    height: TOP_HEIGHT * 3 / 4,
    width: TOP_HEIGHT,
    borderRadius: TOP_HEIGHT/4,
    backgroundColor: '#B1D63E',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24
  },
  nimo: {
    height: TOP_HEIGHT,
    width: TOP_HEIGHT
  }
})

export default touchDelegate(SingleGame)