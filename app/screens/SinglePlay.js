import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { fetchMultipleChoiceData } from '../redux/data'
import Quiz from '../components/games/Quiz';
import ScoreScreen from '../screens/ScoreScreen'

let count = 0;
let j = 0;
let arrques = [];
let arrans = [];
let arrchoice = [];

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
    console.log(count);
  }
  
  _quizFinish(score) {    
    this.setState({ quizFinish: true, score });
  }
  
  render() {
    console.log(this.props.navigation.state.params.item.name)
    console.log(this.props.navigation.state.params.game.name)
    console.log(this.props.navigation.state.params.user.name)
    data = this.props.gameData.map(function(temp, index){
      arrques[j] = temp.question;
      arrans[j] = temp.answerIndex;
      arrchoice[j] = temp.choices;
      console.log(arrques[j]);
      console.log(arrans[j]);
      console.log(arrchoice[j]);
      j++;
    });
    console.log(j);
    console.log(arrques);
    console.log(arrans);
    console.log(arrchoice);
    console.log(this.props.gameData);
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
