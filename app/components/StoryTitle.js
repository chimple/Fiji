import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'

export default class StoryTitle extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title)
  }

  render() {
    return (
      <TouchableOpacity onPress={ this._onPress }>
        <View>
          <Text>
            {this.props.title.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

StoryTitle.propTypes = {
  title: PropTypes.object,
  onPressItem: PropTypes.func
}