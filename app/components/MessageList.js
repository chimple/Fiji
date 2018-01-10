import React, { PureComponent } from 'react'

import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class MessageList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <View>
      <Text>
        {item.text}
      </Text>
    </View>
  )

  render() {
    return (
      <FlatList
        data={this.props.messages}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.array
}
