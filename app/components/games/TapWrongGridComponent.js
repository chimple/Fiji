import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types'
import Tile from './Tile';
import TileGrid from './TileGrid';
let SIZE=1;
let SIZE1=0;

export default class TapWrongGridComponent extends Component {
   constructor(props) {
       super(props);
   
       this.state = this._initBoard(props)
       let count1=0;
       let j=0;
      
       let m=0;
       let k=0;
       let arr1 = [];
       let arr2 = [];
       let x=0;
       let arr3=[];
       let arr4=[];
       let num=0;
       let statuses=[];

    
   

 }

 _initBoard = (props) => {
  
statuses=[];
    arr1=[];
    arr2=[];
    k=0;m=0;
   no=0;
   num=0;
  const data=  this.props.data.word.map(function(element, i) {
      
          arr1[m]=element;
        m++;
      
      });
   
      this.props.data.others.map(function(element, i) {
         arr2[k]=element;
         k++; 
      });
      

var rr=0;
var temp=0;
var q=0;
var temp1=0;
arr3=[];
for(let w=0;w<arr1.length;w++){
    arr3[w]=arr1[w];
}
console.log("arr1",arr1);
console.log("arr3",arr3);


// Randomizing array

for(let w=0;w<arr2.length;w++){
     rr = Math.floor(Math.random() * 3) + 0 ;
     console.log("random num",rr,q);
     temp=arr3[rr];
     arr3[rr]=arr2[w];
   for( q=rr;q<(arr1.length+(arr2.length-1));q++){
       temp1=arr3[q+1];
       arr3[q+1]=temp;
       temp=temp1;
  //   temp=arr3[q];
   // arr3[q]=arr2[w];
    console.log("arr1[q],arr2[w]",arr3[q],arr2[w]);
   // arr3[q+1]=temp;
}
}
SIZE1=arr3.length;
for (let l = 0; l<arr3.length; l++) {
    statuses[l] = 'neutral';
  }
return ({
    
    SIZE1,
    arr1,
    arr2,
    arr3,
    statuses
})


 }

 componentWillReceiveProps(nextProps) {
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

 _renderTile = (id, view) => {
   
  }

 onButtonPress = (id,view) => {
  
     j=0;
     var ii=0;
     console.log("new code array",arr3);
     arr4=[];
     for(ii=0;ii<arr3.length;ii++) {
         arr4[ii]=arr3[ii];
     }
        console.log("pressed id",id);
       
     console.log("array before delete",arr4);
         var sp=arr4[id]
        arr4.splice(id,1);
       console.log("array after delete", arr4);//}
        count1=count1+1;
        for(let i=0;i<arr4.length;i++){
            console.log("wrong new length", arr4.length, arr4[i]);
            if(arr1[j]==arr4[i]){
               j++; console.log("hai",j);
            }
        }
     
        if(count1>=6) {
            count1=0;
            Alert.alert(
                'Game Over',
                'Restart Game ?',
                [
                  {text: 'Restart', onPress: () => this.props.navigation.goBack()}
                 
                ],
                { 
                     cancelable: false 
                }
              )
        }
     
console.log("j is now",j);
arr4.splice(id,0,sp);
console.log("array after adding", arr4);
if(j>=arr1.length){
    console.log("statues array before",this.state.statuses);
    view.shake(10).then((endState) => {
    this.setState({...this.state,
        statuses: this.state.statuses.map((val, index)=> {
        return (id == index) ? 'selected' : val})})
    })
    j=0;
    num++;
 arr3.splice(id,1);
 SIZE1--;
 this.props.onScore(2);
 this.props.setProgress(num/arr2.length);
 no++;
 if(no==arr2.length){
    view.shake(10).then((endState) => {
        this.setState({...this.state,
            statuses: this.state.statuses.map((val, index)=> {
            return (id == index) ? 'neutral' :'neutral'})})
        })
  
this.props.onEnd();

 }
 console.log("deleted array3", arr3);
   // view.zoomOut(1000);
  this.setState({ show: true });
  }else{
       view.wobble(1000);
        

  }

//console.log("status array",this.state.statuses);



    }
    
   render () {
      console.log("key",arr3);
      console.log("correct",arr1);
      console.log("wrong",arr2);
      console.log("statues", statuses); 
       count1=0;
    const { containerStyle, textStyle } = styles;
 

//console.log("arr3 is", arr3);

    return (
        <TileGrid
        numRows={SIZE}
        numCols={SIZE1}
        statuses={this.state.statuses}
        data={arr3}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='#FFFFFF'
        onStatusChange={this._onStatusChange}
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
                View: {
                    backgroundColor: '#24B2EA'
                  },
                  Text: {
                    color: '#FFFFFF'
                  } 
            }
          }}
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        onPress={this.onButtonPress}
        onRender={this._renderTile}
      />
    );
     
    }

    _onStatusChange = (id, view, prevStatus, currentStatus) => {
        console.log('onstatuschange:', prevStatus, currentStatus)
      
      }
}

const styles = {
    containerStyle: {
        height: 80, 
        width: 80, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#f9ece3',
        borderRadius: 9
    },
    textStyle: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 80 

    }
}

TapWrongGridComponent.PropTypes = {
    data: PropTypes.object,
    onScore: PropTypes.func,
    onEnd: PropTypes.func,
    setProgress: PropTypes.func
  }
