import React, { PureComponent } from 'react'

import { FlatList, View, Text,StyleSheet,TextInput, Button, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import ChatView from './ChatView'
import { addMessage,sendMessage } from '../redux/chat'
import users from '../redux/users';



export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  
  
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    <View style={{ transform: [{ scaleY: -1 }]}} >
       <ChatView 
      item = {item}
      // to send user,friend to chatview
     user={this.props.user}
       friend={this.props.friend}
     />
    </View>
   
  )

  render() {
    console.log("sendMessage");
    console.log(this.props.friend,this.state.message);

    if(this.props.messages.length !== 0){
        return (
      <View >
        <View style={{backgroundColor:"#ffffff",height:"100%"}}>
        <FlatList
      scrollEnabled ={true}
      horizontal={false}

        data={this.props.messages }
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{  transform: [{ scaleY: -1 }] }}

      />
       <View style={styles.input}>
      <TextInput

              placeholder="please type here"
              style={{ flex: 1 }}
              value={this.state.message}
              clearButtonMode = 'while-editing'
              blurOnSubmit={true}
              clearTextOnFocus={true}
              onEndEditing={(message) => this.clear({message})}
              onSubmitEditing={(message) => this.clear({message})}
              onChangeText={(message) => this.setState({ message })}
          />
          <TouchableOpacity onPress={() => this.props.onPress(this.state.message)}>
         <Image source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/1054386-200.png'}} 
          onPress={() => this.props.onPress(this.state.message)} style={{height:40,width:40 }}/>
          </TouchableOpacity>
</View>
</View>

</View>
  
    );
  }
    else{
      return(
        <View >
        <View style={{backgroundColor:"#ffffff",height:"100%",justifyContent:"flex-end"}}>
      <View style={styles.input}>
      <TextInput

              placeholder="please type here"
              style={{ flex: 1 }}
              clearButtonMode = 'while-editing'
              blurOnSubmit={true}
              value={this.state.message}
              ref={input => { this.textInput = input }}
              // onSubmitEditing={() => sendMessage.bind(this.props.friend,this.state.message)}
              onChangeText={(message) => this.setState({ message })}
/>
<TouchableOpacity onPress={() => this.props.onPress(this.state.message)}>
         <Image source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/1054386-200.png'}} 
          onPress={() => this.props.onPress(this.state.message)} style={{height:40,width:40 }}/>
          </TouchableOpacity>
</View>
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
  padding: 10,
  // height: 60,
  width: "90%",
  backgroundColor: '#fffa12',
  margin: 10,
  borderRadius: 30,
  shadowColor: '#3d3d3d',
  shadowRadius: 2,
  shadowOpacity: 0.5,
  shadowOffset: {
    height: 1,
  },
},
})