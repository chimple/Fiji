import React, {PureComponent } from 'react'
import {View,Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import { fetchGameTheme } from '../redux/game'

class GameFrontScreen extends PureComponent{
    componentDidMount() {
        this.props.dispatch(fetchGameTheme(this.props.navigation.state.params.title._id))
        console.log(this.props.navigation.state.params.user.name)
        console.log(this.props.navigation.state.params.title.name)
    }

    _keyExtractor = (item, index) => item._id

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={()=> this.props.navigation.navigate( 'CommonGameScreen', 
                                                                        {item, 
                                                                        game: this.props.navigation.state.params.title, 
                                                                        user: this.props.navigation.state.params.user} 
                                                                        ) } style={{flexDirection:'row', borderColor:'black', borderWidth:2}}>
            <SvgUri 
            width='50'
            height='50'
            svgXmlData={ Buffer.from(item.svg, 'base64').toString('utf8') }
            />
            <Text style={{color:'black', fontSize:50, fontWeight:'bold'}}>{item.name}</Text>
        </TouchableOpacity>
    )

    render(){

        //const Screen = this.props.navigation.state.params.title.screen

        return(
            this.props.isFetching 
                ? 
                    <ActivityIndicator size="large" style={{ marginTop: 100 }}/> 
                :   
                    this.props.theme._id
                        ?   
                            <View>
                            <View>
                                <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.theme.sets}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                />
                            </View> 
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('HeadToHead', {game:this.props.navigation.state.params.title, user: this.props.navigation.state.params.user})} ><Text>take me to score screen</Text></TouchableOpacity>
                            </View>
                            
                        :
                            <View><Text>No Themes Found.</Text></View>


        )
    }
}

GameFrontScreen.propTypes = {
    theme:PropTypes.object,
    navigation: PropTypes.shape({
        state: PropTypes.shape({
          params: PropTypes.shape({
            title: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          })
        })
      })
}

export default connect(state => ({
    theme: state.game.theme,
    isFetching: state.game.isFetching,
}))(GameFrontScreen)






/*

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

*/