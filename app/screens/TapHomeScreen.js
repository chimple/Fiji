import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TapHome from '../components/games/TapHome';
import { fetchSerialData } from '../redux/data'

let count = 0;
let j = 0, i = 0;
let ans = [];
let options = [[]];


class TapHomeScreen extends Component {

  componentDidMount() {
    console.log(count)
    this.props.dispatch(fetchSerialData(1,10));
     
  }

  render() {
   

   
    return (
        <TapHome 
          data={ans}
          data1={options}
        />
    );
  }
}//End of class component

export default connect(state => ({
  gameData: state.data.gameData,
  isFetching: state.data.isFetching,
}))(TapHomeScreen)