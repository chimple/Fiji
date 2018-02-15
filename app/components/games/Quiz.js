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
      let statuses = new Array(SIZE * SIZE)
      for (let i = 0; i < statuses.length; i++) {
        statuses[i] = 'Neutral';
      }
      return ({
        statuses
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
      if (id == this.props.data.answerIndex) {
        this.props.onScore && this.props.onScore(2)
        this.props.setProgress && this.props.setProgress(1)
        view.zoomOut(250).then((endState) => {
            this.setState({...this.state,
              statuses: this.state.statuses.map(()=>'Invisible')})
            this.props.onEnd()
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
        paddingBottom: this.props.height * 0.01 }}
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
            status='Same'
            statusStyles={{
              'Same': {
                View: {
                  backgroundColor: 'green'
                },
                Text: {
                  color: 'white'
                }
              }
            }}
            style={{
              width: tileSize,
              height: tileSize,
            }}
            
          />
          </Animatable.View>      
          

       <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.props.data.choices}
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
