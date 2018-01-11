import React, { PureComponent } from 'react'

import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class GameCategoryList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <Text>
      { item.category }
    </Text>
  )

  render() {
    return (
      <FlatList
        data={this.props.games}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

GameCategoryList.propTypes = {
  games: PropTypes.array,
  onPressItem: PropTypes.func
}
