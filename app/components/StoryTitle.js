import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'

export default class StoryTitle extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title)
  }

  render() {
    return (
      <TouchableOpacity onPress={ this._onPress } style={styles.TouchableStyle}>
        <View style={styles.TextViewStyle}>
          <Text style={styles.TextStyle}>
            {this.props.title.title}
          </Text>
        </View>
        <View style={styles.ImageViewStyle}>
          <Image style={styles.ImageStyle}/>
        </View> 
      </TouchableOpacity>
    )
  }
}

StoryTitle.propTypes = {
  title: PropTypes.object,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  ImageViewStyle:{ 
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
    flex:2,
    padding:'1%',
    //flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#d80463',
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  TextStyle:{
    fontWeight:'bold', 
    fontSize:20, 
    color:'black',
    marginTop:'1%'
  },
  TouchableStyle:{
    flex:1,
    height:140, 
    width:170, 
    borderColor:'black',
    borderWidth:2, 
    //marginBottom:'18%',
    //marginTop:'17%',
    //marginRight:'1%',
    margin:'2%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  }
});