import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TapHome from '../components/games/TapHome';

export default class TapHomeScreen extends Component {
 render() {
  const { navigate } = this.props.navigation;
    return (
        <TapHome navigate={navigate} />
    );
  }
}//End of class component
