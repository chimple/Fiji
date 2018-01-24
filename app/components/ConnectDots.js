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
        { name: '1', code: '#1abc9c' }, { name: '2', code: '#2ecc71' },
        { name: '9', code: '#3498db' }, { name: '', code: '#9b59b6' },
        { name: '3', code: '#34495e' }, { name: '8', code: '#16a085' },
        { name: '', code: '#27ae60' }, { name: '4', code: '#2980b9' },
        { name: '7', code: '#8e44ad' }, { name: '', code: '#2c3e50' },
       { name: '5', code: '#f1c40f' }, { name: '6', code: '#e67e22' },
        
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