import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux'

import TapWrongGridComponent from '../components/games/TapWrongGridComponent';
import { fetchWordData } from '../redux/data';
var j=0;
var k=0;
var arr1 = [];
var arr2 = [];
var x=0;
var arr3=[];
class TapWrongScreen extends Component {

    constructor(props) {
        super(props);
       

    }
    componentDidMount() {
      
        console.log("word data expected11",arr1);
        Orientation.lockToLandscape();
        this.props.dispatch(fetchWordData(1,3,1,1))
       
    }
    
   
    componentWillUnmount() {
        
        Orientation.unlockAllOrientations();
    }
renderr() {
   
   
    
}
  render() {

    var rr = Math.floor(Math.random() * 3) + 0 ;
    console.log("my random num",rr);
    arr1=[];
    arr2=[];
    k=0;j=0;
    const data1 = this.state.jsonData.object.object1.arr1;
    const data2 = this.state.jsonData.object.object1.arr2;
   console.log("json",this.state.jsonData.object.object1);
    console.log("my data",this.props.gameData);
 
    const data=this.props.gameData.map( function (item, i){
      //  console.log("data is serial 111222", item.serial)
    
    item.word.map(function(element, i) {
      
       
        arr1[j]=element;
        j++;
       // console.log(element);
      });
    //  console.log(" asbbsjdbjhbjbd", arr1);

      item.others.map(function(element, i) {
         arr2[k]=element;
         k++;

       // console.log(element);
      });
    }
)
let q=0;
arr3=[];
for(let w=0;w<(k+j);w++){
    if(w==rr) {
        arr3[w]=arr2[0];
        w++;
    }
    arr3[w]=arr1[q];
    q++;
}
console.log("new array",arr3);
   console.log("word data expected",arr1);
   console.log("word data expected",arr2);
  //  console.log("my data",this.props.isFetching);
  //  console.log("my data",data1);
   // const data3 = this.props.gameData[0];
//console.log("first data",this.props.word);

return (
          
    <View style={{ flex: 1, backgroundColor: '#3d3a38'  }}>
                <View style={{ alignItems: 'center', paddingTop: 10 }}><Text style={{ color: '#f9ece3', fontSize: 40 }}>DOG</Text></View>
        <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                 

      
        {arr3.map((element, i) => (
            
                      <TapWrongGridComponent  navigation={this.props.navigation}
                      name1={element} key={i} key1={i} correct={arr1} wrong={arr3} />))}

                
                   

         </View>
         <TouchableOpacity>
            <View style={{ borderRadius: 8, marginLeft: '60%',marginBottom: '5%', height: 50, width: 90, backgroundColor: '#f9ece3', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 30 }}>HINT</Text>
            </View>
         </TouchableOpacity>
    </View>
);

   }
}
export default connect(state => ({
   
    isFetching: state.data.isFetching,
    gameData: state.data.gameData,
   
}))(TapWrongScreen);
