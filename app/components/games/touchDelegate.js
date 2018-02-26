import React, { Component } from 'react'
import { View } from 'react-native'

export function touchDelegate(WrappedComponent) {
  return class extends Component {
    _tiles = []
    _addToTiles = (tile) => {
      this._tiles.push(tile)
    }

    _callTile = (nativeEvent) => {
      this._tiles.forEach(({ view, callback, reverse }) => {
        view.measure((x, y, width, height, pageX, pageY) => {
          const xLow = reverse ? pageX - width : pageX
          const xHigh = reverse ? pageX : pageX + width
          const yLow = reverse ? pageY - height : pageY
          const yHigh = reverse ? pageY : pageY + height
          if (nativeEvent.pageX <= xHigh && nativeEvent.pageX >= xLow
            && nativeEvent.pageY <= yHigh && nativeEvent.pageY >= yLow) {
            callback()
          }
        })
      })
    }

    render() {
      return (
        <WrappedComponent
          onStartShouldSetResponder={(e) => true}
          onStartShouldSetResponderCapture={(e) => true}
          onTouchStart={({ nativeEvent }) => this._callTile(nativeEvent)}
          delegateTouch={this._addToTiles}
          {...this.props}
        />
      )
    }
  }
}