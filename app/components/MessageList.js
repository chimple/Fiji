import React, { PureComponent } from 'react'

import { FlatList, View, Text,StyleSheet,TextInput } from 'react-native'
import PropTypes from 'prop-types'
import ChatView from './ChatView'
import { addMessage,sendMessage } from '../redux/chat'
import users from '../redux/users';

export default class MessageList extends PureComponent {
 
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item,user,friend}) => (
    <View >
      <ChatView 
      item = {item}
      user={this.props.user}
      friend={this.props.friend}
     />
    </View>
   
  )

  render() {
        return (
      
      <FlatList
        data={this.props.messages }
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />

    )
  }
}


MessageList.propTypes = {
  messages: PropTypes.array,
  user:PropTypes.object,
  friend:PropTypes.object
 
}

