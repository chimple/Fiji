import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'

const { width, height } = require('Dimensions').get('window')
const SIZE = 4

export default class ReflexBoard extends Component {
  constructor(props) {
    super(props)
    //shuffle in sets of SIZE*SIZE
    const shuffledData = this.props.data
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
        tileColor='skyblue'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='purple'
        style={{
          width: width,
          height: height
        }}
        onPress={this._clickTile}
      />
    )
  }

  _clickTile = (id, view) => {
    if (this.state.letters[id] == this.props.data[this.state.currentIndex]) {
      view.zoomOut(250).then((endState)=>{
        this.setState((prevState, props) => {
          console.log(prevState)
          const newLetters = prevState.letters.map((value, index) => {
            return index == id ? prevState.shuffledData[prevState.currentIndex+SIZE*SIZE] : value
          })
          console.log(newLetters)
          return {
            letters: newLetters,
            shuffledData: prevState.shuffledData,
            currentIndex: prevState.currentIndex+1
          }
        })
        this.state.currentIndex+SIZE*SIZE<=this.state.shuffledData.length && view.zoomIn(250)
      })
    } else {
      view.shake(250)
    }
  }
}

ReflexBoard.propTypes = {
  data: PropTypes.array
}
