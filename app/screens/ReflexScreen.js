import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchGameData } from '../redux/game'
import ReflexBoard from '../components/games/ReflexBoard'

class ReflexScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGameData())
  }

  render() {
    return (
      this.props.isFetching
        ?
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
        :
        this.props.data.length
          ?
          <View style={styles.container}>
            <ReflexBoard
              data = { this.props.data }  
            />
          </View>
          :
          <View />
    )
  }
}

ReflexScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        set_id: PropTypes.string
      })
    })
  })
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
  isFetching: state.game.isFetching,
}))(ReflexScreen)