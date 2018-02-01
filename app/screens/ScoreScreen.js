import React, {PureComponent} from 'react'
import {FlatList,View, Text, StyleSheet, ImageBackground } from 'react-native'

export default class ScoreScreen extends PureComponent{
    _renderItem = ({item}) => (
        <View style={styles.RankingStyle}><Text style={{fontWeight:'bold', fontSize:30,}}>{item.score}</Text></View>
    )
    render(){
        const arr = [
            {
                "score":"1"
            },
            {
                "score":"1"
            },
            {
                "score":"1"
            },
            {
                "score":"1"
            },
            {
                "score":"1"
            },
            {
                "score":"1"
            },
            {
                "score":"1"
            },
        ]
        return(
            <View style={styles.ScoreCardStyle}>
                <View style={styles.PlayerScoreViewStyle}>
                    <View style={styles.PlayerScoreStyle}><Text style={{fontWeight:'bold', fontSize:50,}}>A</Text></View>
                    <View style={styles.CharacterStyle}></View>
                    <View style={styles.PlayerScoreStyle}><Text style={{fontWeight:'bold', fontSize:50,}}>B</Text></View>
                </View>
                <View style={styles.RankingViewStyle}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={arr}
                    renderItem={this._renderItem}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ScoreCardStyle:{
       flex:1 
    },
    PlayerScoreViewStyle:{
        flex:1,
        backgroundColor:'#edca2f',
        flexDirection:'row'
    },
    RankingViewStyle:{
        flex:1,
        backgroundColor:'#59c6c3'
    },
    PlayerScoreStyle:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    RankingStyle:{
        marginTop:'2%',
        marginBottom:'2%'
    },
    CharacterStyle:{
        flex:2,
        borderColor:'black',
        borderWidth:2,
        borderRadius:30,
        marginTop:'5%',
        marginBottom:'5%'
    }
});