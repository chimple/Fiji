import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'

const SIZE = 4

export default class ReflexBoard extends Component {
  constructor(props) {
    super(props)
    this.state = this._initBoard(props)
  }

  _initBoard = (props) => {
    const shuffledData = props.data.serial
      .map((a, i) => [Math.floor(i / (SIZE * SIZE)) + Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++) {
      letters[i] = shuffledData[i];
    }
    let currentIndex = 0
    return ({
      letters,
      shuffledData,
      currentIndex,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

  render() {
    console.log('ReflexBoard.render')
    return (
      <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.state.letters}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='#FFFFFF'
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        onPress={this._clickTile}
        onRender={this._renderTile}
      />
    )
  }

  _renderTile = (id, view) => {
    this.state.letters[id] && view.zoomIn(250)
  }

  _clickTile = (id, view) => {
    if (this.state.letters[id] == this.props.data.serial[this.state.currentIndex]) {
      this.props.onScore(2)
      this.props.setProgress((this.state.currentIndex + 1) / this.props.data.serial.length)
      view.zoomOut(250).then((endState) => {
        if (this.state.currentIndex + 1 >= this.props.data.serial.length) {
          this.props.onEnd()
        } else {
          this.setState((prevState, props) => {
            const newLetters = prevState.letters.map((value, index) => {
              return index == id ? prevState.shuffledData[prevState.currentIndex + SIZE * SIZE] : value
            })
            return {
              letters: newLetters,
              shuffledData: prevState.shuffledData,
              currentIndex: prevState.currentIndex + 1
            }
          })
          this.state.currentIndex + SIZE * SIZE <= this.props.data.serial.length && view.zoomIn(250)
        }
      })
    } else {
      view.shake(250)
    }
  }
}

ReflexBoard.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func
}
