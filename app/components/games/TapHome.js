import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Confirm from './Confirm';

export default class TapHome extends Component {
  
  constructor(){
    super();
    this.state={
      // This is our Default number value
      numberHolder : 4, 
      counter : 0,
      count : '',
      showModal: false
    }
  }

  componentDidMount() {

    //This will start timer and will update text value
    setInterval(() => {
      let temp = this.state.count - this.state.numberHolder
      if((this.state.count - this.state.numberHolder) > 2){
        this.setState({count:  this.state.numberHolder -  3 })
      }

      if((this.state.numberHolder - this.state.count) > 2){
        this.setState({count: this.state.numberHolder -  2 })
      }

      else{
        this.setState({count: this.state.count + 1})
      }
    }, 2000)
  }
 
  //This will generate random number and will check on tap condition
  GenerateRandomNumber=()=>
  {
    if( this.state.numberHolder == this.state.count ) {
      var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
      if( RandomNumber > 9 ){
        RandomNumber = RandomNumber % 10;
      }

      if( RandomNumber == 0 ){
        RandomNumber = RandomNumber + 1;
      }
      if( RandomNumber == 1 ){
        this.setState({
          count: 0
        })
      }
      if( RandomNumber == 2 ){
        this.setState({
          count: 0
        })
      }
      this.setState({
      numberHolder : RandomNumber,
      })
    }
    else {
      this.setState({
       showModal: !this.state.showModal 
      })
    }
  }

  onAccept() {

  }

  onDecline() {
   this.setState({ showModal: false });
   this.props.navigate('Game2');
  }

 render() {
    const { container, circle, text, subText} = styles;
    const {count, numberHolder} = this.state

   // const {goBack} = this.props.navigation;

    return (
      <View style={container} >
        <View style={circle}>
          <View>
            <Text style={text}>{numberHolder}</Text>
          </View>
        </View> 
        <Text style={subText} onPress={this.GenerateRandomNumber}>{count}</Text>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          OPS! TOO LATE
        </Confirm>
      </View>
    );
  }
}//End of class component

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#576A6E'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120/2,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '20%'
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 60,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  subText: {
    fontFamily: 'Cochin',
    fontSize: 90,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:'10%'
  },
};//End of styles