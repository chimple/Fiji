import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';
import { react-native-orientation } from 'react-native-orientation';
import Board from '../components/games/Board';
import Card from '../components/games/Card';

export default class MemoryMatchingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(4 , 4), players: 1}
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  onRestartPress() {
    alert("RestartGame!!!");
  }

  makeSinglePlayer() {
    alert("makeSinglePlayer!!!");
  }

  getPlayerToggleButtons() {
  return (
      <View style={styles.playerToggleButtons}>
          <TouchableHighlight onPress={this.makeSinglePlayer} underlayColor="transparent" activeOpacity={0.5}>
              <Text style={styles.buttonText}>👤 Single Player</Text>
          </TouchableHighlight>
      </View>
  );
}

handleCardPress(url: string, row: number, col: number) {
  var board = this.state.board;
  var previous = board.selected;
  var selected = this.refs['card' + row + col];
  var current = {
      url: url,
      node: selected
  }

  if (!previous) {
      // first card
      board.selected = current;
  } else if (previous.url === url) {
      // successful hit
      previous.node.setPaired();
      selected.setPaired();

      this.setState({board: board.pair()});
  } else {
      // missed hit
      board.miss(true);

      setTimeout(
          () => {
              selected.hide();
              previous.node.hide();
              this.setState({board: board});
          },
        100
      );
  }
}

onCardHide() {
    this.state.board.unlock();
  }

  canShow() {
    return !this.state.board.isLocked;
  }

  render() {

    var board = this.state.board;
    console.log(this.state.board);
    var rows = board.grid.map((cards, row) =>
    <View key={'row' + row} ref={'row' + row} style={styles.row}>
        {cards.map((cardCfg, col) =>
          <Card
            key={'col' + col}
            ref={'card' + row + col}
            img={cardCfg.url}
            onPress={this.handleCardPress.bind(this, cardCfg.url, row, col)}
            onHide={this.onCardHide}
            canShow={this.canShow}
            cardCfg={cardCfg}
          />
        )}
      </View>
  );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Memory Game</Text>

        {this.getPlayerToggleButtons()}

        <View style={styles.board}>
          {rows}
        </View>

        <TouchableHighlight
            onPress={this.onRestartPress}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>🔄 Restart</Text>
          </TouchableHighlight>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F9CB',
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 39,
    marginBottom: 0,
    color: '#535659',
  },
  buttonText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 16,
    marginTop: 25,
    color: '#535659',
  },
  playerToggleButtons: {
    flexDirection: 'row',
  },
  board: {
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  }
});
