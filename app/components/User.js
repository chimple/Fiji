import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'

export default class User extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.user)
  }

  render() {
    // let svg = Buffer.from(this.props.user.svg, 'base64').toString('utf8')
    // console.log(svg)
    return (
      <TouchableOpacity onPress={ this._onPress }>
        <View>
          <Image
            style={{
              width: 51,
              height: 51,
              resizeMode: Image.resizeMode.contain,
            }}
            source={{
              uri:
                'data:image/png;base64,' +  this.props.user.image,
            }}
          />
          {/* <SvgUri
            width="200"
            height="200"
            // source={{ uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg' }}
            svgXmlData= { svg }
          /> */}
          <Text>
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