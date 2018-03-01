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

export default class MemoryMatching extends Component {
  constructor(props) {
    super(props)
    this.state = this._initBoard(props)
  }

  _initBoard = (props) => {

    let arryCheck =[];
    let arryID =[];
    let k =0;
    let Matched =0;
    let progressCnt =1;
    let idCnt=0;

    let arry = new Array(SIZE * SIZE);
    let j =0;
    const data=props.data.map( function (item, i){
        item.map(function(element, i) { 
          arry[j]=element;
          j++;
        });
      }
    )
    console.log("Rajesh-Original-Data",props.data);
    console.log("Rajesh-1D-Data",arry);

    let shuffledArray = new Array(SIZE * SIZE)
    shuffledArray = this.arrayShuffle(arry);
    
    console.log("Rajesh-Shuffled-Data",shuffledArray);

    let statuses = new Array(SIZE * SIZE)
    for (let i = 0; i < statuses.length; i++) {
      statuses[i] = 'H';
    }

    console.log("Rajesh-Status-Data",statuses);

    return ({ shuffledArray , statuses , arryCheck , arryID , k , Matched , progressCnt , idCnt })

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

  componentDidMount() {
    
  }

  render() {
    return (
      <TileGrid
      delegateTouch={this.props.delegateTouch}
      reverse={this.props.reverse}
      numRows={SIZE}
      numCols={SIZE}
      data={this.state.shuffledArray}
      statuses={this.state.statuses}
      onStatusChange={this._onStatusChange}
      tileColor='#24B2EA'
      edgeColor='deepskyblue'
      pressedTileColor='goldenrod'
      pressedEdgeColor='darkgoldenrod'
      textColor='black'
      style={{
        width: this.props.style.width,
        height: this.props.style.height
      }}
      statusStyles = {{
        H: {
          View: {
            backgroundColor: '#ff80ab'
          },
          Text: {
            opacity: 0
          }
        },
        VtoH: {
          View: {
            backgroundColor: '#fcc066'
          },
          Text: {
            opacity: 1
          }
        },
        VtoD: {
          View: {
            backgroundColor: '#fcc066'
          },
          Text: {
            opacity: 1
          }
        },
        V: {
          View: {
            backgroundColor: '#fcc066'
          },
          Text: {
            opacity: 1
          }
        },
        D: {
          View: {
           
          },
          Text: {
           
          }
        }
      }}
      onPress={this._clickTile}
    />
    )
  }

  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log("Rajesh-Data-onstatuschange:", id , prevStatus, currentStatus);
    currentStatus == 'D' && view.zoomOut(250)
    currentStatus == 'VtoH' && view.shake(500)
    currentStatus == 'VtoD' && view.tada(500)
    currentStatus == 'H' && view.flipInY(250)  
  }

  _clickTile = (id, view) => {
    this.state.idCnt++;
    console.log("Pressed-Tile-id",id);
    console.log("Pressed-Tile-id-Content",this.state.shuffledArray[id]);
    console.log("Pressed-Tile-status",this.state.statuses[id]);
    console.log("Rajesh-Pressed-idCnt",this.state.idCnt);

    if(this.state.statuses[id]=='V'||this.state.statuses[id]=='D'||this.state.statuses.some((value)=>value=='VtoH')||this.state.statuses.some((value)=>value=='VtoD')||this.state.idCnt>2)
    {
     this.state.idCnt=0;
     return;
    }
 
    this.setState({...this.state,
    statuses: this.state.statuses.map((val, index)=> {
      return id == index ? 'V' : val})})

    view.flipInY(250).then((endState) => {
      this.state.arryCheck[this.state.k] = this.state.shuffledArray[id]; 
      this.state.arryID[this.state.k] =id;
      console.log("Rajesh-Id-Data",this.state.arryID);

      if(this.state.arryCheck.length===2)
      {  
        if(this.state.arryCheck[0]===this.state.arryCheck[1])
          {
            this.state.Matched++;     
            if(this.state.Matched == 8)
             this.props.onEnd();  

            this.props.onScore(2);
            this.props.setProgress((this.state.progressCnt) / (this.state.shuffledArray.length/2));
            this.state.progressCnt++;
            const first = this.state.arryID[0];
            const second = this.state.arryID[1];
            console.log("Checking",this.state.arryID);
    
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return (first == index || second == index) ? 'VtoD' : val})})

                  this.state.idCnt=0;

            setTimeout( () => {
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return (first == index || second == index) ? 'D' : val})})
            }, 50);
          }
        else
          {  
            const first = this.state.arryID[0];
            const second = this.state.arryID[1];
           
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return (first == index || second == index) ? 'VtoH' : val})})

                  this.state.idCnt=0;
                   
            setTimeout( () => {
              this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                  return (first == index || second == index) ? 'H' : val})})
                }, 50); 
          }

          this.state.arryID = [];
          this.state.arryCheck = [];
          this.state.k=0;
          console.log("Rajesh-Status-data",this.state.statuses);
          return this.state.statuses    
      }
      console.log("arryCheck",this.state.arryCheck); 
      console.log("Value of K",this.state.k);
      this.state.k++;   
    })
   // console.log("Rajesh-Status-data",this.state.statuses);
  }
}

MemoryMatching.propTypes = {
  data: PropTypes.object,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  delegateTouch: PropTypes.func,
  reverse: PropTypes.bool,
  setProgress: PropTypes.func
}
