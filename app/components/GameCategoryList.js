import React, { PureComponent } from 'react'

import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import GameTitle from './GameTitle'

export default class GameCategoryList extends PureComponent {



  _keyExtractor = (item, index) => item._id

  _renderItem = ({item}) => (
    /*<Text>
      { item.category }
    </Text>*/
      <GameTitle
      title={item}
      onPressItem={this.props.onPressItem}
      />
    
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
  },
  // CategoryCardViewStyle:{
  //   flex:1, 
  //   height:150, 
  //   //width:330, 
  //   marginTop:'8%',
  //   marginBottom:'8%',
  //   //alignSelf:'center',
  //   marginHorizontal:'4%',
  // },
  // CategoryHeaderViewStyle:{
  //   flex:2 ,
  //   justifyContent:'center', 
  //   alignItems:'center', 
  //   backgroundColor:'#dadbc5', 
  //   borderTopLeftRadius:20, 
  //   borderTopRightRadius:20
  // },
  // CategoryHeaderStyle:{
  //   fontSize:25, 
  //   fontWeight:"bold", 
  //   color:'#19a4f2'
  // },
  // CategoryGamesViewStyle:{
  //   //padding:'4%',
  //   //paddingTop:'7%',
  //   //paddingBottom:'7%',
  //   //paddingBottom:'4%',
  //   backgroundColor:'#eaefef',
  //   //backgroundColor:'red',
  //   //justifyContent:'space-around', 
  //   alignContent:"center", 
  //   borderBottomLeftRadius:20, 
  //   borderBottomRightRadius:20
  // },
  // /*EachGameButtonStyle:{ 
  //   //justifyContent:'center',
  //   //alignItems:'center',
  //   //alignContent:"space-around",
  //   //marginHorizontal:'2%,
  //   backgroundColor:'red',
  //   //borderWidth:4,
  //   //borderRadius:50,
  //   paddingRight:'2%',
  //   paddingLeft:'2%'
  //  },*/
  // /*EachGameViewStyle:{
  //   //borderColor:'black',  
  //   //borderWidth:1,
  //   //justifyContent:'center',
  //   borderRadius:40, 
  //   height:85, 
  //   width:85,
  //   backgroundColor:'black',
  //   //borderWidth:2,
  //   marginTop:'8%',
  //   marginBottom:'8%',
  //   //paddingLeft:"4%"
  // },*/
  // /*TextStyle:{
  //   fontSize:20,
  //   fontWeight:'bold',
  //   color:'black',
  // },*/
  // IconViewStyle:{
  //   flex:1,
  //   justifyContent:"center",
  //   //backgroundColor:'black',
  //   //alignItems:"center",
  //   paddingRight:'3%',
  //   //backgroundColor:'black',
  //   //marginBottom:'5%',
  //   //marginTop:'5%'
  // },
  // IconStyle:{
  //   color:'#19a4f2'
  // }
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