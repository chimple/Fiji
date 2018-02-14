import React, { Component } from 'react';
import { View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

import Tile from './Tile';
import TileGrid from './TileGrid';

const SIZE = 2;
var arr1= [];
var j=0;

export default class Quiz extends Component {
    constructor(props) {
      super(props);
      this.state = this._initBoard(props);      
    }

    _initBoard = (props) => {
      const shuffledData = props.data.choices
        .map((a, i) => [Math.floor(i / (SIZE * SIZE)) + Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map((a) => a[1])
      let letters = new Array(SIZE * SIZE)
      for (let i = 0; i < letters.length; i++) {
        letters[i] = shuffledData[i];
      }
      let statuses = new Array(SIZE * SIZE)
      for (let i = 0; i < statuses.length; i++) {
        statuses[i] = 'Neutral';
      }
      let currentIndex = this.props.data.answerIndex;
      let question = this.props.data.question;
      let height = this.props.data.height;
      let width = this.props.data.width;
      return ({
        letters,
        shuffledData,
        currentIndex,
        statuses,
        question,
        height, 
        width
      });
    }
  

    componentWillReceiveProps(nextProps) {
      this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
    }
  

    _onStatusChange(id, view, prevStatus, currentStatus) {
      console.log('onstatuschange:', prevStatus, currentStatus)
      currentStatus == 'Neutral' && view.zoomIn(250)
    }

    _clickTile = (id, view) => {
      const currentIndex = this.state.currentIndex
      if (this.state.letters[id] == this.props.data.choices[currentIndex]) {
        this.props.onScore && this.props.onScore(2)
        this.props.setProgress && this.props.setProgress((currentIndex) / this.props.data.choices.length)
        this.setState({...this.state, currentIndex: currentIndex})
        view.zoomOut(250).then((endState) => {
          if (currentIndex + 1 >= this.props.data.choices.length) {
            this.setState({...this.state,
              statuses: this.state.statuses.map(()=>'Selected')})
            this.props.onEnd()
          } else {
            this.setState((prevState, currentStatus, props) => {
              const newquestion = currentStatus.data.question;
              const newLetters = prevState.letters.map((value, index) => {
                return index == id ? prevState.shuffledData[currentIndex + SIZE * SIZE] : value
              })
              const newStatuses = prevState.statuses.map((value, index) => {
                return (currentIndex + 1 + SIZE * SIZE > this.props.data.choices.length && index == id && value=='Selected') ? 'Neutral' : value
              })
              return {...prevState,
                letters: newLetters,
                statuses: newStatuses,
                question: newquestion
              }
            })
            currentIndex + SIZE * SIZE < this.props.data.choices.length && view.zoomIn(250)
          }
        })
      } else {
        view.shake(250);
      }
    }
    

    _onPress = () => {
      this.refs.questionView.shake(800);
    }

       
    render() {

      const cellSize = Math.min(
        Math.floor(this.props.style.width / 2),
        Math.floor(this.props.style.height / 2)
      );
  
      const padding = Math.floor(cellSize * .05);
      const tileSize = cellSize - padding * 2;
     
      
      return (
        <ScrollView style={{ backgroundColor: '#E53554', paddingTop: 5 }}>
        <View style={styles.container}>
                 
        <View 
        style={{ flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: this.state.height * 0.01 }}
        >

        
          <Animatable.View ref="questionView">
          <Tile
            id={0}
            onPress={this._onPress}
            tileColor='#24B2EA'
            edgeColor='black'
            pressedTileColor='goldenrod'
            pressedEdgeColor='darkgoldenrod'
            textColor='#fff'
            text={this.props.data.question}
            status
            style={{
              width: tileSize,
              height: tileSize,
              backgroundColor: '#24B2EA',
              textColor: '#fff',
              borderColor: 'black'
            }}
            
          />
          </Animatable.View>      
          

       <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.state.letters}
        statuses={this.state.statuses}
        onStatusChange={this._onStatusChange}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='#FFFFFF'
        style={{
          width: this.props.style.width * 0.5,
          height: this.props.style.height * 0.5
        }}
        onPress={this._clickTile}
        statusStyles = {{
          Neutral: {
            View: {
              backgroundColor: '#24B2EA'
            },
            Text: {
              color: '#FFFFFF'
            }
          },
          Selected: {
            View: {
              backgroundColor: '#24B2EA'
            },
            Text: {
              color: '#FFFFFF'
            }
          }
        }}
      />


          </View>
        </View>
        </ScrollView>
      );
      this.state.letters=[];
    }
  }
   
  const styles = {    
    container: {
      flex: 1,
      alignContent: 'space-between'
    },
   
  };

  Quiz.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func
  }
