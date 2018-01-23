import React, {PureComponent } from 'react'
import {View, Text} from 'react-native'

export default class GameFrontScreen extends PureComponent{
    render(){
        
        return(
            <View style={{backgroundColor:'grey', flex:1}}>
                <Text style={{color:'black', fontSize:40 , fontWeight:'bold'}}>{this.props.navigation.state.params.title.name}</Text>
            </View>
        )
    }
}