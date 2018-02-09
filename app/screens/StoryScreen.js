import React, { Component } from 'react'
import {
  View, Text, ActivityIndicator,
  Image, ImageBackground, ScrollView,
  TouchableOpacity, FlatList, Dimensions, Animated
} from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import { fetchStory } from '../redux/story'
import SvgUri from 'react-native-svg-uri'
import StorySection from '../components/StorySection'
import { Buffer } from 'buffer'


class StoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      stories: []
    };
  }

  componentWillUpdate() {

  };

  _renderState() {
    // var page = this.getState;
    var dialog = this.props.story.pages[this.state.page].dialog;
    console.log("dialog" + dialog.length);
    if (this.state.count < dialog.length) {
      this.setState({ count: this.state.count + 1 });
      console.log("counter value is : ", this.state.count);
      // this.state.stories.push({text:'this is suhas',speaker:'Alice'})

      this.setState(prevState => ({
        stories: [
          ...prevState.stories,
          this.props.story.pages[this.state.page].dialog[this.state.count]
        ]
      }))
    }
    else {
      //console.log("else part is trigger ....")
      console.log("page length data : ", this.props.story.pages.length)
      console.log("this.state.page : ", this.state.page)
      if (this.props.story.pages.length - 1 > this.state.page) {
        this.setState({ count: 0, page: this.state.page + 1 })


      } else {
        // this.setState({ count: 0, page: 0 })
        // console.log("Thank you , you already gone throw all pages .... ")
      }
    }
    console.log('this.state is', this.state.stories);
  }

  componentDidMount() {
    this.props.dispatch(fetchStory(this.props.navigation.state.params.title))
  }

  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item, index }) => (
    <View >
      <StorySection item={item} index={index} page={this.state.page} count={this.state.count} />
    </View>
  )


  render() {
    if (this.props.isFetching) {
      return (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      )
    } else {
      if (this.props.story._id) {
        let svg = Buffer.from(this.props.story.pages[this.state.page].bg, 'base64').toString('utf8')
        const h = Dimensions.get("window").height
        const w = Dimensions.get("window").width
        const length = h > w ? h : w

        return (
          <View style={{ flex: 1 }}>
            <View style={styles.headerViewStyle}>
              <Text style={styles.HeaderTextStyle}>
                {this.props.navigation.state.params.title.title}
              </Text>
              <Image
                style={styles.storyImageStyle}
                source={{
                  uri:
                    'data:image/png;base64,' + this.props.navigation.state.params.title.image
                }} />
            </View>
            <View style={{ flex: 1 }}>
              {/* <ImageBackground style={styles.backgroundImageStyle}
               source={{ uri: 'data:image/svg+xml;base64,' + this.props.story.pages[this.state.page].bg, }}
              > */}
              <SvgUri
                style={{ flex: 1, position: 'absolute' }}
                width={length}
                height={length}
                //source={{ uri:'data:image/svg+xml;base64,' + this.props.story.pages[this.state.page].bg }}
                svgXmlData={svg}
              >
              </SvgUri>

              <FlatList
                data={this.state.stories}
                ref='flatlist'
                // refreshControl=
                refreshing
                extraData={this.state.stories}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onContentSizeChange={() => {
                  this.refs.flatlist.scrollToEnd()
                }}
              />


            </View>
            <TouchableOpacity onPress={() => this._renderState()} >
              <View style={styles.nextButtonStyle}>
                <Icon name='keyboard-arrow-down' color='black' />
              </View>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View>
            <Text>No story found</Text>
          </View>
        )
      }
    }
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
    //backgroundColor: 'pink'
  },
  nextButtonStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9999ff',
    height: 50,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    position: 'relative',
    opacity: 1
  },
  storyImageStyle: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 20
  }
}

export default connect(state => ({
  story: state.story.story,
  isFetching: state.story.isFetching,
}))(StoryScreen)
