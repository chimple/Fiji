import React, {Pure, PureComponent} from 'react'
import {View, Text} from 'react-native'
import NewLevel from '../screens/NewLevel'

export default class HeadToHeadPlayScreen extends PureComponent{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}><NewLevel/></View>
                <View style={{flex:1}}><NewLevel/></View>
            </View>
        )
    }
}