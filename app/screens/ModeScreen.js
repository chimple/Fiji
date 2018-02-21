import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ModeScreen extends PureComponent{
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TriesOrTimed',
                {
                    item: this.props.navigation.state.params.item,
                    game: this.props.navigation.state.params.game,
                    user: this.props.navigation.state.params.user,
                    mode: 'HEAD_TO_HEAD',
                }
                )}
                style={styles.TouchableStyle}>
                    <Text style={styles.TextStyle}>Offline</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('TriesOrTimed',
                {
                    item: this.props.navigation.state.params.item,
                    game: this.props.navigation.state.params.game,
                    user: this.props.navigation.state.params.user,
                    mode: 'SINGLE',
                }
                )} 
                style={styles.TouchableStyle}>
                    <Text style={styles.TextStyle}>Online</Text>
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