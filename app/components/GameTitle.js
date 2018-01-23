import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import SvgUri from 'react-native-svg-uri'

import PropTypes from 'prop-types'

export default class GameTitle extends PureComponent{
    _onPress = () => {
        this.props.onPressItem(this.props.title)
    }

    render(){
        return(
        <TouchableOpacity onPress={this._onPress}  >
            <SvgUri
            width={85}  
            height={85}
            source={require('../../Image/Tap_next.svg')}
            />
        </TouchableOpacity>
        )
    }
}

GameTitle.propTypes = {
    title: PropTypes.object,
    onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
    EachGameViewStyle:{
        //borderColor:'black',  
        //borderWidth:1,
        //justifyContent:'center',
        //borderRadius:40, 
        //height:85, 
        //width:85,
        //backgroundColor:'black',
        //borderWidth:2,
        marginTop:'6%',
        marginBottom:'6%',
        //paddingLeft:"4%"
      }
});


//<Text>{this.props.title.name}</Text>


