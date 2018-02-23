import React, { PureComponent } from 'react'

import { FlatList, View, Text, StyleSheet, TextInput, Button, ScrollView, Keyboard, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import ChatView from './ChatView'
import { addMessage, sendMessage } from '../redux/chat'

import users from '../redux/users';
import { Icon } from 'react-native-elements'
import TabbedView from './TabviewAni';
import Tabbed from './TabbedView'
import Emoticons from 'react-native-emoticons';




export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      emoFlex: 0,
      emoji: false,
      sticker:false,
      showEmoticons:true,

    };
  }


  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item }) => (
    <View style={{ transform: [{ scaleY: -1 }] }} >
      <ChatView
        item={item}
        // to send user,friend to chatview
        // sticker = {this.props.sticker}
        user={this.props.user}
        friend={this.props.friend}
      />
    </View>

  )
  toggleEmo = () => {
    if (this.state.emoFlex === 0) {
      this.setState({ emoFlex: 1 })
      Keyboard.dismiss()
      // console.log("sushas stick",this.props.stickers[0]._id);
    }
    else {
      this.setState({ emoFlex: 0 })
      this.state.emoji
      // console.log("sushas stick",this.props.stickers[0]._id);
    }
  }

toggleSticker = ()=>{
    const oldSticker = this.state.sticker;
    // this.setState({emoji: false})
    Keyboard.dismiss()
    this.setState({ sticker: !oldSticker,emoji: false });
}


  clearText = () => {
    if (this.state.message.trim() !== '') {
      this._textInput.clear();
      Keyboard.dismiss()
      this.props.onPress(this.state.message);
      this.setState({ message: '',emoji: false });
    }
  }
  

  toggleEmoji = () => {
    const oldEmoji = this.state.emoji;
    this.setState({sticker: false})
    Keyboard.dismiss()
    // sticker.dismiss()
    this.setState({ emoji: !oldEmoji,sticker: false });
  }
  onPress(x) {
    // this._textInput.clear(); 
    this.setState({
      message: this.state.message + x
    })
  }
  onbackPress(x){
    this._textInput.clear(); 
    // this.setState({
    //   message: this.props.message.slice(message.length-1,message.length)
    // })
    this.setState({
      message:  this.state.message.slice(0,-2)
    })
  }

  _onBackspacePress() {
    if (this.props.onBackspacePress)
        this.props.onBackspacePress();

  }
  render() {
    // console.log("sendMessage");
    // console.log(this.props.friend,this.state.message);
    // console.log("packs",this.props.packs);
    //  console.log("i got in sticker",this.props.sticker)

    if (this.props.messages.length !== '') {
      return (
        <View style={{ height: "100%" }}>
          <View style={{ flex: 1}}>
            <FlatList
              scrollEnabled={true}
              horizontal={false}
              data={this.props.messages}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              style={{ transform: [{ scaleY: -1 }] }}

            />
          </View>

            <View style={styles.input}>
              <TextInput
                accessibilityLabel="MessageTextinput"
                ref={component => this._textInput = component}
                placeholder="Start typing...."
                style={{ flex: 1 }}
                // keyboardType="default"
                value={this.state.message}
                clearButtonMode='while-editing'
                // onFocus={this.setState({emoFlex:0})}
                blurOnSubmit={true}
                clearTextOnFocus={true}
                onSubmitEditing={this.clearText}
                onChangeText={(message) => this.setState({ message: message })}
              />

              <TouchableOpacity onPress={this.clearText}>
                <Icon name="send"
                  accessibilityLabel="SendMessage"
                  size={40} color="#900" />
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"red",width:"100%",flexDirection:"row"}}>
              <TouchableOpacity onPress={this.toggleEmoji}  >
                <Icon name="insert-emoticon" size={40} color="#900" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleSticker }  >
                <Icon name="insert-photo" size={40} color="#900" />
               </TouchableOpacity>
            </View>
            {this.state.sticker &&
              <View style={{ height: 300 }}>
                <TabbedView
                  packs={this.props.packs}
                  tabPress={this.ontabPress}
                  onPress={this.onPressGetSticker}
                  friend={this.props.friend}
                />
              </View>
            }

            
          {this.state.emoji &&
            <View style={{ height: 300 }}>
              {/* <Tabbed onPress={this.onPress.bind(this)} /> */}
              <Emoticons
              //  ref={component => this._textInput = component}
 	         onEmoticonPress={(e)=>this.onPress(e.code)}
 	         onBackspacePress={(e)=>this.onbackPress()}
 	          show={this.state.showEmoticons}
           concise={false}
           asyncRender={true}       
 	          showHistoryBar={true}
 	         showPlusBar={false}
  />  
            </View>
          }
           </View>
      );
    }
    else {
      return (
        <View >
          <View style={{ flex: this.state.emoFlex }} >

            <View style={styles.input}>
              <TouchableOpacity onPress={this.toggleEmo}  >
                <Icon name="insert-emoticon" size={40} color="#900" />
              </TouchableOpacity>
              <TextInput
                accessibilityLabel="MessageTextinput"
                ref={component => this._textInput = component}
                placeholder="Start typing...."
                style={{ flex: 1 }}
                // keyboardType="default"
                value={this.state.message}
                clearButtonMode='while-editing'
                // onFocus={this.setState({emoFlex:0})}
                blurOnSubmit={true}
                clearTextOnFocus={true}
                onSubmitEditing={this.clearText}
                onChangeText={(message) => this.setState({ message: message })}
              />
              <TouchableOpacity onPress={this.clearText}>
              <Icon name="send"
                  accessibilityLabel="SendMessage"
                  size={40} color="#900" />
              </TouchableOpacity>
            </View>
            <TabbedView
              packs={this.props.packs}
              tabPress={this.ontabPress}
              onPress={this.onPressGetSticker}
              friend={this.props.friend}
            />
          </View>
        </View>
      );
    }
  }
}


MessageList.propTypes = {
  messages: PropTypes.array,
  message: PropTypes.object,
  user: PropTypes.object,
  friend: PropTypes.object,
  onPress: PropTypes.func
}
const styles = StyleSheet.create({
  container:{


  },
  input: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // padding: 10,
    height: 40,
    width: "100%",
    backgroundColor: '#e3d0ca',
    // margin: 10,
    // borderRadius: 30,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
})