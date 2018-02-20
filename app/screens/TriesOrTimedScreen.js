import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ModeScreen extends PureComponent{
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                {
                    item: this.props.navigation.state.params.item,
                    game: this.props.navigation.state.params.game,
                    user: this.props.navigation.state.params.user,
                    mode: this.props.navigation.state.params.mode,
                    play: 'TRIES'
                }
                )} 
                style={styles.TouchableStyle}>
                    <Text style={styles.TextStyle}>Tries</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('CommonGameScreen',
                {
                    item: this.props.navigation.state.params.item,
                    game: this.props.navigation.state.params.game,
                    user: this.props.navigation.state.params.user,
                    mode: this.props.navigation.state.params.mode,
                    play: 'TIMED'
                }
                )} 
                style={styles.TouchableStyle}>
                    <Text style={styles.TextStyle}>Timed</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    TouchableStyle:{
        borderWidth:2,
        borderColor:'black',
    },
    TextStyle:{
        fontSize: 25,
        color:'black',
        fontWeight:'bold'
    },
});