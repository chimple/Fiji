import React from 'react'
import {
  View, Text, SectionList, Dimensions, Animated,
  TouchableOpacity, TouchableWithoutFeedback, UIManager, LayoutAnimation
} from 'react-native'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types'

class AnimationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
      isPlaying: false
    };
  }

  componentDidMount() {
    this.props.autoPlay && this._play()
  }

  _play = () => {
    !this.state.isPlaying &&
      this.setState((prevState, props) => {
        Animated.timing(prevState.progress, {
          toValue: 1,
          duration: props.duration,
        }).start(({ finished }) => {
          if (finished) {
            this.state.progress.setValue(0)
            this.setState({...this.state, isPlaying: false})
          }
        })
        return {
          ...prevState,
          isPlaying: true
        }
      })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this._play()}>
        <LottieView style={this.props.style}
          source={this.props.animationCharacter}
          progress={this.state.progress} />
      </TouchableWithoutFeedback>
    )
  }
}

AnimationView.defaultProps = {
  duration: 2000
}

AnimationView.propTypes = {
  duration: PropTypes.number,
  animationCharacter: PropTypes.object,
  onFinish: PropTypes.func,
  autoPlay: PropTypes.bool
}

class Dialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageMode: this.props.index != 0,
      autoPlay: false
    }
  }

  _renderCharacter = (character, animation) => {
    return (
      <View style={{ height: 100, width: 100, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={this._onClick}>
          {this.state.imageMode
            ?
            <SvgUri
              width={64}
              height={64}
              svgXmlData={character}
              style={{
                alignSelf: 'center'
              }}
            />
            :
            <AnimationView
              style={{ height: 96, width: 96, alignSelf: 'center' }}
              animationCharacter={animation}
              autoPlay={this.props.index == 0 || this.state.autoPlay}
              onFinish={this._onSwitch}
            />
          }
        </TouchableOpacity>
      </View>
    )
  }

  _onSwitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    this.setState({ ...this.state, imageMode: true })
    this.props.onFinish()
  }

  _onClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    this.setState({ ...this.state, imageMode: !this.state.imageMode, autoPlay: true })
  }

  _renderText = (text) => (
    <Text
      style={styles.text}
    >
      {text}
    </Text>
  )

  _onPressCharacter = () => {
    this.setState({ imageMode: !this.state.imageMode })
  }

  _renderAnimation = (animation) => (
    <AnimationView
      style={{ height: 256, width: 256, alignSelf: 'center' }}
      animationCharacter={animation}
      autoPlay={this.props.index == 0 || this.state.autoPlay}
      onFinish={this._onSwitch}
    />
  )

  render() {
    return (
      <View style={[styles.itemContainer, this.props.style]}>
        {this.props.character
          ?
          <View style={this.props.left ? styles.leftItem : styles.rightItem}>
            {this._renderCharacter(this.props.character, this.props.animation)}
            {this._renderText(this.props.text)}
          </View>
          :
          <View style={styles.centerItem}>
            {this.props.animation && this._renderAnimation(this.props.animation)}
            {this.props.text && this._renderText(this.props.text)}
          </View>
        }
      </View>
    )
  }
}

export default class Scroller extends React.PureComponent {
  constructor(props) {
    super(props)
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    const dialogs = props.data.pages.map(
      (page, pageIndex) => ({
        title: page.bg,
        data: page.dialog.map((val, index) => (
          {
            ...val,
            color: page.color,
            key: String(pageIndex) + ':' + String(index)
          }
        ))
      })
    )
    this.state = {
      disableNext: false,
      currentIndex: 0,
      pageIndex: 0,
      dialogs,
      visibleDialogs: [{ data: [dialogs[0].data[0]], title: dialogs[0].title }]
    }
    this.graphics = {}
    for (const key in props.data.graphics) {
      this.graphics[key] = Buffer.from(props.data.graphics[key], 'base64').toString('utf8')
    }
  }

  _renderItem = ({ item, index }) => (
    <Dialog
      index={index}
      character={item.character && this.graphics[item.character]}
      left={item.character && this.props.data.characters[item.character] == 'left'}
      animation={item.animation && this.props.data.animations[item.animation]}
      text={item.text}
      graphic={item.graphic && this.graphics[item.graphic]}
      style={{
        backgroundColor: item.color
      }}
    />
  )

  _renderSectionHeader = ({ section }) => {
    const w = Dimensions.get("window").width
    console.log(Dimensions.get("window"))
    return (
      <SvgUri
        width={w}
        height={w / 10}
        svgXmlData={this.graphics[section.title]}
      />
    )
  }

  _disableNext = (disable) => {
    this.setState({ ...this.state, disableNext: disable })
  }

  _onPress = () => {
    if (this.state.currentIndex + 1 >= this.state.dialogs[this.state.pageIndex].data.length &&
      this.state.pageIndex + 1 >= this.state.dialogs.length) {
      return
    }
    this.setState((state) => {
      const nextCurrentIndex = state.currentIndex + 1 < state.dialogs[state.pageIndex].data.length
        ?
        state.currentIndex + 1
        :
        0
      const nextPageIndex = nextCurrentIndex == 0
        ?
        state.pageIndex + 1
        :
        state.pageIndex
      const newState = {
        ...state,
        disableNext: true,
        currentIndex: nextCurrentIndex,
        pageIndex: nextPageIndex,
        visibleDialogs: state.dialogs.slice(0, nextPageIndex + 1).map((page, pageIndex) => (
          {
            title: page.title,
            data: page.data.filter((val, index) => pageIndex < nextPageIndex || index <= nextCurrentIndex).reverse()
          }
        )).reverse()
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.props.character || this.props.animation ||
      setTimeout(() => {
        this._disableNext(false)
      }, 2000)
      return newState
    })
  }

  render() {
    w = Dimensions.get("window").width
    return (
      <View style={{
        flex: 1
      }}>
        <SectionList
          style={{ flex: 1 }}
          ref="sectionList"
          sections={this.state.visibleDialogs}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          stickySectionHeadersEnabled={true}
          extraData={this.state.currentIndex}
          inverted={true}
        />
        <TouchableOpacity
          onPress={this._onPress}
          disabled={this.state.disableNext}
          style={{
            position: 'absolute',
            bottom: 20,
            left: w / 2
          }}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  itemContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    minHeight: 80
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: 'flex-start'
  },
  rightItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    // justifyContent: 'flex-end'
  },
  centerItem: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  text: {
    flexShrink: 1,
    fontSize: 20,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderColor: 'red',
    borderWidth: 1,
    borderBottomWidth: 4,
    backgroundColor: 'white'
  }
}