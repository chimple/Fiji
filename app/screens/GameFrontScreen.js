import React, {PureComponent } from 'react'
import {View,Text, TouchableOpacity} from 'react-native'

export default class GameFrontScreen extends PureComponent{

    render(){
        
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game1')} style={{backgroundColor:'red', flex:1 , justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>MemoryMatchingGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game2')} style={{backgroundColor:'grey', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>TapHomeGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game3')} style={{backgroundColor:'yellow', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>TapWrongGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game4')} style={{backgroundColor:'orange', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>WordGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game5')} style={{backgroundColor:'green', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>ConectdotsGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game6')}  style={{backgroundColor:'skyblue', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>MultipleChoiceGame</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reflex')}  style={{backgroundColor:'skyblue', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>Reflex</Text>
                </TouchableOpacity>
            </View>
        )
    }
}