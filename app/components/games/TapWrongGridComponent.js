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
    
        let arr2 = [];
        let num = 0;
        let statuses = [];
       let numOFWrongElem=0;
       let arr1 = this.props.data.word.map(function (element, i) {

            return element;
        });

       var randNum = 0;
        var temp = 0;
        var temp1 = 0;
  let lenOfArr1=arr1.length;
        // Randomizing array

        for (let w = 0; w <  this.props.data.others.length; w++) {
            randNum = Math.floor(Math.random() * (arr1.length)) + 0;
            console.log("random num", randNum);
            temp = arr1[randNum];
            arr1[randNum] =  this.props.data.others[w];
            for (let q = randNum; q < (lenOfArr1 +( this.props.data.others.length-1)); q++) {
                temp1 = arr1[q + 1];
                arr1[q + 1] = temp;
                temp = temp1;
                console.log("arr1[q],arr2[w]", arr1[q], this.props.data.others[w]);
                
            }
        }
       
        for (let l = 0; l < arr1.length; l++) {
            statuses[l] = 'neutral';
        }
        return ({
            arr1,
            statuses,
            arr2,
            num,
            numOFWrongElem
        })


    }

    componentWillReceiveProps(nextProps) {
        this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
    }

   
    onButtonPress = (id, view) => {
      //  this.refs.view1.wobble(1000);
     let j = 0;
     let proArray = [];

        for (let i = 0; i < this.state.arr1.length; i++) {
        proArray[i] = this.state.arr1[i];
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
       
       this.setState( {...this.state,arr1:this.state.arr1.filter((val,index)=> index!=id)})
            this.props.onScore(2);
            this.props.setProgress(this.state.num /  this.props.data.others.length);
            if (this.state.numOFWrongElem ==  this.props.data.others.length) {
              
               this.setState({statuses: this.state.statuses.map(()=>'selected')})
               this.refs.view1.zoomIn(1000);
               setTimeout( () => { this.props.onEnd();},1500)
            }
        
        } else {
            view.wobble(1000);
       }
    }

    render() {

        return (
            <Animatable.View 
            ref='view1' >
            <TileGrid
                delegateTouch={this.props.delegateTouch}
                reverse={this.props.reverse}
                numRows={SIZE}
                numCols={this.state.arr1.length}
                statuses={this.state.statuses}
                data={this.state.arr1}
                onStatusChange={this._onStatusChange}
                statusStyles = {{
                    neutral: {
                      View: {
                        backgroundColor: '#ed2d85'
                      },
                      Text: {
                        color: 'black'
                      }
                    },
                    selected: {
                        View: {
                            backgroundColor:'#ffffff'
                          },
                          Text: {
                            color: 'black'
                          }
                    }
                  }}
                style={{
                    width: this.props.style.width,
                    height: this.props.style.height
                }}
                onPress={this.onButtonPress}
            />

            </Animatable.View>
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
