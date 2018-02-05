import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isPhone, isTablet } from './Platform';

let timerId; 
let width;

export default class TapHome extends Component {

  constructor() {

    super();
    this.state = {
      // This is our Default number value
      numberHolder: 4,
      score: 0,
      count: 2,
      showModal: false
    };

    Dimensions.addEventListener('change', () => {
      width = Dimensions.get('window').height * 0.225;
      console.log(width);
    });

    width = Dimensions.get('window').height * 0.225;
    console.log(width);

  }

  timer = () => {

    if ((this.state.count - this.state.numberHolder) > 2) {
      this.setState({ count: this.state.numberHolder - 3 })
    }

    if ((this.state.numberHolder - this.state.count) > 2) {
      this.setState({ count: this.state.numberHolder - 2 })
    }

    else {
      this.setState({ count: this.state.count + 1 })
    }
  }

  componentDidMount() {

    //This will start timer and will update text value
    timerId = setInterval(this.timer, 1700)
  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = () => {
    if (this.state.numberHolder == this.state.count) {
      this.refs.view.zoomIn(500).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
      var RandomNumber = Math.floor(Math.random() * 100) + 1;
      if (RandomNumber > 9) {
        RandomNumber = RandomNumber % 10;
      }

      if (RandomNumber == 0 || RandomNumber == 1) {
        RandomNumber = RandomNumber + 7;
      }

      else if (RandomNumber == 2) {
        RandomNumber = RandomNumber + 4;
      }
      this.setState({
        numberHolder: RandomNumber,
        count: RandomNumber - 3,
        score: this.state.score + 1,
      })

      //condition for increasing speed
      if (this.state.score > 1 && this.state.score <= 3) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 1400);
      }
      else if (this.state.score > 3 && this.state.score <= 6) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 1000);
      }
      else if (this.state.score > 6 && this.state.score <= 9) {
        clearInterval(timerId)
        timerId = setInterval(this.timer, 800);
      }
      else if (this.state.score > 9 && this.state.score <= 13) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 600);
      }
      else if (this.state.score > 13) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 500);
      }
    }
    else {
      this.refs.view.shake(500).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
      this.setState({
        count : this.state.numberHolder - 3
      });

    }
  }

  onAccept() {
    this.setState({
      numberHolder: 4,
      score: 0,
      count: 2,
      showModal: false,
    });
    clearInterval(timerId);
    timerId = setInterval(this.timer, 2000);
  }

  onDecline() {
    this.setState({ showModal: false });
    this.props.navigate('Game');
  }

  render() {

    if ( isLandscape() ) {
      const { container, SubContainer, circle, text, subText, scoreText } = stylesLandscape;
      const { count, numberHolder, score } = this.state;

      if(this.state.showModal == false ) {
      return (
        <View style={{ flex: 1, backgroundColor: '#27ae60'}}>
         <Text style={[scoreText, { fontSize: fontSizer(width) - 20}]}>score: {score}</Text>
        <View style={container} >
          <View style={[circle, {width: width + 40, height: width + 40, borderRadius: width + 40 / 2 }]}>
            <View>
              <Animatable.View ref="view">
                <Text style={[text, {fontSize: fontSizer(width)}]}>{numberHolder}</Text>
              </Animatable.View>
            </View>
          </View>
          <TouchableOpacity onPress={this.GenerateRandomNumber}>
            <Text style={[subText, {fontSize: fontSizer(width) + 30 }]}>{count}</Text>
          </TouchableOpacity>
         
          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Try Again
          </Confirm>
          </View>
        </View>
      );
      }
      else {
        return (
          <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          Try Again
        </Confirm>
        );
      }

    }

    else {
      const { container, circle, text, subText, scoreText } = stylesPotrait;
      const { count, numberHolder, score } = this.state;

      if(this.state.showModal == false ) {
      return (
        <View style={{ flex: 1, backgroundColor: '#27ae60'}}>
         <Text style={[scoreText, { fontSize: fontSizer(width) - 30}]}>score: {score}</Text>
        <View style={container} >
          <View style={[circle, {width: width, height: width, borderRadius: width / 2}]}>
            <View>
              <Animatable.View ref="view">
              <Text style={[text, {fontSize: fontSizer(width) }]}>{numberHolder}</Text>
              </Animatable.View>
            </View>
          </View>
          <TouchableOpacity onPress={this.GenerateRandomNumber}>
          <Text style={[subText, {fontSize: fontSizer(width) + 20 }]}>{count}</Text>
          </TouchableOpacity>
         
        </View>
        </View>
      );
      }
      else {
        return (
          <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          Try Again
        </Confirm>
        );
      }
    }
  }
}//End of class component

function fontSizer (screenWidth) {
  if(screenWidth > 100 && screenWidth < 150){
    return 50;
  }else if(screenWidth < 100){
    return 40;
  }else if(screenWidth < 200 && screenWidth > 150 ){
    return 70
  }else if(screenWidth < 300 && screenWidth > 200 ){ 
    return 90;
  }
}
const stylesPotrait = {

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
  
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    fontSize: 90,
    fontFamily: 'Cochin',
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
    marginTop: '10%',
  },
  scoreText: {
    fontFamily: 'Cochin',
    fontSize: 30,
    color: 'white',
    paddingLeft: '5%',
    paddingTop: '5%'
  },
};//End of styles

const stylesLandscape = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  circle: {
   
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '5%'
  },
  text: {
    fontFamily: 'Cochin',
    fontSize: 90,
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
  scoreText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    color: 'white',
    paddingLeft: '2%',
    paddingTop: '2%'
  },
};//End of styles