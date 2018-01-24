import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import WordScreen from '../screens/WordScreen';

export default class Grid extends Component {
    state = { show: false };
    onButton() {
   this.setState({ show: true })
    }
rendergrid() {
    if(this.state.show) {
        return (
            <View style={{backgroundColor:'yellow', marginLeft: '1%', marginRight: '1%',height:130,width:140,borderRadius: 30,alignItems:'center',justifyContent:'center' }}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{this.props.name}</Text>
           </View> 
        );
    }
    return (
        <TouchableWithoutFeedback onPress={this.onButton.bind(this)}>
   <View style={styles.gridStyle}>
     <Text style={{fontSize:20,fontWeight:'bold'}}>{this.props.name}</Text>
    </View>
    </TouchableWithoutFeedback>
    );
}
    render() {
        return this.rendergrid();
    }
}
const styles = {
    gridStyle:{ 
      backgroundColor:'white', marginLeft: '1%', marginRight: '1%',height:130,width:140,borderRadius: 30,alignItems:'center',justifyContent:'center'
    }
}