import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GameCategoryList from '../components/GameCategoryList'
import { fetchGames } from '../redux/game'

class GamesScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGames())
    console.log(this.props.navigation.state.params.user.name)
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.games.length
            ?
              <GameCategoryList
                games = { this.props.games }
                navigation={ this.props.navigation }
                onPressItem = { this._handlePress }
              />
            :
              <View>
                <Text>No games found</Text>
              </View>
    )
  }

  _handlePress = ( title ) => {
    this.props.navigation.navigate('Game', { title, user: this.props.navigation.state.params.user })
  }

}

GamesScreen.propTypes = {
  games: PropTypes.array,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object.isRequired
      })
    })
  })
}

export default connect(state => ({
  games: state.game.games,
  isFetching: state.game.isFetching,
}))(GamesScreen)