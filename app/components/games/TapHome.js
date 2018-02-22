import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types'
import Tile from './Tile';

export default class TapHome extends Component {
  timerId;
  constructor(props) {
    super(props);
    this.state = this._initBoard(props);
  }

  _initBoard = (props) => {
    return ({
      count : 0,
      status : 'neutral',
      iterate : 0,
      iterateShake : 0,
    })
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.timerId);
    this.timerId = setInterval(this._timer, 1400);
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
   
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  
  componentDidMount(){
    clearInterval(this.timerId);
    this.timerId = setInterval(this._timer, 1400);
  }

  _timer = () => {
    if( this.state.count  == this.props.data.serial.length ){
      this.setState({...this.state, count: 0, iterate: this.state.iterate + 1})
      if( this.state.iterate == 2 )
      {
        this.props.setProgress(1)
        this.setState({...this.state, status: 'selected'});
      }
    }else {
      this.setState({...this.state, count: this.state.count + 1})
      
    }
  }

  //This will check on tap condition
  _clickText = () => {
    if(this.state.status == 'selected')
    {
      return;
    }

    if(this.props.data.answer == this.props.data.serial[this.state.count]) {
      this.props.setProgress(1)
      this.props.onScore && this.props.onScore(2)
      this.setState({...this.state, status: 'selected'}); 
    }

    else {
      this.refs.view.shake(250).then((endState)=> {
        if(this.state.iterateShake == 2)
        {
          this.props.setProgress(1);
          this.setState({...this.state, status: 'selected'});
        } else {
          this.setState({...this.state, iterateShake: this.state.iterateShake + 1, count: 0});
        }
      })  
    }   
  }//end of _clickText function

  render() {
    const { container, subText } = styles;

    const cellSize = Math.min(
      Math.floor(this.props.style.width / 3.5),  
      Math.floor(this.props.style.height / 3.5)
    )

    const padding = Math.floor(cellSize * .05)
    const tileSize = cellSize - padding * 2
    const height = (this.props.style.height / 5)
    const heightText = this.props.style.height / 10;

    return (
      <View style={[container, {paddingTop: height}]}>
        <Animatable.View ref="view">
        <Tile
          id={1}
          text={this.props.data.answer.toString()}
          edgeColor='white'
          status={this.state.status}
          onStatusChange={this._onStatusChange}
          style={{
            width: tileSize,
            height: tileSize,
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
          onPress={()=>{}}
        />
        </Animatable.View>
        <TouchableOpacity onPress={this._clickText}>
            <Text style={[subText, {  fontSize: Math.max(20, tileSize - 40) + 15, marginTop: heightText }]}>
              {this.props.data.serial[this.state.count]}
            </Text> 
        </TouchableOpacity>
      </View>
    );
  }

  _onStatusChange = (id, view, prevStatus, currentStatus) => {
    currentStatus == 'selected' && view.zoomIn(250).then((endState) => {
      this.props.onEnd();
    })   
  }
}//End of class 

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',  
  },
  subText: {
    fontFamily: 'Cochin',
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
};//End of styles

TapHome.propTypes = {
  data: PropTypes.shape({
    answer: PropTypes.number,
    serial: PropTypes.array
  }),
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func
}

