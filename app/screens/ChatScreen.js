import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MessageList from '../components/MessageList'
import { fetchChat } from '../redux/chat'

class ChatScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchChat(this.props.navigation.state.params.friend))
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.messages.length
            ?
              <MessageList
                messages = { this.props.messages }
                navigation={ this.props.navigation }
              />
            :
              <View>
                <Text>No messages found</Text>
              </View>
    )
  }
}

ChatScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        friend: PropTypes.object.isRequired
      })
    })
  })
}

export default connect(state => ({
  messages: state.chat.messages,
  isFetching: state.users.isFetching,
  user: state.auth.user
}))(ChatScreen)