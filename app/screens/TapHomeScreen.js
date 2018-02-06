import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TapHome from '../components/games/TapHome';
import { fetchSerialData } from '../redux/data'

let count = 0;

class TapHomeScreen extends Component {

  componentDidMount() {
    console.log(count)
    this.props.dispatch(fetchSerialData(1,10));
    count++;
    
  }


 render() {
  
   console.log(count)
   console.log(this.props.gameData)
   console.log(this.props.navigation.state.params.item.name)
   console.log(this.props.navigation.state.params.game.name)
   console.log(this.props.navigation.state.params.user.name)
    return (
        <TapHome 
          item={this.props.navigation.state.params.item} 
          game={this.props.navigation.state.params.game} 
          user={this.props.navigation.state.params.user}
          data={this.props.gameData}
        />
    );
  }
}//End of class component

export default connect(state => ({
  gameData: state.data.gameData,
  isFetching: state.data.isFetching,
}))(TapHomeScreen)