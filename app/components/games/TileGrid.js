import React, { PureComponent, Component } from 'react';
import { Text, View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import Tile from './Tile'

export default class TileGrid extends PureComponent {
  render() {
    console.log('TileGrid.render')
    const cellSize = Math.min(
      Math.floor(this.props.style.width / (this.props.numCols)),
      Math.floor(this.props.style.height / (this.props.numRows))
    )

    const padding = Math.floor(cellSize * .05)
    const borderRadius = padding * 2
    const tileSize = cellSize - padding * 2
    const topOffset = padding + Math.floor((this.props.style.height - cellSize * this.props.numRows) / 2)
    const leftOffset = padding + Math.floor((this.props.style.width - cellSize * this.props.numCols) / 2)
    let result = []
    for (let row = 0; row < this.props.numRows; row++) {
      for (let col = 0; col < this.props.numCols; col++) {
        let id = row * this.props.numCols + col
        result.push(
          <Tile
            key={id}
            id={id}
            delegateTouch={this.props.delegateTouch}
            reverse={this.props.reverse}
            accessibilityLabel={'Tile_'+String(row)+String(col)}
            onPress={this.props.onPress}
            onRender={this.props.onRender}
            tileColor={this.props.tileColor}
            edgeColor={this.props.edgeColor}
            pressedTileColor={this.props.pressedTileColor}
            pressedEdgeColor={this.props.pressedEdgeColor}
            textColor={this.props.textColor}
            text={this.props.data[id]}
            status={this.props.statuses[id]}
            onStatusChange={this.props.onStatusChange}
            statusStyles={this.props.statusStyles}
            style={{
              top: row * cellSize + topOffset,
              left: col * cellSize + leftOffset,
              position: 'absolute',
              width: tileSize,
              height: tileSize
            }}
          />
        )
      }
    }
    return (
      <View style={this.props.style}>
        {result}
      </View>
    )
  }
}

TileGrid.propTypes = {
  onPress: PropTypes.func,
  onRender: PropTypes.func,
  statuses: PropTypes.array,
  onStatusChange: PropTypes.func,
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  data: PropTypes.array,
  delegateTouch: PropTypes.func,
  reverse: PropTypes.bool
}