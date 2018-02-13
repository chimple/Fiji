import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen';
import Tile from './Tile';
import { isAbsolute } from 'path';

let timerId; 
let iterate = 0;
let j = 0;

export default class TapHome extends Component {

  constructor(props) {
    super(props);
    this.state = this._initBoard(props)

    Dimensions.addEventListener('change', () => {
      this.setState({
        width : this.fontSizer(this.props.style.height * 0.225) + 20
      })
     
    });
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
    let answer = props.data.answer;
    let width = this.fontSizer(this.props.style.height * 0.225) + 20;
    let statuses = 'inVisible';
   
    return ({
      options,
      count,
      len,
      score,
      answer,
      width,
      statuses
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
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

  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = (id , view) => {
    
    if (this.state.answer == this.state.options[this.state.count]) {
      this.props.onScore(2)
      this.props.onEnd();
      this.setState({ statuses: 'visible'});
      console.log(this.state.count);
     

    //   //condition for increasing speed
    //   if (this.state.count > 1 && this.state.count <= 3) {
    //     clearInterval(timerId);
    //     timerId = setInterval(this.timer, 1200);
    //   }
    //   else if (this.state.count > 3 && this.state.count <= 5) {
    //     clearInterval(timerId);
    //     timerId = setInterval(this.timer, 1000);
    //   }
    //   else if (this.state.count > 5 && this.state.count <= 7) {
    //     clearInterval(timerId)
    //     timerId = setInterval(this.timer, 800);
    //   }
    //   else if (this.state.count > 7 && this.state.count <= 10) {
    //     clearInterval(timerId);
    //     timerId = setInterval(this.timer, 600);
    //   }
    }
    else {
      iterate = iterate + 1;
      this.setState({ count: 0 })

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
        <Tile
          id={1}
          onPress={this.GenerateRandomNumber}
          text={this.state.answer}
          edgeColor='white'
          statuses={this.state.statuses}
          onStatusChange={this._onStatusChange}
          style={{
            width: tileSize ,
            height: tileSize ,
           
          }}
          onRender={this._renderTile}
        />
        <TouchableOpacity onPress={this.GenerateRandomNumber}>
          <Text style={[subText, { fontSize: this.state.width }]}>
            {this.state.options[this.state.count]}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:', prevStatus, currentStatus)
    currentStatus == 'visible' && view.zoomIn(250)
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
