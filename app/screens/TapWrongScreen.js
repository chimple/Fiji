import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TapWrongGridComponent from '../components/games/TapWrongGridComponent';

class TapWrongScreen extends Component {
   
  render() {
      return (
           <View style={{ flex: 1, backgroundColor: '#3d3a38'  }}>
                       <View style={{ alignItems: 'center', marginTop: '10%' }}><Text style={{ color: '#f9ece3', fontSize: 40 }}>DOG</Text></View>
               <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                         <TapWrongGridComponent name={'D'} />
                         <TapWrongGridComponent name={'O'} />
                         <TapWrongGridComponent name={'O'} />
                         <TapWrongGridComponent name={'G'} />
                </View>
                <TouchableOpacity>
                   <View style={{ borderRadius: 8, marginLeft: '60%',marginBottom: '10%', height: 50, width: 90, backgroundColor: '#f9ece3', alignItems: 'center' }}>
                       <Text style={{ color: 'black', fontSize: 30 }}>HINT</Text>
                   </View>
                </TouchableOpacity>
           </View>
       );
   }
}
export default TapWrongScreen;
