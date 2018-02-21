import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Buffer } from 'buffer'

export default class User extends PureComponent {
  state = {
    len: null
  }

  _onPress = () => {
    this.props.onPressItem(this.props.user)
  }

  onLayoutHandler() {
    console.log('onLayoutHandler');
    const w = Dimensions.get("window").width
    this.setState({ len: w })
  }

  render() {
    return (
      <TouchableOpacity
        onLayout={this.onLayoutHandler.bind(this)}
        onPress={this._onPress}
        style={styles.TouchableStyle}
        accessibilityLabel={this.props.user.name}
        >
        <View style={styles.ImageViewStyle}>
          <Image
            style={{
              width: this.state.len * 0.24,
              height: this.state.len * 0.24,
              borderRadius: this.state.len * 0.12,
            }}
            source={{
              uri:
                'data:image/png;base64,' + this.props.user.image,
            }}
          />
        </View>
        <View style={styles.TextViewStyle}>
          <Text style={styles.TextStyle}>
            {this.props.user.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  ImageViewStyle: {
    flex: 3,
    alignItems: 'center'
  },
  TextViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  },
  TouchableStyle: {
    flex: 1,
    marginLeft: '2%',
    marginTop: '5%'
  }
});