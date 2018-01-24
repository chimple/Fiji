import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class TapWrongGridComponent extends Component {
    state={ show: false };
    onButtonPress() {
    
        this.setState({ show: true });
    }
    renderbtn() {
        const { containerStyle, textStyle } = styles;
        if(this.state.show){
            return <View />;
        }
        return (
          <TouchableOpacity onPress={this.onButtonPress.bind(this) }>
               <View style={ containerStyle } >
                   <Text style={ textStyle }>{this.props.name}</Text>
                </View>
          </TouchableOpacity>

   
        );
    }
   render () {
       
        return (
           <View>
               {this.renderbtn()}
           </View>
        );
    }
}
const styles = {
    containerStyle: {
        height: 80, 
        width: 80, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#f9ece3',
        borderRadius: 9
    },
    textStyle: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 80 

    }
}
export default TapWrongGridComponent;
