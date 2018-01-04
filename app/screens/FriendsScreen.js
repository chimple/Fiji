import React, { Component } from 'react'
import { View, Text } from 'react-native'

class FriendsScreen extends Component {
  render() {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Friends</Text>
      </View>
    )
  }
}

export default FriendsScreen