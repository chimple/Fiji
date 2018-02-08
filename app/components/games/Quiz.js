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

import Tile from './Tile';
import Animbutton from './Animbutton';

const { width, height } = Dimensions.get('window');

let arrnew = [];

export default class Quiz extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height,
        width
      }

      Dimensions.addEventListener('change', () => {
        width = Dimensions.get('window').width;
        height = Dimensions.get('window').height;
      }); 

      this.qno = 0;
      this.score = 0;
   
      const jdata = Object.assign({}, this.props.data);
      arrnew = Object.keys(jdata).map((k) => { return jdata[k]; });
      console.log(arrnew);
      this.state = {
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].choices,
        correctoption: arrnew[this.qno].answerIndex,
        countCheck: 0,
      };

      console.log(question);
      console.log(options);
      console.log(correctoption);
    
    }

    state = Dimensions.get("window");
    handler = dims => this.setState(dims);

    componentDidMount() {      
    // this.props.dispatch(fetchMultipleChoiceData(0, 2, 1));
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillMount() {
      Dimensions.addEventListener("change", this.handler);
      width = Dimensions.get('window').width;
      height = Dimensions.get('window').height;
  }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
    }


    next() {
      if (this.qno < arrnew.length - 1) {
        this.qno++;
   
        this.setState({ countCheck: 0, 
          question: this.props.ques,
        options: arrnew,
        correctoption: this.props.correctans });
      } else {
        this.props.quizFinish(this.score);
       }
    }

    _answer(status, ans) {
      if (status === true) {
          const count = this.state.countCheck + 1;
          this.setState({ countCheck: count });
          if (ans === this.state.correctoption) {
            this.score += 20;
            this.next();
            this.refs.questionView.zoomIn(800);
          }
        } else {
          const count = this.state.countCheck - 1;
          this.setState({ countCheck: count });
          if (this.state.countCheck < 1 || ans === this.state.correctoption) {
          this.score -= 1;
         }
        }
    }

       
    render() {

      const _this = this;
      const currentOptions = this.state.options;
      console.log(currentOptions);
      const options = Object.keys(currentOptions).map((k) => {
        return (<View
        key={k}
        style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}
        >
   
          <Animbutton 
          countCheck={_this.state.countCheck} 
          onColor={'#483d8b'} 
          effect={k === this.state.correctoption ? 'tada' : 'shake'} 
          _onPress={(status) => _this._answer(status, k)} 
          text={currentOptions[k]} 
          />
   
        </View>);
      });
      
      return (
        <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 5 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Current Score - {this.score}</Text>
        </View>
 

        <View style={styles.container}>
         {height > width ? <View style= {{ paddingTop: height * 0.2 }} /> : <View /> }
                 
        <View 
        style={{ flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: height * 0.01 }}
        >

        <Animatable.View ref="questionView" style={styles.oval}>
          <Text style={styles.welcome}>
            {this.state.question}
          </Text>
       </Animatable.View> 

          {options.length === 2 ? <View 
          style={{ flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center', 
          width }}
          >
          { options }
          </View> : 
          <FlatList 
            data={options}
            numColumns={2}
            style={{ flexGrow: 1 }}
            renderItem={({ item }) => <View key={item}>{item}</View>}
          />
        
          
          }
          </View>
        </View>
        </ScrollView>
      );
    
    }
  }
   
  const styles = {    
    oval: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.35,
    borderRadius: 20,
    backgroundColor: '#483d8b',
    margin: 15
    },
    container: {
      flex: 1,
      alignContent: 'space-between'
    },
    welcome: {
      fontSize: height * 0.08,
      fontWeight: 'bold',
      margin: height * 0.002,
      color: 'white',
    },
    toolbar: {
          backgroundColor: '#483d8b',
          paddingTop: height * 0.01,
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

