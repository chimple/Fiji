import React, { PureComponent } from 'react'

import { FlatList, View, Text,StyleSheet,TextInput, Button, ScrollView,Keyboard, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import ChatView from './ChatView'
import { addMessage,sendMessage } from '../redux/chat'

import users from '../redux/users';
import {Icon} from 'react-native-elements'
import TabbedView from './TabviewAni';



export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      emoFlex: 0

    };
  }

  
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <View style={{ transform: [{ scaleY: -1 }]}} >
       <ChatView 
      item = {item}
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
      // console.log("sushas stick",this.props.stickers[0]._id);
    }
  }


  clearText =()=>{
    if(this.state.message.trim() !== ''){
    this._textInput.clear();
    this.props.onPress(this.state.message);
    this.setState({ message: '' });
    }
  }

  render() {
    // console.log("sendMessage");
    // console.log(this.props.friend,this.state.message);
     // console.log("packs",this.props.packs);
     console.log("i got in sticker",this.props.sticker)

    if(this.props.messages.length !== ''){
        return (
    <View style={{ height: "100%" }}>
          <View style={{ flex: 1 }}>
            <FlatList
              scrollEnabled={true}
              horizontal={false}
              data={this.props.messages}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              style={{ transform: [{ scaleY: -1 }] }}

            />
          </View>
          <View style={{ flex: this.state.emoFlex }} >

            <View style={styles.input}>
              <TouchableOpacity onPress={this.toggleEmo}  >
                <Icon name="insert-emoticon" size={40} color="#900" />
              </TouchableOpacity>
              <TextInput
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
                  size={40} color="#900" />
              </TouchableOpacity>
            </View>

           
            <TabbedView
            packs= {this.props.packs}
            tabPress = {this.ontabPress}
            onPress = {this.onPressGetSticker}
            friend={this.props.friend}
            />
          </View>
        </View>

      );
    }
    else{
      return(
        <View >
        <View style={{ flex: this.state.emoFlex }} >

<View style={styles.input}>
  <TouchableOpacity onPress={this.toggleEmo}  >
    <Icon name="insert-emoticon" size={40} color="#900" />
  </TouchableOpacity>
  <TextInput
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
      size={40} color="#900" />
  </TouchableOpacity>
</View>


<TabbedView
packs= {this.props.packs}
tabPress = {this.ontabPress}
onPress = {this.onPressGetSticker}
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
  user:PropTypes.object,
  friend:PropTypes.object,
  onPress: PropTypes.func
}
const styles = StyleSheet.create({

input: {
  flexDirection: 'row',
  // alignItems: 'flex-end',
  justifyContent:"flex-end",
  alignItems:"flex-end",
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