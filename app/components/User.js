import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Buffer } from 'buffer'
import SvgUri from 'react-native-svg-uri'

export default class User extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.user)
  }

  render() {
    // let svg = Buffer.from(this.props.user.svg, 'base64').toString('utf8')
    // console.log(svg)
    return (
      <TouchableOpacity onPress={ this._onPress } style={styles.TouchableStyle}>
        <View style={styles.ImageViewStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri:
                'data:image/png;base64,' +  this.props.user.image,
            }}
          />
        </View>
          {/*<SvgUri
            width="200"
            height="200"
            // source={{ uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg' }}
            svgXmlData= { svg }
          /> */}
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
  ImageViewStyle:{
    //backgroundColor:'white', 
    flex:3, 
    alignItems:'center', 
    padding:'4%'
  },
  ImageStyle:{
    width: '80%',
    height: '100%',
    //resizeMode: Image.resizeMode.contain,
    borderRadius:60,
    borderColor:'black',
    borderWidth:2
  },
  TextViewStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center', 
    //backgroundColor:'grey'
  },
  TextStyle:{
    fontWeight:'bold', 
    fontSize:20, 
    color:'black'
  },
  TouchableStyle:{
    flex:1,
    height:140, 
    width:120, 
    //borderColor:'black',
    //borderWidth:2, 
    marginBottom:'18%',
    marginTop:'17%'
  }
});