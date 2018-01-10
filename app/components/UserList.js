import React, { PureComponent } from 'react'

import { FlatList } from 'react-native'
import PropTypes from 'prop-types'

import User from './User'

class UserList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <User
      user = { item }
      onPressItem = { this.props.onPressItem }
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.users}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  onPressItem: PropTypes.func
}

export default UserList