import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, ImageBackground, ScrollView } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchStory } from '../redux/story'
//import SvgUri from 'react-native-svg-uri'

class StoryScreen extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStory(this.props.navigation.state.params.title))
  }

  render() {
    console.log("coming")
    console.log(this.props.story)
    return (
      this.props.isFetching
        ?
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
        :
        this.props.story._id
          ?
          <View style={{ flex: 1 }}>
            <View style={styles.headerViewStyle}>
              <Text style={styles.HeaderTextStyle}>
                {this.props.navigation.state.params.title.title}
              </Text>
              <Image
                style={styles.characterImageStyle}
                source={{
                  uri:
                    'data:image/png;base64,' + this.props.navigation.state.params.title.image,
                }} />
            </View>
            <View style={{ flex: 1 }}>
              <ImageBackground style={styles.backgroundImageStyle}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBVHZKXKvVZepsZRShbLhp-QwShGWlRn6OkMCddQBBsD73ujE' }}>
                {/* {this.props.story.pages[0].bg} */}
                <ScrollView>
                  <View style={styles.storyContainer}>
                    <Image style={styles.characterImageStyle}
                      source={{
                        uri:
                          'data:image/png;base64,' + this.props.story.pages[0].dialog[0].image,
                      }} />
                    <View style={styles.textContainer}>
                      <Text style={styles.dialogStyle}>
                        {this.props.story.pages[0].dialog[0].text}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.storyContainer2}>
                    <View style={styles.textContainer}>
                      <Text style={styles.dialogStyle}>
                        {this.props.story.pages[0].dialog[1].text}
                      </Text>
                    </View>
                    <Image style={styles.characterImageStyle}
                      source={{
                        uri:
                          'data:image/png;base64,' + this.props.story.pages[0].dialog[1].image,
                      }} />
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </View>
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
const styles = {
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    position: 'relative'
  },
  HeaderTextStyle: {
    fontSize: 25,
    color: 'black'
  },
  backgroundImageStyle: {
    flex: 1

  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,

  },
  textContainer: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },

  },
  characterImageStyle: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'white'
  },

  dialogStyle: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  storyContainer2: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',

  },
}

export default connect(state => ({
  story: state.story.story,
  isFetching: state.story.isFetching,
}))(StoryScreen)
