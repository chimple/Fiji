import React, { PureComponent } from 'react'

import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import User from './User'


class FriendList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item }) => (
    <User
      user={item}
      onPressItem={this.props.onPressItem}
    />
  )

  render() {
    // console.log('thisdfdfgdfgdfgdfgdfgd'+item._id);
    // const add = this._renderItem;
    // add.push(this._addItem); 
    return (
      <View style={styles.FriendListStyle} >
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'column' }}
          // refreshing={true}
          numColumns={3}
          data={this.props.users}
          // extraData={this._addItem()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

FriendList.propTypes = {
  users: PropTypes.array,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  FriendListStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '4%',
    paddingLeft: '1%',
    // paddingRight: '2%'
  },
  ImageViewStyle:{
    //backgroundColor:'white', 
    flex:3, 
    // justifyContent:'center', 
    padding:'4%'
  },
  ImageStyle:{
    width: Dimensions.get('window').width * 0.24,
    height: Dimensions.get('window').width * 0.24,
    borderRadius: Dimensions.get('window').width * 0.12,
    // marginTop: Dimensions.get('window').width * 0.02,
    // marginLeft: Dimensions.get('window').width * 0.04
  },
  TextViewStyle:{
    flex:1,
    alignItems:'center',
    // justifyContent:'center', 
    //backgroundColor:'grey'
  },
  TextStyle:{
    fontWeight:'bold', 
    fontSize:15, 
    color:'black'
  },
  TouchableStyle:{
    flex:1,
    height:120, 
    width:100, 
    // justifyContent: 'center',
    borderColor:'black',
    borderWidth:2, 
    marginLeft:'4%',
    marginTop:'10%'
  }
});

export default FriendList