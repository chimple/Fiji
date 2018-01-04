import React, { Component } from 'react'
import { View, Text } from 'react-native'

class GamesScreen extends Component {
  render() {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Games</Text>
      </View>
    )
  }
}

export default GamesScreen