import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, Dimensions, View, Text, FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Buffer } from 'buffer'
//import SvgUri from 'react-native-svg-uri'

export default class User extends PureComponent {
  state = {
    len: null
  }

  _onPress = () => {
    this.props.onPressItem(this.props.user)
  }

  onLayoutHandler() {
    console.log('onLayoutHandler');
    // console.log(e.nativeEvent.layout);
    // const h = Dimensions.get("window").height
    const w = Dimensions.get("window").width
    // const length = h < w ? h : w
    this.setState({ len: w })
  }

  render() {
    // let svg = Buffer.from(this.props.user.svg, 'base64').toString('utf8')
    // console.log(this.props.user)

    return (
      <TouchableOpacity
        onLayout={this.onLayoutHandler.bind(this)}
        onPress={this._onPress}
        style={styles.TouchableStyle}
        accessibilityLabel={this.props.user.name}>
        <View style={styles.ImageViewStyle}>
          <Image
            style={{
              width: this.state.len * 0.24,
              height: this.state.len * 0.24,
              borderRadius: this.state.len * 0.12,
            }}
            source={{
              uri:
                'data:image/png;base64,' + this.props.user.image,
            }}
          />
        </View>
        <View style={styles.TextViewStyle}>
          <Text style={styles.TextStyle}>
            {this.props.user.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  ImageViewStyle: {
    // flex:1,
    // backgroundColor:'red',
    // width: Dimensions.get('window').width * 0.24,
    // height: Dimensions.get('window').width * 0.24, 
    flex: 3,
    alignItems: 'center',
    // padding:'4%'
  },
  ImageStyle: {
    // flex:1,
    // marginTop: Dimensions.get('window').width * 0.02,
    // marginLeft: Dimensions.get('window').width * 0.04
  },
  TextViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  },
  TouchableStyle: {
    flex: 1,
    // height:Dimensions.get('window').width * 0.3,
    // width: Dimensions.get('window').width * 0.3,
    // justifyContent: 'center',
    // borderColor:'black',
    // borderWidth:2, 
    marginLeft: '2%',
    marginTop: '5%'
  }
  // TouchableStyle:{
  //   flex:1,
  //   // height:Dimensions.get('window').width * 0.3,
  //   // width: Dimensions.get('window').width * 0.3,
  //   // justifyContent: 'center',
  //   // borderColor:'black',
  //   // borderWidth:2, 
  //   marginLeft:'7%',
  //   marginTop:'10%'
  // }
});