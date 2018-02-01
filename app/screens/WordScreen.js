import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import WordGrid from '../components/games/WordGrid';

export default class WordScreen extends Component {
 render() {
     return(
      <View style={{flex:1, backgroundColor:'blue'}}>
        <View style={{flex:1,justifyContent:'center', flexDirection: 'column',alignItems:'center', height:'100%',width:'100%'
        ,paddingTop:'3%'}}>
          <View style={{flexDirection: 'row',paddingBottom:'2%'}}>
            <WordGrid name={'D'} />
            <WordGrid name={'A'} />
            </View>
            <View style={{flexDirection: 'row'}}>
            <WordGrid name={'O'} />
            <WordGrid name={'G'} />
            </View>
          </View> 
                <View style={{flex:.2,flexDirection:'row',justifyContent:'center'}}>
                  <View style={styles.boxStyle}>
                 
                  </View>
                  <View style={styles.boxStyle}>
           
                  </View>
                  <View style={styles.boxStyle}>
                   
                  </View>
                  
                </View>
                <View style={{flex:.1,paddingBottom:'4%',alignItems:'center', height:'100%',width:'100%'}}>
                    <TouchableOpacity  style={styles.hintStyle}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Hint</Text>
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
    borderColor:'white',borderRadius: 10,borderWidth:1.8,height:40,width:40,marginLeft:'2%'  
  }
}
