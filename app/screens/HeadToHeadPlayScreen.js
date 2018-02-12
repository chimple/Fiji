import React, {Pure, PureComponent} from 'react'
import {View, Text} from 'react-native'
import NewLevel from '../screens/NewLevel'
import GameScreen from '../screens/GameScreen'

export default class HeadToHeadPlayScreen extends PureComponent{
    render(){
        console.log(this.props.navigation.state.params.game.name)
        console.log(this.props.navigation.state.params.user.name)
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}><NewLevel game={this.props.navigation.state.params.game} user= {this.props.navigation.state.params.user}/></View>
                <View style={{flex:1}}><NewLevel game={this.props.navigation.state.params.game} user= {this.props.navigation.state.params.user}/></View>
            </View>
        )
    }
}