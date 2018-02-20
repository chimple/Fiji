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
        <TouchableOpacity onPress={this._onPress} style={styles.TouchableStyle} >
            <Text style={styles.TextStyle}>{this.props.title.name}</Text>
        </TouchableOpacity>
        )
    }
}

GameTitle.propTypes = {
    title: PropTypes.object,
    onPressItem: PropTypes.func
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


//<Text>{this.props.title.name}</Text>


