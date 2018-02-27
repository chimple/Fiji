import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid';

const SIZE = 3

export default class ConnectDots extends Component {
  constructor(props) {
    super(props)

    this.state = this._initBoard(props)
  }
  
  _initBoard = (props) => {
 
    const shuffledData = props.data.serial
    .map((a, i) => [Math.floor(i / (SIZE * SIZE)), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])
    let shuffledData1 = props.data.others
    .map((a, i) => [Math.floor(i / (SIZE * SIZE)) + Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])
    var randomnumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    const rindex = new Array(shuffledData.length)
    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++){
      letters[i]='null';
    }
    let h=1;
    let i=randomnumber;
    rindex[0]=i;
    let j=0;
   
   
    if(i>=0)
    {
    
    while(shuffledData[j])
    {
    letters[i]=shuffledData[j];
    rindex[h]=i;
    h++;
    i++;
    j++
    console.log("the log is in the conditiin",i)
    if((i==SIZE)||(i==SIZE+SIZE)){
       i=i+SIZE-1;
     
      while(shuffledData[j]){
       
               letters[i]=shuffledData[j];
               rindex[h]=i;
               h++;
                j++;
                i--;
                console.log("is it is true then go others",i)
                if((i==SIZE-1)||(i==SIZE+SIZE-1)){
                  i=i+SIZE+1;
                  while(shuffledData[j]){
                   letters[i]=shuffledData[j];
                   rindex[h]=i;
                   h++;
                   j++;
                   i++;
                if(i==(SIZE*SIZE)){
                  i=i+SIZE-1;
                  while(shuffledData[j]){
                   letters[i]=shuffledData[j];
                   rindex[h]=i;
                   h++;
                   j++;
                   i--;
                   
                  }
                }
              }
                }
          }
          break;
    }
    }
    }
        
 for (let i = 0,j=0; i < SIZE*SIZE ; i++){
  if(letters[i]=='null'){
    letters[i]=shuffledData1[j];
    j++;
  }
}
    
  let statuses = new Array(SIZE * SIZE)
  for (let i = 0; i < statuses.length; i++ ) {
    statuses[i] = 'visible';
  }
  let currentIndex = 0
  return ({
    rindex,
    letters,
    shuffledData,
    currentIndex,
    statuses
  })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps',this.props.runIndex, nextProps.runIndex)
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

  render() {
   
    return (
      <TileGrid
        delegateTouch={this.props.delegateTouch}
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
          width: this.props.style.width,
          height: this.props.style.height
        }}
        statusStyles = {{
          visible: {
            View: {
              backgroundColor: 'white'
            },
            Text: {
              color: 'black'
            }
          },
          invisible: {
              View: {
                backgroundColor: '#708090'
              },
              Text: {
                color: 'black'
              }
            }
        }}
        onPress={this._clickTile}
        onRender={this._renderTile}
      />
    )
    
  }
  
  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:', prevStatus, currentStatus)
    //currentStatus == 'visible' && view.zoomIn(250)
  }

  _clickTile = (id, view) => {
   
   const currentIndex = this.state.currentIndex
   console.log(" index of the dead lock for shanking ", this.state.rindex)
    if (this.state.letters[id] == this.props.data.serial[this.state.currentIndex]) {
  
      view.pulse(10).then((endState) => {
        this.setState({...this.state,
        statuses: this.state.statuses.map((val, index)=> {
        return id == index ? 'invisible' : val})})
        })
        this.props.onScore && this.props.onScore(2) 
      this.props.setProgress && this.props.setProgress((currentIndex + 1) / this.props.data.serial.length)
      this.setState({...this.state, currentIndex: currentIndex + 1})
     
      if (currentIndex == this.props.data.serial.length-1) {
       
      //  console.log(" currnt index , length ",currentIndex,this.props.data.serial.length)
      setTimeout( () => {
        this.props.onEnd()   
        }, 1200);
      }
     
    } else { let flag=0;
      for(var i=0;i<=currentIndex;i++){
          if(id===this.state.rindex[i]){flag=1}
         }
          if(flag==0){ view.bounce(800); }
     
    }
  }
}

ConnectDots.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  delegateTouch: PropTypes.func,
  setProgress: PropTypes.func
}
