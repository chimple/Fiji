import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen';
import Tile from './Tile';
import { isAbsolute } from 'path';


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
    let iterate = 0;
    let iterateShake = 0;
    let count = 0;
    let width = this.fontSizer(this.props.style.height * 0.225) + 20;
    let status = 'neutral';
    let timerId = setInterval(this.timer, 1400);
    
    return ({
      count,
      status,
      iterate,
      iterateShake,
      timerId,
      width
    })
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.state.timerId);
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  timer = () => {
   
    if( this.state.count  == this.props.data.serial.length ){
      this.setState({...this.state, count: 0, iterate: this.state.iterate + 1})
      if( this.state.iterate == 2 )
      {
        this.setState({...this.state, status: 'selected'});
      }
    }else {
      this.setState({...this.state, count: this.state.count + 1})
      
      // //condition for increasing speed
      // if ( score > 1 && score <= 3) {
      //   clearInterval(this.state.timerId);
      //   timerId = setInterval(this.timer, 1400);
      // }
      // else if (score > 3 && score <= 5) {
      //   clearInterval(timerId);
      //   timerId = setInterval(this.timer, 1200);
      // }
      // else if (score > 5 && score <= 7) {
      //   clearInterval(timerId)
      //   timerId = setInterval(this.timer, 1000);
      // }
      // else if (score > 7 && score <= 10) {
      //   clearInterval(timerId);
      //   timerId = setInterval(this.timer, 700);
      // }
    }
  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = () => {
    
    if (this.props.data.answer == this.props.data.serial[this.state.count]) {
      // this.props.onScore(2)
      // this.setState({...this.state, currentIndex: this.state.currentIndex + 1 });
      // this.props.setProgress((this.state.currentIndex ) / 10)
      // score = score + 1;
      // this.setState({...this.state, status: 'selected'});
     // this.props.onScore()
      this.props.setProgress(1)
      this.setState({...this.state, status: 'selected'});
     
    }
    else {
      this.refs.view.shake(250).then((endState)=> {
        if(this.state.iterateShake == 2)
        {
          this.setState({...this.state, status: 'selected'});
        } else {
          this.setState({...this.state, iterateShake: this.state.iterateShake + 1, count: 0});
        }
      })
      
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
          text={this.props.data.answer}
          edgeColor='white'
          status={this.state.status}
          onStatusChange={this._onStatusChange}
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
            {this.props.data.serial[this.state.count]}
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
