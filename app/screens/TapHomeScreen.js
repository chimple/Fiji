import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TapHome extends Component {
  
  
  constructor(){
    super();
    this.state={
    // This is our Default number value
    numberHolder : 4,
    count : 1,
    counter : 1,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }
 
  GenerateRandomNumber=()=>
  {
    var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
    if( RandomNumber > 9 ){
     RandomNumber = RandomNumber % 10;
    }
    this.setState({
    numberHolder : RandomNumber,
    count: 0
    })
  }

 render() {
    const { container, circle, text, subText} = styles;
    const {count, numberHolder} = this.state

    return (
      <View style={container} >
        <View style={circle}>
          <View>
            <Text style={text}>{numberHolder}</Text>
          </View>
        </View> 
        <Text style={subText} onPress={this.GenerateRandomNumber}>{count}</Text>
      </View>
    );
  }
}

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
  fontSize: 75,
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
},
};