import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ModeScreen extends PureComponent{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', flex:1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        mode: 'HEAD_TO_HEAD',
                        play: 'TRIES'
                    }
                    )} 
                    style={styles.TouchableStyle}
                    accessibilityLabel="OfflineTries"
                    >
                        <Text style={styles.TextStyle}>OfflineTries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        mode: 'HEAD_TO_HEAD',
                        play: 'TIMED'
                    }
                    )} 
                    style={styles.TouchableStyle}
                    accessibilityLabel="OfflineTimed"
                    >
                        <Text style={styles.TextStyle}>OfflineTimed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flex:1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayWith',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        mode: 'SINGLE',
                        play: 'TRIES'
                    }
                    )} 
                    style={styles.TouchableStyle}
                    accessibilityLabel="OnlineTries"
                    >
                        <Text style={styles.TextStyle}>OnlineTries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayWith',
                    {
                        item: this.props.navigation.state.params.item,
                        game: this.props.navigation.state.params.game,
                        user: this.props.navigation.state.params.user,
                        mode: 'SINGLE',
                        play: 'TIMED'
                    }
                    )} 
                    style={styles.TouchableStyle}
                    accessibilityLabel="OnlineTimed"
                    >
                        <Text style={styles.TextStyle}>OnlineTimed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    TouchableStyle:{
        backgroundColor: '#114234',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderWidth:2,
        borderColor:'black',
    },
    TextStyle:{
        fontSize: 25,
        color:'white',
        fontWeight:'bold'
    },
});