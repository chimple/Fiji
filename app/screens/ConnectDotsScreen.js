import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ConnectDots from '../components/games/ConnectDots';
//import Connectdatascreen from './ConnectDatascreen';

import { fetchConsecutiveData} from '../redux/data';
var j=0;
var k=0;
var arr1 = [];
var arr2 = [];

 class ConnectDot extends Component {

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
    componentDidMount() {
        this.props.dispatch(fetchConsecutiveData(1, 6, 3, 1))
      }
    render() 
    
    {arr1=[];
        j=0;
        arr2=[];
        k=0;
        const data1 = this.state.jsonData.object.object1.arr1;
        const data2 = this.state.jsonData.object.object1.arr2;
        console.log("data", data1);
        const data=this.props.gamedata.map( function (item, i){
            console.log("data is serial 111222", item.serial)
           
            item.serial.map(function(element, i) {
                arr1[j]=element;
                j++;
                console.log(element);
              });
              
              console.log(" asbbsjdbjhbjbd", arr1);

              item.others.map(function(element, i) {
                 arr2[k]=element;
                 k++;

                console.log(element);
              });
            console.log("data is serial 111222", item.serial[0])
           
            console.log("data is others2222", item.others)

        }
    )
    console.log(" value stored from series to array1 ", arr1);
    console.log(" value stored from others  to array2 ", arr2);
     
        console.log("this datagame props ", this.props.gamedata)


        return (
            
            <View style={{flex: 1,alignItems:'center',  backgroundColor: 'gray'}}>
          
              <View style={{flex: .1,  backgroundColor: 'gray'}} />
            <View style={{flex:6,flexWrap: 'wrap',width:400,paddingLeft:38,flexDirection:'row', }} >
                {arr1.map((element, i) => (
   
                    <ConnectDots value={element} navigation={this.props.navigation}
                    key={element.value} array1={arr1} array2={arr2}/>))}


                {arr2.map((element, key) => (

                    <ConnectDots
                        value={element} key={element.value} array1={arr1} array2={arr2}navigation={this.props.navigation} />)) }


               </View>
               
            </View>
           

        );
    }

}
ConnectDot.propTypes = {
    serial: PropTypes.array,
    others: PropTypes.array,
}

export default connect(state => ({
    gamedata: state.data.gameData,
    isFetching: state.data.isFetching
  }))(ConnectDot)