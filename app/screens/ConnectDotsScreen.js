import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types'
import TileGrid from '../components/games/TileGrid';

const SIZE = 3

var count1=0;

export default class ConnectDotsScreen extends Component {
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
  
    var randomnumber = Math.floor(Math.random() * (6 - 0 + 1)) + 0;

    let letters = new Array(SIZE * SIZE)
    for (let i = 0; i < letters.length; i++){
      letters[i]='null';
    }
    let i=randomnumber;
    let j=0;
    if(i==0)
    {
    
    while(shuffledData[j])
    {
    letters[i]=shuffledData[j];

    i++;
    j++
    if(i>=SIZE-1){
       i=i+SIZE-1;
      
      while(shuffledData[j]){
      
               letters[i]=shuffledData[j];
              
                j++;
              
                i--;
                if(i>=SIZE){
                  i=i+SIZE+1;
                  while(shuffledData[j]){
                   letters[i]=shuffledData[j];
                   j++;
                   i++;
                  }
    
                }
          }
          break;
    }
    
    
    
    }
    }
    else if(i==1){
    
    while(shuffledData[j])
    {
    letters[i]=shuffledData[j];
    i++;
    j++;
    if(i>=SIZE-1){
    i=i+SIZE-1;
   
    while(shuffledData[j]){
   
           letters[i]=shuffledData[j];
      
            j++;
          
            i--;
            if(i>=SIZE){
              i=i+SIZE+1;
              while(shuffledData[j]){
               letters[i]=shuffledData[j];
               j++;
               i++;
           
              }
            }
          
            if(i-1>=SIZE*SIZE)
            {
              i=i-SIZE-2;
              j--;
          
    
              while(shuffledData[j])
              { 
                letters[i]=shuffledData[j];
                i--;
                j++;
        
              }
            }
    
            
      }
      break;
    }
    
    
    
    }
    
    }
    else if(i==2)
    {
    while(shuffledData[j])
    {
    letters[i]=shuffledData[j];
 
    i++;
    j++;
    if(i>=SIZE-1){
    i=i+SIZE-1;
   
    while(shuffledData[j]){
    
           letters[i]=shuffledData[j];
  
            j++;

            i--;
            if(i>=SIZE){
              i=i+SIZE+1;
              while(shuffledData[j]){
               letters[i]=shuffledData[j];
               j++;
               i--;
         
              }
            }
          
            if(i-1>=SIZE*SIZE)
            {
              i=i-SIZE-2;
              j--;
            
    
              while(shuffledData[j])
              { 
                letters[i]=shuffledData[j];
                i--;
                j++;
               
              }
            }
    
            
      }
      break;
    }
    
    
    
    }
    }
    else if(i==3 || i==4)
    {
     
    while(shuffledData[j])
    {
    letters[i]=shuffledData[j];

    i++;
    j++;
    if(i>=SIZE-1){
    // i=i+SIZE-1;
  
    while(shuffledData[j]){
    
            letters[i]=shuffledData[j];
         
             j++;
        
             i++;
             if(i>=SIZE+SIZE){
               i=i+SIZE-1;
               while(shuffledData[j]){
                letters[i]=shuffledData[j];
                j++;
                i--;
              
               }
             }
        
             if(i-1>=SIZE*SIZE)
             {
               i=i-SIZE-2;
               j--;
         
               while(shuffledData[j])
               { 
                 letters[i]=shuffledData[j];
                 i--;
                 j++;
             
               }
             }
    
             
       }
       break;
    }
    
    
    
    }
    }
    else if(i==5){
       
while(shuffledData[j])
{
  letters[i]=shuffledData[j];

  i++;
  j++;
  if(i>=SIZE-1){
     i=i+SIZE-1;

    while(shuffledData[j]){
   
             letters[i]=shuffledData[j];
     
              j++;
            
              i--;
              if(i==SIZE+SIZE-1){
                i=i-SIZE+1;
                while(shuffledData[j]){
                 letters[i]=shuffledData[j];
                 j++;
                 i--;
              
                }
              }
          
              if(i-1>=SIZE*SIZE)
              {
                i=i-SIZE-2;
                j--;
            

                while(shuffledData[j])
                { 
                  letters[i]=shuffledData[j];
                  i--;
                  j++;
            
                }
              }

              
        }
        break;
  }
 
  
  
}
    }
    else if(i==6)
    {
      
while(shuffledData[j])
{
letters[i]=shuffledData[j];

i++;
j++;
if(i==SIZE*SIZE){
   i=i+SIZE-1;
   
  while(shuffledData[j]){
 
           letters[i]=shuffledData[j];
    
            j++;
         
            i--;
            if(i==SIZE+SIZE-1){
              i=i-SIZE+1;
              while(shuffledData[j]){
               letters[i]=shuffledData[j];
               j++;
               i--;
          
              }
            }
         
            if(i-1>=SIZE*SIZE)
            {
              i=i-SIZE-2;
              j--;
           

              while(shuffledData[j])
              { 
                letters[i]=shuffledData[j];
                i--;
                j++;
         
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
          height: this.props.style.height-100
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
                backgroundColor: 'yellow'
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
  // _renderTile = (id, view) => {
    
  // }
  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:', prevStatus, currentStatus)
    //currentStatus == 'visible' && view.zoomIn(250)
  }

  _clickTile = (id, view) => {
    console.log("this is the data when we go back to home that time ", this.props.data.serial)
   console.log("the value of the clicked content in the tilegrid", id);
   console.log("the value of the clicked grid in the level0", this.state.letters)
   console.log("the value of the ths data of the serial of 0th index", this.props.data.serial[0])
   
    const currentIndex = this.state.currentIndex
  // console.log("the value of the incremented currentindex", currentIndex)
    if (this.state.letters[id] == this.props.data.serial[this.state.currentIndex]) {
      this.props.onScore && this.props.onScore(2)
      view.pulse(10).then((endState) => {
        this.setState({...this.state,
        statuses: this.state.statuses.map((val, index)=> {
        return id == index ? 'invisible' : val})})
        })
      this.props.setProgress && this.props.setProgress((currentIndex + 1) / this.props.data.serial.length)
      this.setState({...this.state, currentIndex: currentIndex + 1})
     
      
      console.log("this is the length of the score in it",this.props.onScore.length)
      if (currentIndex == this.props.data.serial.length-1) {
        console.log(" currnt index , length ",currentIndex,this.props.data.serial.length)
        view.pulse(10).then((endState) => {
          this.setState({...this.state,
          statuses: this.state.statuses.map((val, index)=> {
          return id == index ? 'visible' : val})})
          })
       
        this.props.onEnd()
      } 
  
    
        

    } else {
      
      view.shake(250)
      
      
    }
  }
}

ConnectDotsScreen.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func
}
