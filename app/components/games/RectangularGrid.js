import React, { PureComponent, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class RectangularGrid extends PureComponent {
  _renderChild = (Child, style) => (
    <Child />
  )

  render() {
    console.log('RectangularGrid.render')
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
        const id = row * this.props.numCols + col
        result.push(this.props.render(id,
          {
            top: row * cellSize + topOffset,
            left: col * cellSize + leftOffset,
            position: 'absolute',
            width: tileSize,
            height: tileSize
          }
        ))
      }
    }
    console.log(result)
    return (
      <View style={this.props.style}>
        {result}
      </View>
    )
  }
}

RectangularGrid.propTypes = {
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