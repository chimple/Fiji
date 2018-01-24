import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import ButtonFlip from '../../components/games/ButtonFlip';

export default class MemoryMatchingScreen extends Component {
  _renderMatrix() {
    const array = [];
    for(let i=0; i<4; i++)
    { let inputRow = [];
      for(let j=0; j<3; j++){
        inputRow.push(<View><Animatedbasic/></View>);
      }
    array.push(<View style={styles.matrixContainer}>{inputRow}</View>)
    }
      return array;
  }

render() {
  return (
  <View>{this._renderMatrix()}</View>
);
}
}

const styles = StyleSheet.create({
  matrixContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10,
    },

});
