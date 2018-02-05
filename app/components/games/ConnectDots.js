import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
var count=0;
export default class ConnectDots extends Component {
    
    constructor(props) {
        super(props)
    this.count =0,
      
        this.state = {
            arr1: this.props.array1,
            arr2: this.props.array2,
            hold: null
        }
    } 
    
      
      
    
  arraylist(val) {
     
       console.log("counted values is ", this.state.count);
        
        if (this.props.array1[count] == val  ) {
            count= count+1 
            
        console.log(" this is true", val);
            console.log("counted in if", count);
          
        }
        else  { this.refs.view.bounce(800);

            
         
            console.log(" this is false", val);
           
        }
    
    
    }
  _renderm(){  
   return (
    <Animatable.View ref="view" >
   <TouchableOpacity onPress={() => this.arraylist(this.props.value)}>
  <View style={{ padding: 5 }}>
      <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'red',
          justifyContent: 'space-around',

      }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: 'black', fontSize: 40, }}>{this.props.value}</Text>
          </View>
      </View>
  </View>
</TouchableOpacity>
</Animatable.View>
   );

  }
    render() {
        
        return (

          
            <View>{this._renderm()}</View>


        );
    }
}
ConnectDots.propTypes = {
    value: PropTypes.number,

};