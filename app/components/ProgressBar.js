// Based on https://github.com/lwansbrough/react-native-progress-bar
// MIT License

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native'
import PropTypes from 'prop-types'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(this.props.initialProgress || 0)
    }
  }

  componentDidMount() {
    if (this.props.progress >= 0 && this.props.progress != this.props.initialProgress) {
      this.update()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update()
    }
  }

  render() {
    var fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
    })

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
      </View>
    )
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.duration,
      toValue: this.props.progress
    }).start((fin) => {this.props.onEnd && this.props.onEnd(fin)})
  }
}

ProgressBar.propTypes = {
  initialProgress: PropTypes.number,
  progress: PropTypes.number,
  onEnd: PropTypes.func
}

ProgressBar.defaultProps = {
  style: styles,
  easing: Easing.inOut(Easing.ease),
  duration: 250
}

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
})