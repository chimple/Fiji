import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, ListView, TextInput } from 'react-native';
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'
import { sendMessage, startChat } from '../redux/chat';


class ChatView extends Component {
  
  render() {

    console.log("this is sender::" + this.props.item.sender)
    console.log("this is user::" + this.props.friend._id)
    const Eachmsg = (props) => {
      //show message from sender
      if (this.props.item.sender == this.props.friend._id) 
        return (
          <View style={styles.eachMsg}>
            <Image source={{ uri: 'data:image/png;base64,' + this.props.friend.image }} style={styles.userPic} />
              <View style={styles.msgBlock}>
              <Text style={styles.msgTxt}>{this.props.item.text}</Text>
            </View>
          </View>
        );

        return (
          <View style={styles.rightMsg} >
            <View style={styles.rightBlock} >
              <Text style={styles.rightTxt}>{this.props.item.text}</Text>
            </View>
            <Image source={{ uri: 'data:image/png;base64,' + this.props.user.image }} style={styles.userPic} />
          </View>
        );
      
    }
    return (
          <View>
          <Eachmsg />
          </View>
    );

  }
}

ChatView.propTypes = {
  text: PropTypes.object,
  sender: PropTypes.object,
  user: PropTypes.object,
  message: PropTypes.object,
  friend: PropTypes.object,
  image: PropTypes.object
}
export default ChatView;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    // height: 60,
    width: "90%",
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 30,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor:"#19a4f2",
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor:"#19a4f2",
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    // backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#edeeef',
    padding: 10,
    shadowColor: '#adef12',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor:"#19a4f2",
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});
