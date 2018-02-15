import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'

const SIZE = 3

export default class WordGrid extends Component {
    constructor(props) {
        super(props)
        this.state = this._initBoard(props)
      }
       
      _initBoard = (props) => {
      //  console.log("this.props.data.others",this.props.data.others)
      const shuffledData = props.data.word 
    
      let shuffledData1 = props.data.others
      .map((a, i) => [Math.floor(i / (SIZE * SIZE)), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
       
      var RandomNumber = Math.floor(Math.random() * ((SIZE*SIZE)-shuffledData.length+1)) + 0 ;
      let i=shuffledData.length-1;
      while(i>=0){
        shuffledData1.splice(RandomNumber, 0, shuffledData[i]);i--}
       shuffledData1.join();
     // shuffledData.forEach(function(e) {
      //shuffledData1.push(e);
    //  })
     console.log("shuffledData, random no, sssnnn",shuffledData,RandomNumber,(SIZE*SIZE)-shuffledData.length)
        let letters = new Array(SIZE * SIZE)
        for (let i = 0; i < letters.length; i++) {
          letters[i] = shuffledData1[i];
        }
      //  data2.pop();
        let statuses = new Array(SIZE * SIZE)
        for (let i = 0; i < statuses.length; i++) {
          statuses[i] = 'visible';
        }
      let index = RandomNumber;
      console.log("statuses from constructor init fn",statuses);
       return ({
          letters,
          shuffledData1,
          index,
          statuses,
          RandomNumber
        })
      }
      componentWillReceiveProps(nextProps) {
        console.log('run index ',this.props.runIndex,nextProps.runIndex )
       if( this.props.runIndex != nextProps.runIndex )
        this.setState(this._initBoard(nextProps))
      //  console.log("after nnnn");
      }

  render() {
  //    console.log("letters",this.state.letters);
  //    console.log("shuffled",this.state.shuffledData);
   //   console.log("index",this.state.index);
   //   console.log("statuses",this.state.statuses);
    return (
      <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.state.letters}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        statuses={this.state.statuses}
        onStatusChange={this._onStatusChange}
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
            selected: {
                View: {
                  backgroundColor: 'yellow'
                },
                Text: {
                  color: 'black'
                }
              }
          }}
        onPress={this._clickTile}
      />
    )
  }
  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:',id, prevStatus, currentStatus)
   // currentStatus == 'visible' && view.zoomIn(250)
  }

  _clickTile = (id, view) => {
    const wlen = this.props.data.word.length;
    const index = this.state.index
    const random = this.state.RandomNumber
     let jsontemp=this.props.data.word;
      if(index===id)
      {
        view.pulse(10).then((endState) => {
          this.setState({...this.state,
          statuses: this.state.statuses.map((val, index)=> {
          return id == index ? 'selected' : val})})
          }) 
          console.log("nn random and index",random,index)
    this.props.onScore && this.props.onScore(2) 
    this.props.setProgress && this.props.setProgress((index + 1) / wlen)
    this.setState({...this.state, index: index + 1})
            if(id===(random+wlen-1)){
              view.pulse(10).then((endState) => {
                this.setState({...this.state,
                statuses: this.state.statuses.map((val, index)=> {
                return id == index ? 'visible' : val})})
                })
                this.setState({...this.state, index: 0})
              this.props.onEnd()
            }
        }
      
        else{
         let flag=0;
         for(var i=random;i<=index;i++){
             if(id===i){flag=1}
            }
             if(flag==0){ view.bounce(800); }
        }
    }
  }

WordGrid.propTypes = {
 data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  setProgress: PropTypes.func
}
