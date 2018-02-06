import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TapHome from '../components/games/TapHome';

export default class TapHomeScreen extends Component {
 render() {
   console.log(this.props.navigation.state.params.item.name)
   console.log(this.props.navigation.state.params.game.name)
   console.log(this.props.navigation.state.params.user.name)
    return (
        <TapHome item={this.props.navigation.state.params.item} game={this.props.navigation.state.params.game} user={this.props.navigation.state.params.user}/>
    );
  }
}//End of class component
