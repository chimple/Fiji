import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isPhone, isTablet } from './Platform';

let timerId, width, height;

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

    });

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
        timerId = setInterval(this.timer, 700);
      }
      else if (this.state.score > 13) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 600);
      }
    }
    else {
      this.setState({
        showModal: !this.state.showModal
      })
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

    if ( isLandscape() && isTablet() ) {
      const { container, SubContainer, circle, text, subText, scoreText } = stylesLandscape;
      const { count, numberHolder, score } = this.state;

      width =  Dimensions.get('window').height * 0.225;
      height =  Dimensions.get('screen').height * 0.225; 

      return (
        <View style={{ flex: 1, backgroundColor: '#27ae60'}}>
         <Text style={scoreText}>score: {score}</Text>
        <View style={container} >
          <View style={circle}>
            <View>
              <Animatable.View ref="view">
                <Text style={text}>{numberHolder}</Text>
              </Animatable.View>
            </View>
          </View>
          <TouchableOpacity onPress={this.GenerateRandomNumber}>
            <Text style={subText}>{count}</Text>
          </TouchableOpacity>
         
          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            OPS! TOO LATE
          </Confirm>
          </View>
        </View>
      );
    }

    else {
      const { container, circle, text, subText, scoreText } = stylesPotrait;
      const { count, numberHolder, score } = this.state;

      width =  Dimensions.get('window').height * 0.2;
      height =  Dimensions.get('screen').height * 0.2;

      return (
        <View style={{ flex: 1, backgroundColor: '#27ae60'}}>
         <Text style={scoreText}>score: {score}</Text>
        <View style={container} >
          <View style={circle}>
            <View>
              <Animatable.View ref="view">
                <Text style={text}>{numberHolder}</Text>
              </Animatable.View>
            </View>
          </View>
          <TouchableOpacity onPress={this.GenerateRandomNumber}>
            <Text style={subText}>{count}</Text>
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
  }
}//End of class component

const stylesPotrait = {

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width:  120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center'
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
    width: Dimensions.get('window').height * 0.3,
    height: Dimensions.get('window').height * 0.3,
    borderRadius: Dimensions.get('window').height * 0.3 / 2,
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