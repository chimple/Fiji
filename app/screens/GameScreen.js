import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchGameData } from '../redux/game'
import ReflexBoard from '../components/games/ReflexBoard'

const GameComponents = {
  'ReflexBoard': ReflexBoard
}

class GameScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGameData())
  }

  render() {
    console.log(this.props.navigation.state.params.item.name)
    console.log(this.props.navigation.state.params.game.name)
    console.log(this.props.navigation.state.params.user.name)
    const GameComponent = GameComponents['ReflexBoard']
    return (
      this.props.isFetching
        ?
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
        :
        this.props.data.length
          ?
          <View style={styles.container}>
            <GameComponent
              data={this.props.data}
            />
          </View> :
          <View>
            <Text>No games found</Text>
          </View>
    )
  }


}

GameScreen.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object,
  isFetching: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
})

export default connect(state => ({
  data: state.game.data,
  theme: state.game.theme,
  isFetching: state.game.isFetching,
}))(GameScreen)