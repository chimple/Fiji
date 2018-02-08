import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen'

let timerId; 
let width;
let iterate = 0;
let len = 0;

export default class TapHome extends Component {

  constructor() {

    super();
    this.state = {
      // This is our Default number value
      numberHolder: 0,
      score: 0,
      count: 0,
      showModal: false,
    };

    Dimensions.addEventListener('change', () => {
      width = Dimensions.get('window').height * 0.225;
      console.log(width);
    });

    width = Dimensions.get('window').height * 0.225;

  }

  timer = () => {
    if( this.state.count  == len ){
      this.setState({count: 0})
    }else
      this.setState({ count: this.state.count + 1 })
  }

  componentDidMount() {

    //This will start timer and will update text value
    timerId = setInterval(this.timer, 1400)

  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = () => {
    
    if (this.props.data[this.state.numberHolder] == this.props.data1[this.state.numberHolder] [this.state.count]) {
      this.refs.view.zoomIn(500).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
     
      if(this.state.score == 9 )
      {
        this.setState({
          numberHolder: this.state.numberHolder,
          showModal: true,
        })
      }
      else{
        this.setState({
          numberHolder: this.state.numberHolder + 1,
          count: 0,
          score: this.state.score + 1,
        })
      }

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
      iterate = iterate + 1;
      this.setState({ count: 0 })
      if(iterate > 5 ) {
        this.setState({
          showModal: true,
        });
        iterate = 0;
      }

    }
  }//end of generateRandomNumber function

  // onAccept() {
  //   this.setState({
  //     numberHolder: 4,
  //     score: 0,
  //     count: 2,
  //     showModal: false,
  //   });
  //   clearInterval(timerId);
  //   timerId = setInterval(this.timer, 2000);
  // }

  // onDecline() {
  //   this.setState({ showModal: false });
  // }

  render() {
 
    len = this.props.data1[this.state.numberHolder].length;
    const { count, numberHolder, score } = this.state;    
    if ( isLandscape() ) {
      const { container, SubContainer, circle, text, subText, scoreText } = stylesLandscape;
      
      if (this.state.showModal == false) {
        return (
          <View style={{ flex: 1, backgroundColor: '#27ae60' }}>
            <Text style={[scoreText, { fontSize: fontSizer(width) - 20 }]}>score: {score}</Text>
            <View style={container} >
              <View style={[circle, { width: width + 50, height: width + 50, borderRadius: width + 50 / 2 }]}>
                <View>
                  <Animatable.View ref="view">
                    <Text style={[text, { fontSize: fontSizer(width) }]}>{this.props.data[numberHolder]}</Text>
                  </Animatable.View>
                </View>
              </View>
              <TouchableOpacity onPress={this.GenerateRandomNumber}>
                <Text style={[subText, { fontSize: fontSizer(width) + 30 }]}>{this.props.data1[numberHolder][count]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      else if(score){
        return (
          <ScoreScreen item={this.props.item} game={this.props.game} user={this.props.user} />
        );
      }

    }

    else {
      const { container, circle, text, subText, scoreText } = stylesPotrait;

      if (this.state.showModal == false) {
        return (
          <View style={{ flex: 1, backgroundColor: '#27ae60' }}>
            <Text style={[scoreText, { fontSize: fontSizer(width) - 30 }]}>score: {score}</Text>
            <View style={container} >
              <View style={[circle, { width: width, height: width, borderRadius: width / 2 }]}>
                <View>
                  <Animatable.View ref="view">
                    <Text style={[text, { fontSize: fontSizer(width) }]}>{this.props.data[numberHolder]}</Text>
                  </Animatable.View>
                </View>
              </View>
              <TouchableOpacity onPress={this.GenerateRandomNumber}>
                <Text style={[subText, { fontSize: fontSizer(width) + 20 }]}>{this.props.data1[numberHolder][count]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      else {
        return (
          <ScoreScreen item={this.props.item} game={this.props.game} user={this.props.user} />
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