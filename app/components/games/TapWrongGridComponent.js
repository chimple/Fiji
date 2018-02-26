import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import PropTypes from 'prop-types'
import TileGrid from './TileGrid'
let SIZE = 1;

export default class TapWrongGridComponent extends Component {
    constructor(props) {
        super(props);

        this.state = this._initBoard(props)
          }

    _initBoard = (props) => {
    
        let arr4 = [];
        let num = 0;
        let statuses = [];
       let numOFWrongElem=0;
       let arr3 = this.props.data.word.map(function (element, i) {

            return element;
        });

       var randNum = 0;
        var temp = 0;
        var temp1 = 0;
  let lenOfArr3=arr3.length;
        // Randomizing array

        for (let w = 0; w <  this.props.data.others.length; w++) {
            randNum = Math.floor(Math.random() * (arr3.length+ this.props.data.others.length-1)) + 0;
            console.log("random num", randNum);
            temp = arr3[randNum];
            arr3[randNum] =  this.props.data.others[w];
            for (let q = randNum; q < (lenOfArr3 +( this.props.data.others.length-1)); q++) {
                temp1 = arr3[q + 1];
                arr3[q + 1] = temp;
                temp = temp1;
                console.log("arr3[q],arr2[w]", arr3[q], this.props.data.others[w]);
                
            }
        }
       
        for (let l = 0; l < arr3.length; l++) {
            statuses[l] = 'neutral';
        }
        return ({
            arr3,
            statuses,
            arr4,
            num,
            numOFWrongElem
        })


    }

    componentWillReceiveProps(nextProps) {
        this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
    }

   
    onButtonPress = (id, view) => {

     let j = 0;
     let proArray = [];

        for (let i = 0; i < this.state.arr3.length; i++) {
        proArray[i] = this.state.arr3[i];
        }
       
        proArray=proArray.filter((val,index) => index!=id)

      console.log("removed array",proArray);
        for (let i = 0; i <proArray.length; i++) {
           
            if ( this.props.data.word[j] ==proArray[i]) {
                j++; console.log("hai", j);
            }
        }

      console.log("j is now", j);
      
        if (j >=  this.props.data.word.length) {
            this.state.num++;
            this.state.numOFWrongElem++;
       
       this.setState( {...this.state,arr3:this.state.arr3.filter((val,index)=> index!=id)})
            this.props.onScore(2);
            this.props.setProgress(this.state.num /  this.props.data.others.length);
            if (this.state.numOFWrongElem ==  this.props.data.others.length) {
               setTimeout( () => { this.props.onEnd();},100)
            }
        
        } else {
            view.wobble(1000);
       }
    }

    render() {

        return (
            <TileGrid
                delegateTouch={this.props.delegateTouch}
                numRows={SIZE}
                numCols={this.state.arr3.length}
                statuses={this.state.statuses}
                data={this.state.arr3}
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
                    }
                  }}
                style={{
                    width: this.props.style.width,
                    height: this.props.style.height
                }}
                onPress={this.onButtonPress}
            />
        );

    }

}

TapWrongGridComponent.propTypes = {
    data: PropTypes.object.isRequired,
    onScore: PropTypes.func,
    onEnd: PropTypes.func,
    delegateTouch: PropTypes.func,
    setProgress: PropTypes.func
}
