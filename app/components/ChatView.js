import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, ListView, TextInput } from 'react-native';
import PropTypes, { element } from 'prop-types'
//import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'
import { sendMessage, startChat, endChat } from '../redux/chat';


class ChatView extends Component {
  messageShow() {
    if (this.props.item.message && this.props.item.message.type && this.props.item.message.content && this.props.sticker && this.props.sticker.svg !== null) {
      if (this.props.item.message.type === 'text') {
        // console.log("this is a sticker in chat view", this.props.sticker.svg);
        // console.log("this is a message", this.props.item.message.content);
        return (
          <Text>{this.props.item.message.content}</Text>
        );
      }
     else if(this.props.item.message.type === 'sticker') 
     { 
       console.log("this is svg in chat view",this.props.sticker.svg);
       const stickerImage = this.props.sticker.svg;
       console.log("this is stickerID",this.props.sticker._id);
       console.log("this is message content",this.props.item.message.content);
       if(this.props.sticker._id === this.props.item.message.content)
        return (
          // <Text>{this.props.item.message.content}</Text>
          // stickerImage   
          // ?
            <SvgUri
            width="30"
            height="30"
            svgXmlData={Buffer.from(this.props.sticker.svg, 'base64').toString('utf8')}
          /> 
          // // <Text>this is sticker</Text>
          // :
          // this.props.sticker.svg == null
        );
      }
    }

  }



  Eachmsg() {
    //show message from sender
    //  console.log("chatview sticker",this.props.sticker)
    //  if(this.props.sticker !== null){
     
    if (this.props.item.sender === this.props.friend._id)
      return (
        <View style={styles.eachMsg}>

          <Image source={{ uri: 'data:image/png;base64,' + this.props.friend.image }} style={styles.userPic} />
          <View style={styles.msgBlock}>
         {this.messageShow()}
          </View>
        </View>
      );
    return (
      <View style={styles.rightMsg} >
        <View style={styles.rightBlock} >
          {this.messageShow()}
        </View>
        <Image source={{ uri: 'data:image/png;base64,' + this.props.user.image }} style={styles.userPic} />
      </View>
    );

  }
  

  render() {
    // console.log("this is sticker from content::", this.props.item.message.content)
    return (
      this.props.isFetching ?
        <ActivityIndicator />
        :
        <View>
          {this.Eachmsg()}

        </View>
    );
  }


}

ChatView.propTypes = {
  text: PropTypes.string,
  sender: PropTypes.object,
  user: PropTypes.object,
  message: PropTypes.object,
  content: PropTypes.object,
  type: PropTypes.object,
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
    backgroundColor: '#f2f2f2',
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
    backgroundColor: "#f45180",
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
    color: '#ffffff',
    fontWeight: '600',
  },
});
