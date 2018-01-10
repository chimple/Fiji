import React, { PureComponent } from 'react'

import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import StoryTitle from './StoryTitle'

export default class StoryList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <StoryTitle
      title = { item }
      onPressItem = { this.props.onPressItem }
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.titles}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

StoryList.propTypes = {
  titles: PropTypes.array,
  onPressItem: PropTypes.func
}
