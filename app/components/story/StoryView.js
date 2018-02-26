import React from 'react'
import { View, Text, SectionList, Dimensions, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

export default class StoryView extends React.PureComponent {
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
      character={item.character}
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
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
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
