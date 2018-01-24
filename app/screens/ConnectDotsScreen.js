import React, { Component } from 'react';
import { View, ScrollView,StyleSheet,Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';

export default class ConnectDots extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
  onPress = () => {
    this.setState ({
      count: this.state.count+1
      
    })
    console.log(this.state.count)
  }
    render() {
      console.log(this.state.count)
     
      const items = [
       
        
      ];
  
      return (
        <GridView
          itemDimension={80}
          items={items}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity
            onPress={this.onPress}
            >
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            
              <Text style={styles.itemName}>{item.name}</Text>
             
            </View>
            </TouchableOpacity>
          )}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25
     
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 50,
      padding: 10,
      height: 100,
      width: 100,
      
      flexDirection: 'row',
    
    },
    itemName: {
      fontSize: 60,
      color: '#fff',
    
    width: 70,
    height: 70,
    borderRadius: 35
   
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 25,
      color: '#fff'
      
    },
  });