import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ModeScreen extends PureComponent{
    componentDidMount(){
        console.log(this.props.navigation.state.params.key)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', flex:1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayWith',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        key:this.props.navigation.state.params.key,
                        mode: 'SINGLE',
                        play: 'TRIES'
                    }
                    )} 
                    style={[styles.TouchableStyle, {backgroundColor:this.props.navigation.state.params.game.onlineTriesBackgroundColor}]}
                    accessibilityLabel="OnlineTries"
                    >
                        <Text style={styles.TextStyle}>OnlineTries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayWith',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        key:this.props.navigation.state.params.key,
                        mode: 'SINGLE',
                        play: 'TIMED'
                    }
                    )} 
                    style={[styles.TouchableStyle, {backgroundColor:this.props.navigation.state.params.game.onlineTimedBackgroundColor}]}
                    accessibilityLabel="OnlineTimed"
                    >
                        <Text style={styles.TextStyle}>OnlineTimed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flex:1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        key:this.props.navigation.state.params.key,
                        mode: 'HEAD_TO_HEAD',
                        play: 'TRIES'
                    }
                    )} 
                    style={[styles.TouchableStyle, {backgroundColor:this.props.navigation.state.params.game.offlineTriesBackgroundColor}]}
                    accessibilityLabel="OfflineTries"
                    >
                        <Text style={styles.TextStyle}>OfflineTries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        key:this.props.navigation.state.params.key,
                        mode: 'HEAD_TO_HEAD',
                        play: 'TIMED'
                    }
                    )} 
                    style={[styles.TouchableStyle, {backgroundColor:this.props.navigation.state.params.game.offlineTimedBackgroundColor}]}
                    accessibilityLabel="OfflineTimed"
                    >
                        <Text style={styles.TextStyle}>OfflineTimed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    TouchableStyle:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderColor:'black',
        borderWidth:1
    },
    TextStyle:{
        fontSize: 25,
        color:'white',
        fontWeight:'bold'
    },
});