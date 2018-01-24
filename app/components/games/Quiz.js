import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions
    } from 'react-native';
import Animbutton from './Animbutton';

const { width } = Dimensions.get('window');
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
        correctoption: 'option3',
        options: {
            option1: 'H',
            option2: 'S'
          },
        question: 'S'
      }
    }
  }
  };

class Quiz extends Component {
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

    next() {
      if (this.qno < arrnew.length - 1) {
        this.qno++;
   
        this.setState({ countCheck: 0, 
            question: arrnew[this.qno].question, 
            options: arrnew[this.qno].options, 
            correctoption: arrnew[this.qno].correctoption
        });
      } else {        
        this.props.quizFinish(this.score * 20);
       }
    }
    
    funcanswer(status, ans) {   
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
      const dangthis = this;
      const currentOptions = this.state.options;
      const options = Object.keys(currentOptions).map((k) => {
        return (
            <View 
            key={k} 
            style={{ padding: 10 }}
            >
   
          <Animbutton 
          countCheck={dangthis.state.countCheck} 
          onColor={'#483d8b'} 
          effect={'tada'} 
          funcOnPress={(status) => dangthis.funcanswer(status, k)} 
          text={currentOptions[k]} 
          />

        </View>);
      });
   
      return (
        <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
        <View style={styles.container}>
   
        <View 
        style={{ flex: 1, 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            }}
        >
   
        <View style={styles.oval} >
          <Text style={styles.welcome}>
            {this.state.question}
          </Text>
       </View>

          <View style={{ padding: 10, flexDirection: 'row' }}>
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
    width: width * 0.5,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#483d8b',
    justifyContent: 'center',
    alignItems: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 120
    },
    welcome: {
      fontSize: 65,
      margin: 15,
      color: '#fff'
    },
  };

  export default Quiz;
