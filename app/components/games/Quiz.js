import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types'

import Tile from './Tile';
import TileGrid from './TileGrid';
import Animbutton from './Animbutton';

// const { width, height } = Dimensions.get('window');

// let arrnew = [];
const SIZE = 2;
var arr1= [];
var j=0;
// const height = '30%';
// const width = '30%';

export default class Quiz extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height: this.props.style.height,
        width: this.props.style.width,
        question: this.props.data.question,
        options: this.props.data.choices,
        correctoption: this.props.data.answerIndex
      }
      // console.log(this.props);
      // console.log(this.props.data);
      // console.log(question);
      // console.log(options);
      // console.log(correctoption);


      // Dimensions.addEventListener('change', () => {
      //   width = Dimensions.get('window').width;
      //   height = Dimensions.get('window').height;
      // }); 

      const shuffledData = this.props.data.choices.map(function(element, i) {
        arr1[j]=element;
        j++;
        console.log(element);
      });

      let letters = new Array(SIZE * SIZE);
      for (let i = 0; i < letters.length; i++) {
        letters[i] = arr1[i];
        shuffledData[i] = arr1[i];
      }

      arr1 =[];
      j=0;

      let currentIndex = this.props.data.answerIndex;
      
      this.state = {
        letters,
        shuffledData,
        currentIndex,
      }
      
      console.log(shuffledData);
      console.log(letters);
      console.log(currentIndex);
      console.log(this.props.data.question);

      // const jdata = Object.assign({}, this.props.data);
      // arrnew = Object.keys(jdata).map((k) => { return jdata[k]; });
      // console.log(arrnew);
      // console.log(this.props)
      // this.state = {
      //   question: this.props.data.question,
      //   options: this.props.data.choices,
      //   correctoption: this.props.data.answerIndex,
      //   countCheck: 0,
      // };

      // console.log(question);
      // console.log(options);
      // console.log(correctoption);
    
    }

  //   state = Dimensions.get("window");
  //   handler = dims => this.setState(dims);

  //   componentDidMount() {      
  //   // this.props.dispatch(fetchMultipleChoiceData(0, 2, 1));
  //       Dimensions.addEventListener("change", this.handler);
  //   }

  //   componentWillMount() {
  //     Dimensions.addEventListener("change", this.handler);
  //     width = Dimensions.get('window').width;
  //     height = Dimensions.get('window').height;
  // }

  //   componentWillUnmount() {
  //     // Important to stop updating state after unmount
  //     Dimensions.removeEventListener("change", this.handler);
  //   }


    // next() {
    //   if (this.qno < arrnew.length - 1) {
    //     this.qno++;
   
    //     this.setState({ countCheck: 0, 
    //       question: this.props.ques,
    //     options: arrnew,
    //     correctoption: this.props.correctans });
    //   } else {
    //     this.props.quizFinish(this.score);
    //    }
    // }

    // _answer(status, ans) {
    //   if (status === true) {
    //       const count = this.state.countCheck + 1;
    //       this.setState({ countCheck: count });
    //       if (ans === this.state.correctoption) {
    //         this.score += 20;
    //         this.props.onEnd()
    //         this.refs.questionView.zoomIn(800);
    //       }
    //     } else {
    //       const count = this.state.countCheck - 1;
    //       this.setState({ countCheck: count });
    //       if (this.state.countCheck < 1 || ans === this.state.correctoption) {
    //       this.score -= 20;
    //      }
    //     }
    // }

    _clickTile = (id, view) => {
      console.log(id);
      console.log(this.state.currentIndex);
      console.log(this.props.data.choices);
      if (this.state.letters[id] == this.props.data.choices[this.state.currentIndex]) {
        view.zoomOut(250).then((endState) => {
          this.props.onScore(2)
          if (this.state.currentIndex + 1 >= this.props.data.choices.length) {
            this.props.onEnd()
          } else {
            this.setState((prevState, props) => {
              console.log(prevState)
              const newLetters = prevState.letters.map((value, index) => {
                return index == id ? prevState.shuffledData[prevState.currentIndex + SIZE * SIZE] : value
              })
              console.log(newLetters)
              return {
                letters: newLetters,
                shuffledData: prevState.shuffledData,
                currentIndex: prevState.currentIndex + 1
              }
            })
            this.state.currentIndex + SIZE * SIZE <= this.props.data.choices.length && view.zoomIn(250)
          }
        })
      } else {
        view.shake(250)
      }
    }

    _onPress = () => {
      
    }

       
    render() {

      // const _this = this;
      // const currentOptions = this.state.options;
      // console.log(currentOptions);
      // const options = Object.keys(currentOptions).map((k) => {
      //   return (<View
      //   key={k}
      //   style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}
      //   >
   
      //     <Animbutton 
      //     countCheck={_this.state.countCheck} 
      //     onColor={'#483d8b'} 
      //     effect={k === this.state.correctoption ? 'tada' : 'shake'} 
      //     _onPress={(status) => _this._answer(status, k)} 
      //     text={currentOptions[k]} 
      //     />
   
      //   </View>);
      // });

      const cellSize = Math.min(
        Math.floor(this.props.style.width / 2),
        Math.floor(this.props.style.height / 2)
      );
  
      const padding = Math.floor(cellSize * .05);
      const tileSize = cellSize - padding * 2;
     
      
      return (
        <ScrollView style={{ backgroundColor: '#E53554', paddingTop: 5 }}>
        <View style={styles.container}>                 
        <View 
        style={{ flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: this.state.height * 0.01 }}
        >

        
          <View>
          <Tile
            id={0}
            onPress={this.props._onPress}
            tileColor='#24B2EA'
            edgeColor='black'
            pressedTileColor='goldenrod'
            pressedEdgeColor='darkgoldenrod'
            textColor='#fff'
            text={this.props.data.question}
            style={{
              width: tileSize,
              height: tileSize
            }}
          />
          </View>      
          

       <TileGrid
        numRows={SIZE}
        numCols={SIZE}
        data={this.state.letters}
        tileColor='#24B2EA'
        edgeColor='deepskyblue'
        pressedTileColor='goldenrod'
        pressedEdgeColor='darkgoldenrod'
        textColor='#FFFFFF'
        style={{
          width: this.props.style.width * 0.5,
          height: this.props.style.height * 0.5
        }}
        onPress={this._clickTile}
      />


          </View>
        </View>
        </ScrollView>
      );
      this.state.letters=[];
    }
  }
   
  const styles = {    
    oval: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: 20,
    backgroundColor: '#E53554',
    margin: 15
    },
    container: {
      flex: 1,
      alignContent: 'space-between'
    },
    welcome: {
      fontSize: '30%' * 0.08,
      fontWeight: 'bold',
      margin: '30%' * 0.002,
      color: 'white',
    },
    toolbar: {
          backgroundColor: '#E53554',
          paddingTop: 10,
          paddingBottom: 10,
          flexDirection: 'row'
      },
      toolbarTitle: {
          color: '#fff',
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          flex: 1
      }
  };

  // export default connect(state => ({
  //   gameData: state.data.gameData,
  //   isFetching: state.data.isFetching,
  // }))(Quiz)
  Quiz.propTypes = {
    data: PropTypes.object,
    onScore: PropTypes.func,
    onEnd: PropTypes.func
  }
