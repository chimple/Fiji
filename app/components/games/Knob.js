import React, { Component, PureComponent } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

export default class Knob extends Component {
  _onPressIn = () => {
    console.log('_onPressIn')
    this.props.onPress(this.props.id)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.text != nextProps.text
      || this.props.style.height != nextProps.style.height
      || this.props.style.width != nextProps.style.width) {
      return true
    }
    return false
  }

  render() {
    console.log('Knob.render:' + this.props.text)
    return (
      <Animatable.View
        ref={this.props.animRef}
        useNativeDriver={true}
        style={[
          this.props.style,
          {
            alignItems: 'flex-start',
            alignSelf: 'center',
          }
        ]}
      >
        <View
          ref={this.props.measureRef}
          onStartShouldSetResponder={(e) => true}
          onResponderGrant={(e) => { this._onPressIn() }}
          style={{
            height: this.props.style.height,
            width: this.props.style.width,
            borderRadius: 8,
            position: 'absolute',
            // top: this.state.pressed ? 5 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            shadowRadius: 8,
            shadowColor: 'grey',
            shadowOpacity: 1,
            elevation: 8,
            backgroundColor: this.props.color,
          }} >
          <Text style={{
            backgroundColor: 'transparent',
            // fontSize: Math.max(20, this.props.style.width - 40),
            fontSize: 24,
            color: this.props.textColor
          }}>
            {this.props.text}
          </Text>
        </View>
      </Animatable.View>
    )
  }
}

Knob.propTypes = {
  id: PropTypes.number,
  accessibilityLabel: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  textColor: PropTypes.string,
  animRef: PropTypes.func,
  delegateTouch: PropTypes.func,
  reverse: PropTypes.bool
}
