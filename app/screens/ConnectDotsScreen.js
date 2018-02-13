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

 export default class ConnectDotsScreen extends Component {

    constructor(props) {
        super(props);
     
    }
  
    render() {
    
   
  console.log('data ',this.props.data);

        return (
            
            <View style={{flex: 1,alignItems:'center',  backgroundColor: 'gray'}}>
          
              <View style={{flex: .1,  backgroundColor: 'gray'}} />
            <View style={{flex:6,flexWrap: 'wrap',width:400,paddingLeft:38,flexDirection:'row', }} >
                {this.props.data.serial.map((element, i) => (
   
                    <ConnectDots value={element}
                    key={element.value} array1={this.props.data.serial} array2={this.props.data.others}/>))}


                {this.props.data.others.map((element, key) => (

                    <ConnectDots
                        value={element} key={element.value} array1={this.props.data.serial} array2={this.props.data.others} />)) }


               </View>
               
            </View>
           

        );
    }

}
ConnectDotsScreen.propTypes = {
    data: PropTypes.object
}

