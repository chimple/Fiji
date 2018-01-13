import React, { PureComponent } from 'react'

import { FlatList, View, StyleSheet } from 'react-native'
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
      <View style={styles.UserListStyle}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}
        data={this.props.users}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      </View>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  UserListStyle:{flex:1,
  backgroundColor:'#c9b57c', 
  paddingTop:'8%', 
  paddingLeft:'6%', 
  paddingRight:'4%'}
});

export default UserList