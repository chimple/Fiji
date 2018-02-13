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
    let statuses = new Array(SIZE * SIZE)
    for (let i = 0; i < statuses.length; i++) {
      statuses[i] = 'visible';
    }
    let currentIndex = 0
    return ({
      letters,
      shuffledData,
      currentIndex,
      statuses
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
        statuses={this.state.statuses}
        onStatusChange={this._onStatusChange}
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        statusStyles = {{
          visible: {
            View: {
              backgroundColor: '#24B2EA'
            },
            Text: {
              color: '#FFFFFF'
            }
          }
        }}
        onPress={this._clickTile}
        onRender={this._renderTile}
      />
    )
  }

  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:', prevStatus, currentStatus)
    currentStatus == 'visible' && view.zoomIn(250)
  }

  // _renderTile = (id, view) => {
  //   this.state.letters[id] && view.zoomIn(250)
  // }

  _clickTile = (id, view) => {
    const currentIndex = this.state.currentIndex
    if (this.state.letters[id] == this.props.data.serial[currentIndex]) {
      this.props.onScore && this.props.onScore(2)
      this.props.setProgress && this.props.setProgress((currentIndex + 1) / this.props.data.serial.length)
      this.setState({...this.state, currentIndex: currentIndex + 1})
      view.zoomOut(250).then((endState) => {
        if (currentIndex + 1 >= this.props.data.serial.length) {
          this.setState({...this.state,
            statuses: this.state.statuses.map(()=>'invisible')})
          this.props.onEnd()
        } else {
          this.setState((prevState, props) => {
            const newLetters = prevState.letters.map((value, index) => {
              return index == id ? prevState.shuffledData[currentIndex + SIZE * SIZE] : value
            })
            const newStatuses = prevState.statuses.map((value, index) => {
              return (currentIndex + 1 + SIZE * SIZE > this.props.data.serial.length && index == id && value=='visible') ? 'invisible' : value
            })
            return {...prevState,
              letters: newLetters,
              statuses: newStatuses,
            }
          })
          currentIndex + SIZE * SIZE < this.props.data.serial.length && view.zoomIn(250)
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
