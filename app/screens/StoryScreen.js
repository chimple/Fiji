import React, { Component } from 'react'
import {
  View, Text, ActivityIndicator,
  Image, ImageBackground, ScrollView,
  TouchableOpacity, FlatList
} from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import { fetchStory } from '../redux/story'
//import SvgUri from 'react-native-svg-uri'
import StorySection from '../components/StorySection'


class StoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 1, page: 0 };
  }
  _renderState() {
    // var page = this.getState;
    var dialog = this.props.story.pages[this.state.page].dialog;
    console.log("dialog" + dialog.length);
    if (this.state.count < dialog.length) {
      this.setState({ count: this.state.count + 1 });
      console.log("counter value is : " , this.state.count);
    }
    else {
      //console.log("else part is trigger ....")
      console.log("page length data : ", this.props.story.pages.length)
      console.log("this.state.page : ", this.state.page)
      if (this.props.story.pages.length - 1 > this.state.page) {
        this.setState({ count: 0, page: this.state.page + 1 })
      } else {
        this.setState({ count: 0, page: 0 })
        console.log(" Thank you , you already gone throw all pages ....")
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStory(this.props.navigation.state.params.title))
  }

  render() {
    console.log(this.state.count);
    console.log("the page data is : ", this.props.story.pages)
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
                source={{ uri: this.props.story.pages[this.state.page].bg }}>
                {/* {this.props.story.pages[0].bg} */}
                <ScrollView ref="scrollView"
                  onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}>
                  <View  >
                    <StorySection
                      page={this.state.page}
                      count={this.state.count}

                    />
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
            <TouchableOpacity onPress={() => this._renderState()} >
              <View style={styles.nextButtonStyle}>
                <Icon name='keyboard-arrow-down' color='black' />
              </View>
            </TouchableOpacity>
          </View>
          :
          <View>
            <Text>No story found</Text>
          </View>
    )
  }
}

StoryScreen.propTypes = {
  story: PropTypes.object,
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
    flex: 1,
    backgroundColor: 'pink'
  },
  nextButtonStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9999ff',
    height: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    position: 'relative',
    opacity: 1
  }
}

export default connect(state => ({
  story: state.story.story,
  isFetching: state.story.isFetching,
}))(StoryScreen)





