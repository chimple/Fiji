import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animbutton from './Animbutton';

const { width, height } = Dimensions.get('window');

let arrnew = [];

const jsonData = { quiz: {
    quiz1: {
      question1: {
        correctoption: 'option1',
        options: {
          option1: 'A',
          option2: 'Z'
        },
        question: 'A'
      },
      question2: {
        correctoption: 'option2',
        options: {
            option1: 'W',
            option2: 'C'
          },
        question: 'C'
      },
      question3: {
        correctoption: 'option1',
        options: {
            option1: 'F',
            option2: 'R'
          },
        question: 'F'
      },
      question4: {
        correctoption: 'option2',
        options: {
            option1: 'P',
            option2: 'Q'
          },
        question: 'Q'
      },
      question5: {
        correctoption: 'option2',
        options: {
            option1: 'H',
            option2: 'S'
          },
        question: 'S'
      }
    }
  }
  };
  
  export default class Quiz extends Component {
    constructor(props) {
      super(props);
      this.qno = 0;
      this.score = 0;
   
      const jdata = jsonData.quiz.quiz1;
      arrnew = Object.keys(jdata).map((k) => { return jdata[k]; });
      this.state = {
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
        countCheck: 0
      };
    }

    prev() {
      if (this.qno > 0) {
        this.qno--;
        this.setState({ question: arrnew[this.qno].question, 
          options: arrnew[this.qno].options, 
          correctoption: arrnew[this.qno].correctoption });
      }
    }

    next() {
      if (this.qno < arrnew.length - 1) {
        this.qno++;
   
        this.setState({ countCheck: 0, 
          question: arrnew[this.qno].question, 
          options: arrnew[this.qno].options, 
          correctoption: arrnew[this.qno].correctoption });
      } else {
        this.props.quizFinish(this.score * 20);
       }
    }

    _answer(status, ans) {
      if (status === true) {
          const count = this.state.countCheck + 1;
          this.setState({ countCheck: count });
          if (ans === this.state.correctoption) {
            this.score += 1;
            this.next();
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
      const options = Object.keys(currentOptions).map((k) => {
        return (<View key={k} style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
   
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
        <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>

        <View style={styles.container}>
        <View style={{ height: height * 0.15 }}  />
        
        <View 
        style={{ flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', }}
        >
        
        <View style={styles.oval}>
          <Text style={styles.welcome}>
            {this.state.question}
          </Text>
       </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          { options }
          </View>
           
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
    width: width * 0.5,
    borderRadius: 20,
    backgroundColor: '#483d8b'
    },
    container: {
      flex: 1,
      alignContent: 'space-between'
    },
    welcome: {
      fontSize: 56,
      fontWeight: 'bold',
      margin: 15,
      color: 'white'
    }
  };

