import React from 'react'
import { View, Animated, TouchableWithoutFeedback } from 'react-native'
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types'

export default class AnimationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
      isPlaying: false
    };
  }

  componentDidMount() {
    this.props.autoPlay && this._play()
  }

  _play = () => {
    !this.state.isPlaying &&
      this.setState((prevState, props) => {
        this.state.progress.setValue(0)
        Animated.timing(prevState.progress, {
          toValue: 1,
          duration: props.duration,
        }).start(({ finished }) => {
          if (finished) {
            this.setState({...this.state, isPlaying: false})
          }
        })
        return {
          ...prevState,
          isPlaying: true
        }
      })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this._play()}>
        <LottieView style={this.props.style}
          source={this.props.animationCharacter}
          progress={this.state.progress} />
      </TouchableWithoutFeedback>
    )
  }
}

AnimationView.defaultProps = {
  duration: 2000
}

AnimationView.propTypes = {
  duration: PropTypes.number,
  animationCharacter: PropTypes.object,
  onFinish: PropTypes.func,
  autoPlay: PropTypes.bool
}
