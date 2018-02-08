import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import WordGrid from '../components/games/WordGrid';
import PropTypes from 'prop-types'
import { fetchWordData } from '../redux/data'

var j=0;
var k=0;
var arr1 = [];
var arr2 = [];
mountkey = 0;

class WordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        array1: [],
        jsonData: {
            object: {
                object1: {
                    arr1: ['D','O','G'],
                    arr2: ['A']
                },
                object2: {
                    arr1: [2, 3, 4, 5, 6],
                    arr2: [5, 7, 8, 9," ", " "," "]

                },
                object2: {
                    arr1: [5,6, 7, 8, 9],
                    arr2: [8, 3, 4, 5, " ", " ", " "]

                }  }
        }
    }
}
componentDidMount() {
    this.props.dispatch(fetchWordData(1, 3, 1, 1))
    mountkey++;
  }
 render() {
   // const data1 = this.state.jsonData.object.object1.arr1;
  //  const data2 = this.state.jsonData.object.object1.arr2;
   // console.log("game data props",this.props.gamedata)
    const data=this.props.gamedata.map( function (item, i){
       arr1=[];
       arr2=[];
       j=0;
       k=0;
         item.word.map(function(element, i) {
            arr1[j]=element;
            j++;
          //  console.log(element);
          });
         item.others.map(function(element, i) {
             arr2[k]=element;
             k++;
        //      console.log(element);
          });
        } )
 return(
    <View style={{flex:1, backgroundColor:'blue'}}>

     <View style={{flex:5,alignItems:'center'}}>
                     <View style={{flex:1}} />     

                <View style={{flex:4,flexWrap:'wrap',width:500,paddingLeft:85,flexDirection: 'row'}}>
                 
                  {arr1.map((element, i) => (
                  <WordGrid 
                   name={element} key={i} data1={arr1} data2={arr2} mkey={mountkey} navigation={this.props.navigation} />))}
                   {arr2.map((element, key) => (
                  <WordGrid
                    name={element} key={key} data2={arr2} data1={arr1} mkey={mountkey} navigation={this.props.navigation} />))}
                
                </View> 
        </View>
            
      <View style={{flex:1,paddingBottom:'9%',alignItems:'center'}}>
                    <TouchableOpacity  style={styles.hintStyle}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Hint</Text>
                    </TouchableOpacity >
      </View>

    </View>
     );
 }
 }

const styles = {
  gridStyle:{
    backgroundColor:'white',flex:2,borderRadius: 30,
    alignItems:'center',justifyContent:'center'
  },
  hintStyle:{
    backgroundColor:'yellow',height:50,width:120,
    alignItems:'center',justifyContent:'center', borderRadius: 10  
  },
  boxStyle:{
    borderColor:'white',borderRadius: 10,borderWidth:1.8,
    height:40,width:40,marginLeft:'2%'  
  },
  viewStyle: {
    backgroundColor: 'lightgreen',alignItems:'center',height:80,
    shadowColor:'#000',shadowOpacity:0.2,
    shadowOffset:{ width:0,height:2}, elevation: 10
  },
  textStyle: {
    fontSize: 40
  }
}
WordScreen.propTypes = {
    word: PropTypes.array,
    others: PropTypes.array,
}
export default connect(state => ({
    gamedata: state.data.gameData,
    isFetching: state.data.isFetching
  }))(WordScreen)
