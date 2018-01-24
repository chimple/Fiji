import React, {PureComponent } from 'react'
import {View,Text, TouchableOpacity} from 'react-native'

export default class GameFrontScreen extends PureComponent{
    render(){
        
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={{backgroundColor:'red', flex:1 , justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'grey', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'yellow', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'orange', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'green', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'skyblue', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}