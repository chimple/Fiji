import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';


export default class WordGrid extends Component {
    state = { show: false };
    onButton() {
   this.setState({ show: true });
    }
    render() {
        if(this.state.show) {
            return (
                <View style={styles.gridStyle1}>
                <Text style={{fontSize:60,fontWeight:'bold'}}>{this.props.name}</Text>
               </View> 
            );
        }
        return (
            <TouchableWithoutFeedback onPress={this.onButton.bind(this)}>
       <View style={styles.gridStyle}>
         <Text style={{fontSize:60,fontWeight:'bold'}}>{this.props.name}</Text>
        </View>
        </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    gridStyle:{ 
      backgroundColor:'white', marginLeft: '1%', marginRight: '1%',
      height:110,width:120,borderRadius: 30,alignItems:'center',
      justifyContent:'center'
    },
    gridStyle1:{ 
        backgroundColor:'yellow', marginLeft: '1%', marginRight: '1%',
        height:110,width:120,borderRadius: 30,alignItems:'center',
        justifyContent:'center'
      }
}