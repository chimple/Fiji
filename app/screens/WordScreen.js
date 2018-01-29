import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Grid from '../components/games/Grid';

export default class WordScreen extends Component {
 render() {
     return(
      <View style={{flex:1, backgroundColor:'blue'}}>
        <View style={{flex:1,justifyContent:'center', flexDirection: 'column',alignItems:'center'}}>
          <View style={{flexDirection: 'row',paddingBottom:'2%'}}>
            <Grid name={'D'} />
            <Grid name={'A'} />
            </View>
            <View style={{flexDirection: 'row'}}>
            <Grid name={'O'} />
            <Grid name={'G'} />
            </View>
          </View> 
                <View style={{flex:.2,flexDirection:'row'}}>
                  <View>
                    <Text>ed</Text>
                  </View>
                  
                </View>
                <View style={{flex:.1,paddingBottom:'4%',alignItems:'center'}}>
                    <TouchableOpacity  style={styles.hintStyle}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>HINT</Text>
                    </TouchableOpacity >
                </View>

        </View>
     );
 }
}

const styles = {
  gridStyle:{
    backgroundColor:'white',flex:2,borderRadius: 30,alignItems:'center',justifyContent:'center'
  },
  hintStyle:{
    backgroundColor:'yellow',
    height:50,
    width:120,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10  
  },
  boxStyle:{
    backgroundColor:'white',flex:1,borderRadius: 30  
  }
}
