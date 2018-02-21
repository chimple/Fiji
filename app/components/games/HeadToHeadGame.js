import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation'
import GameWrapper from './GameWrapper'
import HeadToHeadPlayScreen from '../../screens/HeadToHeadPlayScreen';

const TOP_HEIGHT = 40
const BOTTOM_PADDING = 5
const HEADER_TO_REMOVE = 50

export default class HeadToHeadGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myScore: 0,
      otherScore: 0,
    }
  }

  _addMyScore = (addToScore) => {
    this.setState((prevState, props)=>({
      ...this.state, myScore: prevState.myScore + addToScore
    }))
  }

  _addOtherScore = (addToScore) => {
    this.setState((prevState, props)=>({
      ...this.state, otherScore: prevState.otherScore + addToScore
    }))
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  render() {
    let { width, height } = Dimensions.get('window')

    if( width > height )
    {
      let temp = width
      width = height
      height = temp
    }

    return (
      <View
        style={styles.container}>
        <View style={{flex:1, transform:[{scaleY:-1},{scaleX:-1}]}}>
          <View style={styles.header}>
            <Text style={styles.info}>
              {this.state.otherScore}
            </Text>
            <View style={styles.icon}>

            </View>
            <Text style={styles.info}>
              {this.state.myScore}
            </Text>
          </View>
          <GameWrapper
            gameComponent={this.props.gameComponent}
            play={this.props.play}
            onEnd={this.props.onEnd}
            onScore={this._addOtherScore}
            gameData={this.props.gameData}
            style={{
              height: height/2 - TOP_HEIGHT - HEADER_TO_REMOVE,
              width
            }} />
        </View>
        <View style={{flex:1}}>
          <View style={styles.header}>
            <Text style={styles.info}>
              {this.state.myScore}
            </Text>
            <View style={styles.icon}>

            </View>
            <Text style={styles.info}>
              {this.state.otherScore}
            </Text>
          </View>
          <GameWrapper
            gameComponent={this.props.gameComponent}
            play={this.props.play}
            onEnd={this.props.onEnd}
            onScore={this._addMyScore}
            gameData={this.props.gameData}
            style={{
              height: height/2 - TOP_HEIGHT - HEADER_TO_REMOVE,
              width
            }} />
        </View>
      </View>
    )
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

HeadToHeadGame.propTypes = {
  myScore: PropTypes.number,
  play: PropTypes.string,
  onEnd: PropTypes.func,
  onScore: PropTypes.func,
  gameComponent: PropTypes.func,
  gameData: PropTypes.array
}