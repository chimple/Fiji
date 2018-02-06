import React, { Component } from 'react';
import { View } from 'react-native';
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
    this.props.dispatch(fetchMultipleChoiceData(5, 2, 1));
    console.log(this.props.gameData);
  }
  
  _quizFinish(score) {    
    this.setState({ quizFinish: true, score });
  }
  
  render() {
    console.log(this.props.navigation.state.params.item.name)
    console.log(this.props.navigation.state.params.game.name)
    console.log(this.props.navigation.state.params.user.name)
    console.log(this.props.gameData)
    console.log(this.props.gameData.answerIndex)
    console.log(this.props.gameData.choices)
    console.log(this.props.gameData.question)
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
