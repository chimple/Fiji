import React, { PureComponent } from 'react'

import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import User from './User'


class UserList extends PureComponent {
  state = {
    len: null
  }

  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item }) => (
    <User
      user={item}
      onPressItem={this.props.onPressItem}
    />
  )


  _imageSave = (userImage) => {
    this.props.dispatch(addUser(userImage))
  }
  
  _addItem = () => (
    <TouchableOpacity style={styles.UserListStyle} onPress={() => this.props.navigation.navigate('CamPage')} >
      <View style={styles.ViewStyle}>
        <Image
          style={{
              width: this.state.len * 0.24,
              height: this.state.len * 0.24,
              borderRadius: this.state.len * 0.12,
            }}
          source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/10/23/01/icon-1970474_960_720.png' }}
        />
        <Text style={styles.TextStyle}>
          ADD USER
          </Text>
      </View>
    </TouchableOpacity>
  )

  onLayoutHandler() {
    console.log('onLayoutHandler');
    // console.log(e.nativeEvent.layout);
    // const h = Dimensions.get("window").height
    const w = Dimensions.get("window").width
    // const length = h < w ? h : w
    this.setState({ len: w })
  }

  render() {
    // console.disableYellowBox = true;
    return (
      <View style={styles.UserListStyle}>
        <FlatList
          onLayout={this.onLayoutHandler.bind(this)}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          numColumns={3}
          data={this.props.users}
          // extraData={this._addItem()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={this._addItem}
        />
      </View>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  UserListStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '4%',
    paddingLeft: '1%',
    // paddingRight: '2%'
  },
  ImageViewStyle: {
    //backgroundColor:'white', 
    flex: 3,
    // justifyContent:'center', 
    padding: '4%'
  },
  ImageStyle: {
    width: Dimensions.get('window').width * 0.24,
    height: Dimensions.get('window').width * 0.24,
    borderRadius: Dimensions.get('window').width * 0.12,
    // marginTop: Dimensions.get('window').width * 0.02,
    // marginLeft: Dimensions.get('window').width * 0.04
  },
  ViewStyle: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center', 
    //backgroundColor:'grey'
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
    marginLeft: '7%',
    marginTop: '10%'
  }
});

export default UserList