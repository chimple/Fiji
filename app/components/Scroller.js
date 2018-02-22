import React from 'react'
import { View, Text, SectionList, Dimensions, Animated, TouchableOpacity, Modal } from 'react-native'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'
import LottieView from 'lottie-react-native';

class AnimationView extends React.Component {
  constructor(props) {
    super(props)
    console.log('AnimationView()')
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    console.log('AnimationView.componentDidMount')
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000,
    }).start();
  }
  render() {
    return (
      <LottieView style={this.props.style}
        source={this.props.animationCharacter}
        progress={this.state.progress} />
    )
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageMode: true
    }
  }
  _renderCharacter = (character, animation) => {
    return (
      <View style={{ height: 100, width: 100 }}>
        <TouchableOpacity onPress={() => this._onPressCharacter()}>
          {this.state.imageMode
            ?
            <SvgUri
              width={32}
              height={32}
              svgXmlData={character}
            />
            :
            <AnimationView
              style={{ height: 80, width: 80, margin: 10 }}
              animationCharacter={animation}
            />
          }
        </TouchableOpacity>
      </View>
    )
  }

  _renderText = (text) => (
    <Text
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 8,
        backgroundColor: 'white'
      }}
    >
      {text}
    </Text>
  )

  _onPressCharacter = () => {
    this.setState({ imageMode: !this.state.imageMode })
  }

  render() {
    return (
      <View style={[styles.itemContainer, { backgroundColor: this.props.dialog.color }]}>
        {this.props.dialog.speaker && (this.props.character.left ?
          <View style={styles.leftItem}>
            {this._renderCharacter(this.props.character.character, this.props.animation)}
            {this._renderText(this.props.dialog.text)}
          </View>
          :
          <View style={styles.rightItem}>
            {this._renderText(this.props.dialog.text)}
            {this._renderCharacter(this.props.character.character, this.props.animation)}
          </View>
        )}
      </View>
    )

  }
}

export default class Scroller extends React.PureComponent {
  constructor(props) {
    super(props)
    const dialogs = props.data.pages.map(
      (page, pageIndex) => ({
        title: Buffer.from(page.bg, 'base64').toString('utf8'),
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
      refreshing: false,
      currentIndex: 0,
      pageIndex: 0,
      dialogs,
      visibleDialogs: [{ data: [dialogs[0].data[0]], title: dialogs[0].title }]
    }
    this.characters = {}
    let left = false
    for (const key in props.data.characters) {
      left = !left
      this.characters[key] = {
        character: Buffer.from(props.data.characters[key], 'base64').toString('utf8'),
        left
      }
    }
    this.animations = {}
    for (const key in props.data.animations) {
      this.animations[key] =
        JSON.parse(Buffer.from(props.data.animations[key], 'base64').toString('utf8'))
    }
  }

  componentDidUpdate() {
    this.refs.sectionList.scrollToLocation({
      sectionIndex: this.state.pageIndex,
      itemIndex: this.state.currentIndex,
      viewPosition: 1
    })
  }

  _renderItem = ({ item }) => (
    <Dialog
      dialog={item}
      character={this.characters[item.speaker]}
      animation={this.animations[item.speaker]}
    />
  )

  _renderSectionHeader = ({ section }) => {
    const w = Dimensions.get("window").width
    console.log(Dimensions.get("window"))
    return (
      <SvgUri
        style={{ height: 41 }}
        width={w}
        height={w}
        svgXmlData={section.title}
      />
    )
  }

  _onRefresh = () => {
    this.setState({ ...this.state, refreshing: true })
    setTimeout(() => {
      this.setState((state) => ({
        ...state,
        currentIndex: state.currentIndex + 1,
        visibleDialogs: [{
          ...state.dialogs[state.currentIndex + 1],
          id: String(state.currentIndex + 1)
        }].concat(state.visibleDialogs),
        refreshing: false
      }))
    }, 500)
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
        currentIndex: nextCurrentIndex,
        pageIndex: nextPageIndex,
        visibleDialogs: state.dialogs.slice(0,nextPageIndex+1).map((page, pageIndex) => (
          {
            title: page.title,
            data: page.data.filter((val, index) => pageIndex < nextPageIndex || index <= nextCurrentIndex)
          }
        ))
      }
      console.log(newState)
      return newState
    })
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <SectionList
          ref="sectionList"
          sections={this.state.visibleDialogs}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          renderSectionFooter={this._renderSectionHeader}
          stickySectionHeadersEnabled={true}
          extraData={this.state.currentIndex}
          // inverted={true}
        />
        <TouchableOpacity onPress={this._onPress}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  itemContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    minHeight: 80
  },
  leftItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  rightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
}