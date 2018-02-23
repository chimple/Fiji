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
    }).start(({ finished }) => {
      if (finished) this.props.onFinish()
    })
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
      imageMode: false
    }
  }
  _renderCharacter = (character, animation) => {
    return (
      <View style={{ height: 100, width: 100, justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => this._onPressCharacter()}>
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
              onFinish={this._onAnimationEnd}
            />
          }
        </TouchableOpacity>
      </View>
    )
  }

  _onAnimationEnd = () => {
    this.setState({...this.state, imageMode: true})
  }

  _renderText = (text) => (
    <Text
      style={{
        flex: 1,
        fontSize: 20,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderColor: 'red',
        borderWidth: 1,
        borderBottomWidth: 4,
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

  // componentDidUpdate() {
  //   this.refs.sectionList.scrollToLocation({
  //     sectionIndex: this.state.pageIndex,
  //     itemIndex: this.state.currentIndex,
  //     viewPosition: 1
  //   })
  // }

  _renderItem = ({ item }) => (
    <Dialog
      dialog={item}
      character={this.characters[item.speaker]}
      animation={this.animations[item.animation]}
    />
  )

  _renderSectionHeader = ({ section }) => {
    const w = Dimensions.get("window").width
    console.log(Dimensions.get("window"))
    return (
      <SvgUri
        width={w}
        height={w/10}
        svgXmlData={section.title}
      />
    )
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
            data: page.data.filter((val, index) => pageIndex < nextPageIndex || index <= nextCurrentIndex).reverse()
          }
        )).reverse()
      }
      console.log(newState)
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
          style={{flex: 1}}
          ref="sectionList"
          sections={this.state.visibleDialogs}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          // renderSectionFooter={this._renderSectionHeader}
          stickySectionHeadersEnabled={true}
          extraData={this.state.currentIndex}
          inverted={true}
        />
        <TouchableOpacity onPress={this._onPress}
          style={{
            position: 'absolute',
            bottom: 20,
            left: w/2
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
    flex: 1,
    justifyContent: 'center',
    minHeight: 80
  },
  leftItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  rightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  }
}