import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default class Animbutton extends Component {
  constructor(props) {
     super(props);
     this.state = {
       status: false
     };
   }
   _onPress() {
     this.props._onPress(!this.state.status);
     this.setState({ status: this.state.status });
     switch (this.props.effect) {
       case 'bounce':
         this.refs.view.bounce(100);
         break;
       case 'flash':
         this.refs.view.flash(100);
         break;
       case 'jello':
         this.refs.view.jello(100);
         break;
       case 'pulse':
         this.refs.view.pulse(100);
         break;
       case 'rotate':
         this.refs.view.rotate(100);
         break;
       case 'rubberBand':
         this.refs.view.rubberBand(100);
         break;
       case 'shake':
         this.refs.view.shake(100);
         break;
       case 'swing':
         this.refs.view.swing(100);
         break;
       case 'tada':
         this.refs.view.tada(100);
         break;
       case 'wobble':
         this.refs.view.wobble(100);
         break;
     }
   }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this._onPress()}>
        <Animatable.View 
        ref="view" 
        style={{ margin: 10, 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingRight: 20, 
        paddingLeft: 20, 
        backgroundColor: '#bdbdbd', 
        borderRadius: 20,
        width: width * 0.4 }}
        >
          <Text 
          style={{ color: this.state.status ? 'white' : '#696969',
          fontSize: 56,
          fontWeight: 'bold',
          alignSelf: 'center',
          justifyContent: 'center' }}
          >
          {this.props.text}
          </Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
}
