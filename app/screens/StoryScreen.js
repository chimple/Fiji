import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchStory } from '../redux/story'

class StoryScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStory(this.props.navigation.state.params.title))
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.story
            ?
              <Text>
                { this.props.navigation.state.params.title.title}
                { this.props.story._id }
              </Text>
            :
              <View>
                <Text>No story found</Text>
              </View>
    )
  }
}

StoryScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.object.isRequired
      })
    })
  })
}

export default connect(state => ({
  story: state.story.story,
  isFetching: state.users.isFetching,
}))(StoryScreen)