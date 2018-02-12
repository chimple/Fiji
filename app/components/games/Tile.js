import React, { Component, PureComponent } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

export default class Tile extends Component {
  _onPressIn = () => {
    this.props.onPress(this.props.id, this.refs.view)
  }

  _onStatusChange = (prevStatus, currentStatus) => {
    this.props.onStatusChange && this.props.onStatusChange(this.props.id, this.refs.view, prevStatus, currentStatus)    
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.text != nextProps.text
        || this.props.style.height != nextProps.style.height
        || this.props.style.width != nextProps.style.width
        || (this.props.status && (this.props.status != nextProps.status))) {
          this.props.onRender && this.props.onRender(this.props.id, this.refs.view)
      return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate:',this.props.id,prevProps.status, this.props.status)
    if(prevProps.status != this.props.status) {
      this._onStatusChange(prevProps.status, this.props.status)
    }
  }

  render() {
    console.log('Tile.render:'+this.props.text)
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
              fontSize: Math.max(20, this.props.style.height - 40)
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
  status: PropTypes.string,
  onPress: PropTypes.func,
  onStatusChange: PropTypes.func,
  tileColor: PropTypes.string,
  pressedTileColor: PropTypes.string,
  edgeColor: PropTypes.string,
  pressedEdgeColor: PropTypes.string,
  text: PropTypes.string,
}
