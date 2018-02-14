import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';

const SIZE = 4
arryCheck =[];
arryID =[];
let k =0;

export default class MemoryMatching extends Component {
  constructor(props) {
    super(props)
    this.state = this._initBoard(props)
  }

  _initBoard = (props) => {
    let arry = new Array(SIZE * SIZE);
    let j =0;
    const data=props.data.map( function (item, i){
        item.map(function(element, i) { 
          arry[j]=element;
          j++;
        });
      }
    )
    console.log("Rajesh-Original-Data",arry);

    let shuffledArray = new Array(SIZE * SIZE)
    shuffledArray = this.arrayShuffle(arry);
    
    console.log("Rajesh-Shuffled-Data",shuffledArray);

    let statuses = new Array(SIZE * SIZE)
    for (let i = 0; i < statuses.length; i++) {
      statuses[i] = 'H';
    }

    console.log("Rajesh-Status-Data",statuses);

    return ({ shuffledArray , statuses })

  }

  arrayShuffle(items: shuffledArray) {
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

  componentWillReceiveProps() {

  }

  render() {
    return (
      <TileGrid
      numRows={SIZE}
      numCols={SIZE}
      data={this.state.shuffledArray}
      statuses={this.state.statuses}
      onStatusChange={this._onStatusChange}
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
    )
  }

  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log("Rajesh-Data-onstatuschange:", id , prevStatus, currentStatus);
    currentStatus == 'D' && view.zoomOut(1000)
  }

  _clickTile = (id, view) => {
    console.log("Pressed-Tile-id",id);
    console.log("Pressed-Tile-id-Content",this.state.shuffledArray[id]);
    console.log("Pressed-Tile-status",this.state.statuses[id]);

    if(this.state.statuses[id]=='V')
     return;

    view.flipInY(500).then((endState) => {
      arryCheck[k] = this.state.shuffledArray[id]; 
      arryID[k] =id;
      console.log("Rajesh-Id-Data",arryID);

      this.setState({...this.state,
        statuses: this.state.statuses.map((val, index)=> {
          return id == index ? 'V' : val})})
    
      if(arryCheck.length===2)
      {
        if(arryCheck[0]===arryCheck[1])
          {
            for(let i=0; i<arryID.length; i++)
            {
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return arryID[i] == index ? 'D' : val})})
            }
          }
        else
          {
            for(let i=0; i<arryID.length; i++)
            {
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return arryID[i] == index ? 'H' : val})})
            }           
          }

          arryID = [];
          arryCheck = [];
          k=0;
          console.log("Rajesh-Status-data",this.state.statuses);
          return {statuses};
      
      }
      console.log("arryCheck",arryCheck); 
      console.log("Value of K",k);
      k++;   
    })
   // console.log("Rajesh-Status-data",this.state.statuses);
  }

}

MemoryMatching.propTypes = {
  data: PropTypes.object
}
