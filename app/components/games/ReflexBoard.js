import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import Tile from './Tile'

const { width, height } = require('Dimensions').get('window')
const SIZE = 4 // four-by-four grid
const CELL_SIZE = Math.floor(width * .2) // 20% of the screen width
const CELL_PADDING = Math.floor(CELL_SIZE * .05) // 5% of the cell size
const BORDER_RADIUS = CELL_PADDING * 2
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
const LETTER_SIZE = Math.floor(TILE_SIZE * .75)

export default class ReflexBoard extends Component {
  constructor(props) {
    super(props)
    let tilt = new Array(SIZE * SIZE);
    for (let i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++) {
      letters[i] = props.data[i];
    }
    this.state = {
      tilt,
      letters
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderTiles()}
      </View>
    )
  }

  _renderTiles = () => {
    let result = []
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        let id = row * SIZE + col
        let letter = this.state.letters[id]
        let tilt = this.state.tilt[id].interpolate({
          inputRange: [0, 1],
          outputRange: [col * CELL_SIZE + CELL_PADDING, col * CELL_SIZE]
        })
        let style = {
          left: tilt,
          top: row * CELL_SIZE + CELL_PADDING,
          // transform: [{ perspective: CELL_SIZE * 8 },
          // { rotateX: tilt }]
        };
        result.push(this._renderTile(id, style, letter))
      }
    }
    return result
  }

  _renderTile = (id, style, letter) => {
    return <Tile
      key={id}
      onPress={(status, view) => this._clickTile(id, status, view)}
      trueTileColor="#333"
      falseTileColor="#BEE1D2"
      trueColor="#BEE1D2"
      falseColor="#333"
      text={letter}
      tileStyle={[styles.tile, style]}
      textStyle={[styles.letter]}
    />
    // return <Animated.View key={id} style={styles.tile}
    //   onStartShouldSetResponder={() => this._clickTile(id)}>
    //   <Text style={styles.letter}>{letter}</Text>
    // </Animated.View>
  }

  _clickTile = (id, status, view) => {
    let tilt = this.state.tilt[id]
    tilt.setValue(1) // mapped to -30 degrees
    Animated.spring(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
    this.setState((prevState, props) => {
      console.log(prevState)
      const newLetters = prevState.letters.map((value, index) => {
        return index == id ? "1" : value
      })
      console.log(newLetters)
      return {
        tilt: prevState.tilt,
        letters: newLetters
      }
    })
    // view.rotate(800)
  }
}

ReflexBoard.propTypes = {
  data: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2',
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    fontFamily: 'NukamisoLite',
    backgroundColor: 'transparent',
  },
})