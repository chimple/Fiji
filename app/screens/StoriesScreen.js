import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import StoryList from '../components/StoryList'
import { fetchTitles } from '../redux/story'

class StoriesScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTitles())
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.titles.length
            ?
              <StoryList
                titles = { this.props.titles }
                navigation={ this.props.navigation }
                onPressItem = { this._handlePress }
              />
            :
              <View>
                <Text>No stories found</Text>
              </View>
    )
  }

  _handlePress = ( title ) => {
    this.props.navigation.navigate('Story', { title })
  }

}

StoriesScreen.propTypes = {
  titles: PropTypes.array
}

export default connect(state => ({
  titles: state.story.titles,
  isFetching: state.story.isFetching,
}))(StoriesScreen)