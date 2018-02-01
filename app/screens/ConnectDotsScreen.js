import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ConnectDots from '../components/games/ConnectDots';

export default class ConnectDot extends Component {
    constructor(props) {
        super(props);
     

        this.state = {
            array1: [],
            jsonData: {
                object: {
                    object1: {
                        arr1: [1, 2, 3, 4, 5],
                        arr2: [4, 8, 5, 9, 1, 6, 8]
                    },
                    obeject2: {
                        arr1: [2, 3, 4, 5, 6],
                        arr2: [5, 7, 8, 9," ", " "," "]

                    },
                    obeject2: {
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
        console.log("data", data1);
        
        return (
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                
               backgroundColor: 'gray',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                flexDirection: 'row',
                width: '100%',
                height: '100%'
            }}>

     
                {data1.map((element, i) => (
   
                    <ConnectDots value={element}
                    key={element.value} array1={data1} array2={data2}/>))}


                {data2.map((element, key) => (

                    <ConnectDots
                        value={element} key={element.value} array1={data1} array2={data2} />)) }




            </View>

        );
    }

}