import React, { Component } from 'react';
import PropTypes from 'prop-types'
import RectangularGrid from './RectangularGrid'
import Knob from './Knob'

const SIZE = 4

export default class ReflexBoard extends Component {
  constructor(props) {
    super(props)
    console.log('constructor', props)
    this.state = this._initBoard(props)
  }

  _initBoard = (props) => {
    const shuffledData = props.data.serial
      .map((a, i) => [Math.floor(i / (SIZE * SIZE)) + Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++) {
      letters[i] = {
        text: shuffledData[i],
        status: 'visible'
      }
    }
    let currentIndex = 0
    return ({
      letters,
      shuffledData,
      currentIndex
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

  _renderKnob = (id, style) => (
    <Knob
      id={id}
      key={id}
      color='#24B2EA'
      textColor='#FFFFFF'
      onPress={this._clickTile}
      animRef={(el) => {
        this.state.letters[id].ref = el
      }}
      measureRef={(el)=>{console.log(el)
        this.props.delegateTouch
        && el
        && this.props.delegateTouch({
          view: el,
          callback: ()=>{this._clickTile(id)},
          reverse: this.props.reverse
        })}}
      style={style}
      text={this.state.letters[id].text}
    />
  )

  render() {
    console.log('ReflexBoard.render')
    return (
      <RectangularGrid
        delegateTouch={this.props.delegateTouch}
        reverse={this.props.reverse}
        numRows={SIZE}
        numCols={SIZE}
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        render={(id, style) => (this._renderKnob(id, style))}
      >
      </RectangularGrid>
    )
  }

  // _onStatusChange(id, view, prevStatus, currentStatus) {
  //   console.log('onstatuschange:', prevStatus, currentStatus)
  //   currentStatus == 'visible' && view.zoomIn(250)
  // }

  _clickTile = (id) => {
    const currentIndex = this.state.currentIndex
    console.log(id, this.state.letters[id])
    console.log(currentIndex, this.props.data.serial[currentIndex])
    if (this.state.letters[id].text == this.props.data.serial[currentIndex]) {
      this.props.onScore && this.props.onScore(2)
      this.props.setProgress && this.props.setProgress((currentIndex + 1) / this.props.data.serial.length)
      this.setState({ ...this.state, currentIndex: currentIndex + 1 })
      this.state.letters[id].ref.zoomOut(250).then((endState) => {
        if (currentIndex + 1 >= this.props.data.serial.length) {
          // this.setState({
          //   ...this.state,
          //   statuses: this.state.statuses.map(() => 'invisible')
          // })
          this.props.onEnd()
        } else {
          this.setState((prevState, props) => {
            const newLetters = prevState.letters.map((value, index) => {
              return index == id ? {
                text: prevState.shuffledData[currentIndex + SIZE * SIZE],
                status: currentIndex + 1 + SIZE * SIZE > this.props.data.serial.length && value.status == 'visible'
                  ?
                  'invisible'
                  :
                  value.status,
                ref: value.ref
              }
                : value
            })
            return {
              ...prevState,
              letters: newLetters,
            }
          })
          currentIndex + SIZE * SIZE < this.props.data.serial.length && this.state.letters[id].ref.zoomIn(250)
        }
      })
    } else {
      this.state.letters[id].ref.shake(250)
    }
  }
}

ReflexBoard.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func,
  delegateTouch: PropTypes.func,
  reverse: PropTypes.bool
}
