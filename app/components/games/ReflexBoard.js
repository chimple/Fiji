import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types'

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
    this.state = {
      tilt
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
        let letter = this.props.data[id]
        let tilt = this.state.tilt[id].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        })
        let style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          transform: [{ perspective: CELL_SIZE * 8 },
          { rotateX: tilt }]
        };
        result.push(this._renderTile(id, style, letter))
      }
    }
    return result
  }

  _renderTile = (id, style, letter) => {
    return <Animated.View key={id} style={[styles.tile, style]}
      onStartShouldSetResponder={() => this._clickTile(id)}>
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  }

  _clickTile = (id) => {
    let tilt = this.state.tilt[id]
    tilt.setValue(1) // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
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