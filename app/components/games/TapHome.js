import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen';
import Tile from './Tile';
import { isAbsolute } from 'path';

let timerId, iterate, iterateShake;
let score = 0;
let currentIndex = 0;

export default class TapHome extends Component {

  constructor(props) {
    super(props);
    this.state = this._initBoard(props);
    // Dimensions.addEventListener('change', () => {
    //   this.setState({
    //     width : this.fontSizer(this.props.style.height * 0.225) + 20
    //   })
     
    // });
  }

  _initBoard = (props) => {
    let options = [];
    let j = 0;
    iterate = 0;
    iterateShake = 0;
    const data = props.data.serial.map( function (temp, index ){
      options[j] = temp;
      j++;
    });
    let len = options.length;
    let count = 0;
    let answer = props.data.answer;
    let width = this.fontSizer(this.props.style.height * 0.225) + 20;
    let status = 'neutral';
    return ({
      options,
      count,
      len,
      answer,
      width,
      status,
     
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
    clearInterval(timerId);
    timerId = setInterval(this.timer, 2000) 
    
  }

  componentWillUnmount() {
    clearInterval(timerId);
    iterate = 0;
    iterateShake = 0;
    currentIndex = 0;
    score = 0;
  }


  timer = () => {
   
    if( this.state.count  == this.state.len ){
      this.setState({...this.state, count: 0})
      iterate = iterate + 1;
      if( iterate == 2 )
      {
        iterate = 0;
        currentIndex = currentIndex + 1;
        this.props.setProgress((currentIndex ) / 10)
        this.setState({...this.state, status: 'selected'});
      }
    }else {
      this.setState({...this.state, count: this.state.count + 1})
      
      //condition for increasing speed
      if ( score > 1 && score <= 3) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 1400);
      }
      else if (score > 3 && score <= 5) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 1200);
      }
      else if (score > 5 && score <= 7) {
        clearInterval(timerId)
        timerId = setInterval(this.timer, 1000);
      }
      else if (score > 7 && score <= 10) {
        clearInterval(timerId);
        timerId = setInterval(this.timer, 700);
      }
    }
  }

  componentDidMount() {
    //This will start timer and will update text value
    timerId = setInterval(this.timer, 2000) 
    score = 0;
 
  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = () => {
    
    if (this.state.answer == this.state.options[this.state.count]) {
      this.props.onScore(2)
      currentIndex = currentIndex + 1;
      console.log('test data', currentIndex , '\t', this.props.data.serial.length )
      this.props.setProgress((currentIndex) / 10)
      score = score + 1;
      console.log('score', score)
      this.setState({...this.state, status: 'selected'});
     
    }
    else {
      iterateShake = iterateShake + 1
      this.refs.view.shake(250).then((endState)=> {
        if(iterateShake == 2)
        {
          iterateShake = 0;
          currentIndex = currentIndex + 1;
          this.props.setProgress((currentIndex) / this.props.data.serial.length - 1)
          this.setState({...this.state, status: 'selected'});
        }
      })
      
      this.setState({...this.state, count: 0 })
    }

    
  }//end of generateRandomNumber function

  fontSizer (screenWidth) {
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

  render() {
    const { container, subText } = styles;

    const cellSize = Math.min(
      Math.floor(this.props.style.width / 2),
      Math.floor(this.props.style.height / 2)
    )


    const padding = Math.floor(cellSize * .05)
    const tileSize = cellSize - padding * 2

    return (
      <View style={container}>
        <Animatable.View ref="view">
        <Tile
          id={1}
          text={this.state.answer}
          edgeColor='white'
          status={this.state.status}
          onStatusChange={this._onStatusChange}
          pressedTileColor={this.props.pressedTileColor}
          style={{
            width: 80,
            height: 80,
          }}
          statusStyles = {{
            neutral: {
              View: {
                backgroundColor: '#24B2EA'
              },
              Text: {
                color: '#FFFFFF'
              }
            },
            selected: {
             
              Text: {
                color: '#FFFFFF'
              }
            }
          }}
          onPress={this.GenerateRandomNumber}
          onRender={this._renderTile}
        />
        </Animatable.View>
        <TouchableOpacity onPress={this.GenerateRandomNumber}>
          <Text style={[subText, { fontSize: this.state.width }]}>
            {this.state.options[this.state.count]}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onStatusChange = (id, view, prevStatus, currentStatus) => {
    console.log('onstatuschange:', prevStatus, currentStatus)
    currentStatus == 'selected' && view.zoomIn(250).then((endState) => {
      this.props.onEnd();
    })
    
  }

}//End of class 

const styles = {
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
    marginTop: 30
  },
};//End of styles
