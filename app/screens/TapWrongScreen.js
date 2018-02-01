import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation';
import TapWrongGridComponent from '../components/games/TapWrongGridComponent';

class TapWrongScreen extends Component {

    constructor(props) {
        super(props);
     

        this.state = {
            array1: [],
            jsonData: {
                object: {
                    object1: {
                        arr1: ['D','O','G'],
                        arr2: ['O']
                    }

                }
            }
        }
    }
    componentDidMount() {
        
        Orientation.lockToLandscape();
    }
    
   
    componentWillUnmount() {
        
        Orientation.unlockAllOrientations();
    }

  render() {
    const data1 = this.state.jsonData.object.object1.arr1;
    const data2 = this.state.jsonData.object.object1.arr2;
    //console.log("data", data1);
      return (
           <View style={{ flex: 1, backgroundColor: '#3d3a38'  }}>
                       <View style={{ alignItems: 'center', paddingTop: 10 }}><Text style={{ color: '#f9ece3', fontSize: 40 }}>DOG</Text></View>
               <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        

                         {data1.map((element, i) => (

                      <TapWrongGridComponent name={element}
                   key={element.name} array1={data1} />))}


                  {data2.map((element, k) => (

                     <TapWrongGridComponent
                   name={element} key={element.name} array2={data2}/>))}

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
export default TapWrongScreen;
