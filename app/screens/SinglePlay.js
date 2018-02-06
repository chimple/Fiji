import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchMultipleChoiceData } from '../redux/data'
import Quiz from '../components/games/Quiz';
import ScoreScreen from '../screens/ScoreScreen'


class SinglePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizFinish: false,
      score: 0
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchMultipleChoiceData(0, 2, 1));
    console.log(this.props.gameData[0]);
  }
  
  _quizFinish(score) {    
    this.setState({ quizFinish: true, score });
  }
  _scoreMessage(score) {
    if (score <= 30) {
      return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: 'row' }} >
                  <Icon name="sentiment-very-dissatisfied" size={30} color="white" />
                </View>
                <Text style={styles.score}>You need to work hard</Text>
                <Text style={styles.score}>You scored {score}</Text>
              </View>);
    } else if (score > 30 && score < 60) {
      return (<View style={styles.innerContainer} >
                  <View style={{ flexDirection: 'row' }} >
                    <Icon name="sentiment-satisfied" size={30} color="white" />
                    <Icon name="sentiment-satisfied" size={30} color="white" />
                  </View>
                  <Text style={styles.score}>You are good</Text>
                  <Text style={styles.score}>Congrats you scored {score} </Text>
                </View>);
    } else if (score >= 60) {
      return (<View style={styles.innerContainer}>
                 <View style={{ flexDirection: 'row' }} >
                     <Icon name="whatshot" size={30} color="white" />
                     <Icon name="whatshot" size={30} color="white" />
                     <Icon name="whatshot" size={30} color="white" />
                  </View>
                  <Text style={styles.score}>You are the master</Text>
                  <Text style={styles.score}>Congrats you scored {score} </Text>
                </View>);
    }
  }
  render() {
    console.log(this.props.navigation.state.params.item.name)
    console.log(this.props.navigation.state.params.game.name)
    console.log(this.props.navigation.state.params.user.name)
    return (
      <View style={{ flex: 1 }}>
 
       { this.state.quizFinish ? <ScoreScreen item={this.props.navigation.state.params.item} game={this.props.navigation.state.params.game} user={this.props.navigation.state.params.user}/> : <Quiz quizFinish={(score) => this._quizFinish(score)} /> }

      </View>
    );
  }

}


const scoreCircleSize = 300;
const styles = {
  score: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default connect(state => ({
  gameData: state.data.gameData,
  isFetching: state.data.isFetching,
}))(SinglePlay)
