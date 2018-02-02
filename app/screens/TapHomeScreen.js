import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TapHome from '../components/games/TapHome';

export default class TapHomeScreen extends Component {
 render() {
    return (
        <TapHome item={this.props.navigation.state.params.item} title={this.props.navigation.state.params.title} user={this.props.navigation.state.params.user}/>
    );
  }
}//End of class component
