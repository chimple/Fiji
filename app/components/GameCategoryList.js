import React, { PureComponent } from 'react'

import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class GameCategoryList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    /*<Text>
      { item.category }
    </Text>*/
    <View style={styles.CategoryCardViewStyle}>
      <View style={styles.CategoryHeaderViewStyle}>
        <Text style={styles.CategoryHeaderStyle}>{ item.category }</Text>
      </View>
      <View style={styles.CategoryGamesViewStyle}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={item.games}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.EachGameButtonStyle}>
            <Text style={styles.TextStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        />
      </View>
    </View>
    
  )

  render() {
    return (
    <View style={styles.GameCategoryListStyle}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={this.props.games}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    </View> 
    )
  }
}

GameCategoryList.propTypes = {
  games: PropTypes.array,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  GameCategoryListStyle:{
    flex:1,
    backgroundColor:'#c9b57c',
    alignItems:'center'
  },
  CategoryCardViewStyle:{
    flex:1, 
    height:140, 
    width:320, 
    marginTop:'5%'
  },
  CategoryHeaderViewStyle:{
    flex:2 ,
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#dadbc5', 
    borderTopLeftRadius:20, 
    borderTopRightRadius:20
  },
  CategoryHeaderStyle:{
    fontSize:25, 
    fontWeight:"bold", 
    color:'#1f898e'
  },
  CategoryGamesViewStyle:{
    flex:3 ,
    padding:'4%',
    backgroundColor:'#eaefef',
    //justifyContent:'center', 
    //alignContent:"center", 
    borderBottomLeftRadius:20, 
    borderBottomRightRadius:20
  },
  EachGameButtonStyle:{ 
    justifyContent:'center',
    //alignItems:'center'
   },
  TextStyle:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  }
});
