import React, { PureComponent } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

export default class Tile extends PureComponent {
  _onPressIn = () => {
    this.props.onPress(this.props.id, this.refs.view)
  }

  render() {
    return (
      <Animatable.View
        ref="view"
        useNativeDriver={true}
        style={[
          this.props.style,
          {
            alignItems: 'flex-start',
            alignSelf: 'center',
          }
        ]}
      >
        {/* <View style={{
          height: this.props.tileHeight,
          width: this.props.tileWidth,
          backgroundColor: this.state.selected ? this.props.pressedEdgeColor : this.props.edgeColor,
          borderRadius: 8,
          position: 'absolute',
          top: -this.props.tileHeight / 2 + 5,
          left: -this.props.tileWidth / 2
        }} /> */}
        <TouchableWithoutFeedback
          onPressIn={() => this._onPressIn()}
        >
          <View
            style={{
              height: this.props.style.height,
              width: this.props.style.width,
              backgroundColor: this.props.pressed ? this.props.pressedTileColor : this.props.tileColor,
              borderRadius: 8,
              position: 'absolute',
              // top: this.state.pressed ? 5 : 0,
              justifyContent: 'center',
              alignItems: 'center',
              shadowRadius: 8,
              shadowColor: 'grey',
              shadowOpacity: 1,
              elevation: 8
            }} >
            <Text style={{
              color: this.props.textColor,
              backgroundColor: 'transparent',
              fontSize: this.props.style.height-30
            }}>
              {this.props.text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    )
  }
}

Tile.propTypes = {
  id: PropTypes.number,
  onPress: PropTypes.func,
  tileColor: PropTypes.string,
  pressedTileColor: PropTypes.string,
  edgeColor: PropTypes.string,
  pressedEdgeColor: PropTypes.string,
  text: PropTypes.string,
}
