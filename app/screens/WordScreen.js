import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import WordGrid, { WordTest } from '../components/games/WordGrid';

export default class WordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        array1: [],
        jsonData: {
            object: {
                object1: {
                    arr1: ['D','O','G'],
                    arr2: ['A']
                },
                object2: {
                    arr1: [2, 3, 4, 5, 6],
                    arr2: [5, 7, 8, 9," ", " "," "]

                },
                object2: {
                    arr1: [5,6, 7, 8, 9],
                    arr2: [8, 3, 4, 5, " ", " ", " "]

                }

            }
        }
    }
}
 render() {
    const data1 = this.state.jsonData.object.object1.arr1;
    const data2 = this.state.jsonData.object.object1.arr2;
 return(
     <View style={{flex:1, backgroundColor:'blue'}}>

        <View style={{flex:1,justifyContent:'center',alignItems:'center',
               }}>
                      
                <View style={{flexWrap:'wrap',flexDirection: 'row',
                      height:300,width:300,marginTop:'10%',paddingLeft:'6%'}}>
                     
                      {data1.map((element, i) => (
                  <WordGrid name={element}
                      key={i} data1={data1} data2={data2} />))}
                   {data2.map((element, key) => (
                  <WordGrid
                    name={element} key={key} data2={data2} data1={data1}/>))}
                </View> 
        </View>
            
          <View style={{flex:.2,paddingBottom:'9%',alignItems:'center'}}>
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
    backgroundColor:'white',flex:2,borderRadius: 30,
    alignItems:'center',justifyContent:'center'
  },
  hintStyle:{
    backgroundColor:'yellow',height:50,width:120,
    alignItems:'center',justifyContent:'center', borderRadius: 10  
  },
  boxStyle:{
    borderColor:'white',borderRadius: 10,borderWidth:1.8,
    height:40,width:40,marginLeft:'2%'  
  },
  viewStyle: {
    backgroundColor: 'lightgreen',alignItems:'center',height:80,
    shadowColor:'#000',shadowOpacity:0.2,
    shadowOffset:{ width:0,height:2}, elevation: 10
  },
  textStyle: {
    fontSize: 40
  }
}
