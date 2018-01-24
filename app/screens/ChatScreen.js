import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MessageList from '../components/MessageList'
import { startChat, endChat,sendMessage } from '../redux/chat'

class ChatScreen extends Component {
  componentDidMount() {
    this.props.dispatch(startChat(this.props.navigation.state.params.friend))
  }
  componentWillUnmount() {
    this.props.dispatch(endChat())
  }

  _onPress = (message) => {
    // if(message !== null)
    this.props.dispatch(sendMessage(this.props.navigation.state.params.friend, message))
  }

  render() {
    // console.log("friend");
    // console.log(this.props.navigation.state.params.friend);
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
                user={this.props.user}
                friend={this.props.navigation.state.params.friend}
                onPress= { this._onPress }
              />
            :
            <MessageList
                messages = { this.props.messages }
                navigation={ this.props.navigation }
                user={this.props.user}
                friend={this.props.navigation.state.params.friend}
                onPress= { this._onPress }
              />
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