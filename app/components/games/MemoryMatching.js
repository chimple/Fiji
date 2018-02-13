import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import TileGrid from './TileGrid';
import Orientation from 'react-native-orientation';
import Board from './Board';
import Card from './Card';
import ScoreBoard from './ScoreBoard';

const SIZE = 4
arry =[];
arryCheck =[];
j =0;
k =0;
cnt =0;

export default class MemoryMatching extends Component {
  constructor(props) {
    super(props);

    {this.fetchData()}
    var shuffledArray = this.arrayShuffle(arry)

    this.state = { arry: arry , shuffledArray: shuffledArray , arryCheck: arryCheck}

  }

  fetchData() {
      const data=this.props.data.map( function (item, i){
        item.map(function(element, i) { 
          arry[j]=element;
          j++;
        });
      }
    )
  }

  arrayShuffle(items: arry) {
    var currentIndex = items.length,
    temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = items[currentIndex];
        items[currentIndex] = items[randomIndex];
        items[randomIndex] = temporaryValue;
    }
  return items;
  }

  componentDidMount() {
   // Orientation.lockToPortrait();
  }

  componentWillUnmount() {
   // Orientation.unlockAllOrientations();
  }
  

  _clickTile = (id , view) => {

      arryCheck[k] = this.state.shuffledArray[id];
      if(arryCheck.length===2)
      {
        if(arryCheck[0]===arryCheck[1])
          {
            alert("Matched!!!");
            this.props.onScore(2);
          }
        else
          {
            alert("UnMatched!!!");
            console.log("arryCheck",arryCheck); 
          }

          arryCheck = [];
          k=0;
          return;
      } 
      console.log("arryCheck",arryCheck); 
      console.log("Value of K",k);
      k++;   

  }


  render() {
     console.log("Original-Raw-Rajesh data",this.props.data);
     console.log("Rajesh-1DArray",this.state.arry);
     console.log("Rajesh-Shuffled-Array",this.state.shuffledArray);
  
    return (
      <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.state.shuffledArray}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='#FFFFFF'
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        onPress={this._clickTile}
      />
    );
  }
}

const styles = StyleSheet.create({
  
});
