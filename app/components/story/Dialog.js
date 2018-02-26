import React from 'react'
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import AnimationView from './AnimationView'
import PropTypes from 'prop-types'

export default class Dialog extends React.Component {
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