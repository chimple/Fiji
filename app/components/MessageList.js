import React, { PureComponent } from 'react'

import { FlatList, View, Text,StyleSheet,TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native'
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
        return (
      <View >
        <View style={{backgroundColor:"#f3ed23",height:"100%"}}>
        <FlatList
      scrollEnabled ={true}
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
              // onSubmitEditing={() => sendMessage.bind(this.props.friend,this.state.message)}
              onChangeText={(message) => this.setState({ message })}
/>
<Button    onPress={() => this.props.onPress(this.state.message)}
  title="Learn More"
  color="#841584"
/>
</View>
</View>
</View>
    )
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
})