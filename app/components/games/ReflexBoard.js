import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'

const SIZE = 4

export default class ReflexBoard extends Component {
  constructor(props) {
    super(props)
    //shuffle in sets of SIZE*SIZE
    const shuffledData = this.props.data.serial
      .map((a, i) => [Math.floor(i / (SIZE * SIZE)) + Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++) {
      letters[i] = shuffledData[i];
    }
    let currentIndex = 0
    this.state = {
      letters,
      shuffledData,
      currentIndex,
    }
  }

  render() {
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
      />
    )
  }

  _clickTile = (id, view) => {
    if (this.state.letters[id] == this.props.data.serial[this.state.currentIndex]) {
      view.zoomOut(250).then((endState) => {
        this.props.onScore(2)
        if (this.state.currentIndex + 1 >= this.props.data.serial.length) {
          this.props.onEnd()
        } else {
          this.setState((prevState, props) => {
            console.log(prevState)
            const newLetters = prevState.letters.map((value, index) => {
              return index == id ? prevState.shuffledData[prevState.currentIndex + SIZE * SIZE] : value
            })
            console.log(newLetters)
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
  onScore: PropTypes.func,
  onEnd: PropTypes.func
}
