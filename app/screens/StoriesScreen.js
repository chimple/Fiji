import React, { Component } from 'react'
import { View, Text } from 'react-native'

class StoriesScreen extends Component {
  render() {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Stories</Text>
      </View>
    )
  }
}

export default StoriesScreen