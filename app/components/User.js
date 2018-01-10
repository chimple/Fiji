import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'

export default class User extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.user)
  }

  render() {
    return (
      <TouchableOpacity onPress={ this._onPress }>
        <View>
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