import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default class Animbutton extends Component {
  constructor(props) {
     super(props);
     this.state = {
       status: false,
       height,
       width
     };
     Dimensions.addEventListener('change', () => {
      width = Dimensions.get('window').widt;
      height = Dimensions.get('window').height;
    });

   }

   state = Dimensions.get("window");
    handler = dims => this.setState(dims);

    componentDidMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
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
        paddingTop: height * 0.01,
        paddingRight: 20, 
        paddingLeft: 20, 
        backgroundColor: '#bdbdbd', 
        borderRadius: 20,
        width: width * 0.35 }}
        >
          <Text 
          style={{ color: this.state.status ? 'white' : '#696969',
          fontSize: height * 0.08,
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
