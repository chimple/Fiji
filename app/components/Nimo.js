import React, { Component } from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import LottieView from 'lottie-react-native'

export default class Nimo extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.animation.play(0, 120)
  }

  render() {
    return (
      <View>
      <LottieView
        style={this.props.style}
        ref={animation => {
          this.animation = animation;
        }}
        source={require('../assets/lottie/cheetah.json')}
      />
      </View>
    )
  }
}
