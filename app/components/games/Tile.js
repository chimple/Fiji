import React, { PureComponent } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

export default class Tile extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }

  _onPress = () => {
    //TODO: play the sound
    // this.refs.view.transitionTo({opacity: 0.2})
    this.setState({ status: this.props.onPress(this.state.status, this.refs.view) })
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps")
    console.log(this.props)
    console.log(nextProps)
  }

  render() {
    console.log("render")
    return (
      <TouchableWithoutFeedback onPress={() => this._onPress()}>
        <Animatable.View
          ref="view"
          style={[
            this.props.tileStyle,
            {backgroundColor: this.state.status ? this.props.trueTileColor : this.props.falseTileColor}
          ]}
        >
          <Text
            style={[
              this.props.textStyle,
              {color: this.state.status ? this.props.trueColor : this.props.falseColor}
            ]}
          >
            {this.props.text}
          </Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    )
  }
}

Tile.propTypes = {
  onPress: PropTypes.func,
  trueTileColor: PropTypes.string,
  falseTileColor: PropTypes.string,
  trueColor: PropTypes.string,
  falseColor: PropTypes.string,
  text: PropTypes.string,
  tileStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
}
