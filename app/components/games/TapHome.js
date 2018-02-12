import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen';
import Tile from './Tile';

let timerId; 
let width;
let iterate = 0;
let len = 0;
let j = 0, i = 0;

export default class TapHome extends Component {

  constructor(props) {

    super(props);
    this.state = this._initBoard(props)

  }

  _initBoard = (props) => {
    let options = [];
    j = 0;
    const data = props.data.serial.map( function (temp, index ){
      options[j] = temp;
      j++;
    });
    let len = options.length;
    let score = 0;
    let count = 0;
   
    return ({
      options,
      count,
      len,
      score
    })
  }


  timer = () => {
    if( this.state.count  == this.state.len ){
      this.setState({count: 0})
    }else
      this.setState({ count: this.state.count + 1})
  }

  componentDidMount() {
    //this.setState({len: this.props.data.serial.length})
    //This will start timer and will update text value
    timerId = setInterval(this.timer, 1400)
    width = this.props.style.height * 0.225

  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = (id , view) => {
    
    if (this.props.data.answer == this.state.options[this.state.count]) {
      this.props.onScore(2)
      view.zoomIn(500).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
     
      if(this.state.score == 9 )
      {
        this.setState({
          numberHolder: this.state.numberHolder,
          showModal: true,
        })
      }
      else{
        this.setState({
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
      view.shake(500).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
      iterate = iterate + 1;
      this.setState({ count: 0 })

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
    console.log(this.props.data.serial); 

   
 
    const { container, circle, text, subText, scoreText } = stylesPotrait;
    return (

      <View style={container}>
          <Tile
            id={1}
            onPress={this.GenerateRandomNumber}
            text={this.props.data.answer}
            edgeColor='white'
            style={{
              width: 80,
              height: 80,
              position: 'relative',
            }}
            onRender={this._renderTile}
          />
        <TouchableOpacity onPress={this.GenerateRandomNumber}>
            <Text style={[ subText, { fontSize: fontSizer(width) + 20}]}>
            {this.state.options[this.state.count]}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}//End of class 

_renderTile = (id, view) => {
  //this.state.letters[id] && view.zoomIn(250)
}

_clickTile = (id, view) => {
  if (this.state.letters[id] == this.props.data.serial[this.state.currentIndex]) {
    this.props.onScore(2)
    this.props.setProgress((this.state.currentIndex + 1) / this.props.data.serial.length)
    view.zoomOut(250).then((endState) => {
      if (this.state.currentIndex + 1 >= this.props.data.serial.length) {
        this.props.onEnd()
      } else {
        this.setState((prevState, props) => {
          const newLetters = prevState.letters.map((value, index) => {
            return index == id ? prevState.shuffledData[prevState.currentIndex + SIZE * SIZE] : value
          })
          return {
            letters: newLetters,
            shuffledData: prevState.shuffledData,
            currentIndex: prevState.currentIndex + 1
          }
        })
        this.state.currentIndex + SIZE * SIZE <= this.props.data.serial.length && view.zoomIn(250)
      }
    })
  } else {
    view.shake(250)
  }
}

function fontSizer (screenWidth) {
  if(screenWidth > 100 && screenWidth < 150){
    return 40;
  }else if(screenWidth < 100){
    return 30;
  }else if(screenWidth < 200 && screenWidth > 150 ){
    return 60
  }else if(screenWidth < 300 && screenWidth > 200 ){ 
    return 80;
  }
}

const stylesPotrait = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
   
  },
  subText: {
    fontFamily: 'Cochin',
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '50%'
  },
};//End of styles
