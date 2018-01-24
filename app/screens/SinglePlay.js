import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    View,
    Text
  } from 'react-native';
  import { Icon } from 'react-native-elements';
  import Quiz from '../components/games/Quiz';

class singlePlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizFinish: false,
            score: 0
        };
    }

    funconPressBack() {
        const { goBack } = this.props.navigation;
          goBack();
      }
      funcquizFinish(score) {    
        this.setState({ quizFinish: true, score });
      }
      funcscoreMessage(score) {
        if (score <= 30) {
          return (<View style={styles.innerContainer} >
                    <View style={{ flexDirection: 'row' }} >
                      <Icon name="sentiment-very-dissatisfied" size={30} color="white" />
                    </View>
                    <Text style={styles.score}>You need to work hard</Text>
                    <Text style={styles.score}>You scored {score}%</Text>
                  </View>);
        } else if (score > 30 && score < 60) {
          return (<View style={styles.innerContainer} >
                      <View style={{ flexDirection: 'row' }} >
                        <Icon name="sentiment-very-satisfied" size={30} color="white" />
                        <Icon name="sentiment-very-satisfied" size={30} color="white" />
                      </View>
                      <Text style={styles.score}>You are good</Text>
                      <Text style={styles.score}>Congrats you scored {score}% </Text>
                    </View>);
        } else if (score >= 60) {
          return (<View style={styles.innerContainer}>
                     <View style={{ flexDirection: 'row' }} >
                         <Icon name="whatshot" size={30} color="white" />
                         <Icon name="whatshot" size={30} color="white" />
                         <Icon name="whatshot" size={30} color="white" />
                      </View>
                      <Text style={styles.score}>You are the master</Text>
                      <Text style={styles.score}>Congrats you scored {score}% </Text>
                    </View>);
        }
      }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <View style={styles.toolbar}>
                    <TouchableOpacity 
                    onPress={() => this.funconPressBack()}
                    >
                    <Icon name="arrow-back" size={30} color='#fff' />
                    </TouchableOpacity>
                    
                    <Text style={styles.toolbarTitle} />
                    <Text style={styles.toolbarButton} />
                </View>

                { this.state.quizFinish ? <View style={styles.container}>
                    <View style={styles.circle}>
 
                { this.funcscoreMessage(this.state.score) }
                    </View>
 
                        </View> : <Quiz quizFinish={(score) => this.funcquizFinish(score)} /> }
 
            </View>                
        );
    }
}

const scoreCircleSize = 300;
const styles = StyleSheet.create({
  score: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: '#483d8b'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
        backgroundColor: '#483d8b',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
});

export default singlePlay;
