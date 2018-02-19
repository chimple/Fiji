import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity, View, Text, FlatList, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

export default class StoryTitle extends PureComponent {
  state = Dimensions.get("window")
  handler = dims => this.setState(dims)

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.handler); // This is an important to stop updating state after unmount
  }

  _onPress = () => {
    this.props.onPressItem(this.props.title)
  }

  render() {
    const {width, height} = this.state
    //const mode = height > width ? "portrait" : "landscape";
    return (
      <TouchableOpacity onPress={ this._onPress } style={[styles.TouchableStyle, { width:Dimensions.get('window').width * 0.3, marginLeft:Dimensions.get('window').width * 0.02 }]}>
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
    backgroundColor:'red',
    padding:'4%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  ImageStyle:{
    borderColor:'black',
    borderWidth:2
  },
  TextViewStyle:{
    flex:2,
    borderColor:'black',
    borderWidth:2,
    flexDirection:'row',
    flexWrap:'wrap',
    //justifyContent:'flex-start',
    alignItems:'center',
    //justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#19a4f2',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  TextStyle:{
    fontWeight:'bold', 
    fontSize:20, 
    color:'black',
    marginTop:'2%',
  },
  TouchableStyle:{
    flex:1,
    height:140, 
    //width:Dimensions.get('window').width * 0.3, 
    //marginRight:'3%',
    //marginLeft:Dimensions.get('window').width * 0.02,
    marginTop:'20%',
    marginBottom:'12%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  }
});