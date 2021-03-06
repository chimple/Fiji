import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchStickerPacks, fetchStickerFailure } from '../redux/sticker'
import MessageList from '../components/MessageList'
import { startChat, endChat,sendMessage } from '../redux/chat'

class ChatScreen extends Component {
  componentDidMount() {
    this.props.dispatch(startChat(this.props.navigation.state.params.friend))
    this.props.dispatch(fetchStickerPacks())
  }
  componentWillUnmount() {
    this.props.dispatch(endChat())
    this.props.dispatch(fetchStickerFailure())
  }
  _onPress = (message) => {
    // if(message !== null)
    this.props.dispatch(sendMessage(this.props.navigation.state.params.friend,message,'text'))
  } 
 
  render() {
    // console.log("friend");
    // console.log(this.props.navigation.state.params.friend);
    // console.log("this is my chatscreen sticker",this.props.stickers);
    // console.log("sticker bought ",this.props.sticker);
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
                packs={this.props.packs}
                user={this.props.user}
                sticker={this.props.sticker}
                friend={this.props.navigation.state.params.friend}
                onPress= { this._onPress }
                onTabPress = {this._onTabpress}
              />
            :
            <MessageList
            messages = { this.props.messages }
            navigation={ this.props.navigation }
            packs={this.props.packs}
            user={this.props.user}
            sticker={this.props.sticker}
            friend={this.props.navigation.state.params.friend}
            onPress= { this._onPress }
            onTabPress = {this._onTabpress}
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
  packs: state.sticker.packs,
  stickers: state.sticker.stickers,
  sticker: state.sticker.sticker,
  isFetching: state.users.isFetching,
  user: state.auth.user
}))(ChatScreen)