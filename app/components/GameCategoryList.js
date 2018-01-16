import React, { PureComponent } from 'react'

import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class GameCategoryList extends PureComponent {

 /* _scrollToForwardIndex = () => (

  )

  _scrollToBackwardIndex = () => (

  )*/

  myscrollToIndex = () => {
    this.setState({index: ++this.state.index});
    this.flatListRef.scrollToIndex({animated: true,index: this.state.index});
  };

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
          <View style={styles.IconViewStyle}> 
            <Icon name="keyboard-arrow-left" color="white" size={35} style={styles.IconStyle} onPress={this._scrollToForwardIndex} />
          </View>
          <View style={{flex:12, }}>               
          <FlatList
          showsHorizontalScrollIndicator={false}
          ref={(ref) => { this.flatListRef = ref; }}
          horizontal={true}
          data={item.games}
          keyExtractor={this._keyExtractor}
          renderItem={({item, index}) => (
            <View style={{   paddingHorizontal:'0.5%' }}>
              <TouchableOpacity style={styles.EachGameViewStyle}/>
            </View>
          )}
          />
          </View>
          <View style={styles.IconViewStyle}>
            <Icon name="keyboard-arrow-right" color="white" size={35} style={styles.IconStyle} onPress={this._scrollToBackwardIndex} />
          </View>
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
    backgroundColor:'white',
    alignItems:'center'
  },
  CategoryCardViewStyle:{
    flex:1, 
    height:180, 
    width:330, 
    marginTop:'17%',
    marginBottom:'8%'
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
    color:'#19a4f2'
  },
  CategoryGamesViewStyle:{
    flex:3.5 ,
    //padding:'4%',
    paddingTop:'7%',
    paddingBottom:'7%',
    //paddingBottom:'4%',
    backgroundColor:'#eaefef',
    flexDirection:'row',
    //justifyContent:'center', 
    //alignContent:"center", 
    borderBottomLeftRadius:20, 
    borderBottomRightRadius:20
  },
  /*EachGameButtonStyle:{ 
    //justifyContent:'center',
    //alignItems:'center',
    //alignContent:"space-around",
    //marginHorizontal:'2%,
    backgroundColor:'red',
    //borderWidth:4,
    //borderRadius:50,
    paddingRight:'2%',
    paddingLeft:'2%'
   },*/
  EachGameViewStyle:{
    //borderColor:'black',  
    //borderWidth:1,
    //justifyContent:'center',
    borderRadius:40, 
    height:85, 
    width:85,
    backgroundColor:'black',
    borderWidth:2,
  },
  /*TextStyle:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },*/
  IconViewStyle:{
    flex:1,
    justifyContent:"center",
    //alignItems:"center",
    paddingRight:'3%',
    //backgroundColor:'black',
    marginBottom:'5%',
    marginTop:'5%'
  },
  IconStyle:{
    color:'#19a4f2'
  }
});


/*
<TouchableOpacity style={styles.EachGameButtonStyle}>
            <Text style={styles.TextStyle}>{item.name}</Text>
          </TouchableOpacity>
*/

/*
<TouchableOpacity style={styles.EachGameButtonStyle}>
  <View style={styles.EachGameViewStyle}/>
</TouchableOpacity>

*/