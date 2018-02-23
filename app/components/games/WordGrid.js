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
      const Data1 = props.data.word 
      const shuffledData1 = props.data.others
      .map((a, i) => [Math.floor(i / (SIZE * SIZE)), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
 
      const letters = new Array(SIZE*SIZE)
    for (let i = 0; i < letters.length; i++) {
      letters[i] = 'null';
    }
  let h=1;
  let rno = Math.floor(Math.random() * ((SIZE*SIZE)-Data1.length+1)) + 0 ;
  const rindex = new Array(Data1.length)
   // console.log("random no",rno)
    letters[rno]=Data1[0];
    rindex[0]=rno;
  for (let i = 1; i < Data1.length; i++) {
    let flag=0,flag2=0;
   for (let j =1; j <= SIZE;j++){
     if(rno==(j*SIZE-1))
     {flag=1;break;}
    }
   if(flag==1){
     rno+=SIZE;
     let p=0;
   while(p<SIZE){
      letters[rno]=Data1[i];
      rindex[h]=rno;
      h++;
      i++;p++;
      rno--;
      if(i==Data1.length){flag2=1;console.log('breaked');break;}
    }
      if(p==SIZE&&flag2==0){flag=0;rno+=SIZE;}
   }
 if(flag==0){
   rno++;
   letters[rno]=Data1[i];
   rindex[h]=rno;
   h++;
 }}
 for (let i = 0,j=0; i < SIZE*SIZE ; i++){
   if(letters[i]=='null'){
     letters[i]=shuffledData1[j];
     j++;
   }
 } 
       let statuses = new Array(SIZE * SIZE)
        for (let i = 0; i < statuses.length; i++) {
          statuses[i] = 'neutral';
        }
      let index = 0;
       return ({
          letters,
          shuffledData1,
          index,
          statuses,
          rindex
        })
      }
      componentWillReceiveProps(nextProps) {
      this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
      }

  render() {
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
            neutral: {
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
   // currentStatus == 'neutral' && view.zoomIn(250)
  }
   _clickTile = (id, view) => {
    const wlen = this.props.data.word.length;
    const index = this.state.index
    const rindex = this.state.rindex
    const riddata = rindex[index];
 
      if(riddata===id)
      {
        view.pulse(10).then((endState) => {
          this.setState({...this.state,
          statuses: this.state.statuses.map((val, riddata )=> {
          return id == riddata ? 'selected' : val})})
          }) 
    this.props.onScore && this.props.onScore(2) 
    this.props.setProgress && this.props.setProgress((index + 1) / wlen)
    this.setState({...this.state, index: index + 1})
            if(id===(rindex[wlen-1])){
              setTimeout( () => {
              this.setState({...this.state, index: 0, statuses: this.state.statuses.map(()=> 'neutral')})
              this.props.onEnd()   
              }, 1200);
            }
        }
         else{
         let flag=0;
         for(var i=0;i<=index;i++){
             if(id===rindex[i]){flag=1}
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
