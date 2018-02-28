import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image} from 'react-native'
import SvgUri from 'react-native-svg-uri'
import setIcons from '../assets/games/setIcons'

import PropTypes from 'prop-types'

export default class GameTitle extends PureComponent{
    state = Dimensions.get("window")
    handler = dims => this.setState(dims)

    componentWillMount() {
    Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
    Dimensions.removeEventListener("change", this.handler); // This is an important to stop updating state after unmount
    }

    _onPress = () => {
        this.props.onPressItem(this.props.title)
    }

    render(){
        const svg = setIcons[this.props.title._id] || setIcons['missing']
        return(
        <TouchableOpacity onPress={this._onPress} style={[styles.TouchableStyle,
                                                        { height:Dimensions.get('window').height * 0.25, 
                                                        width:Dimensions.get('window').width * 0.45,
                                                        marginVertical:Dimensions.get('window').height * 0.011,
                                                        marginHorizontal:Dimensions.get('window').width * 0.0235,
                                                        backgroundColor: this.props.title.backgroundColor}]} accessibilityLabel={this.props.title.name} >
            <SvgUri width= '120' height= '120' fill='#ffffff' svgXmlData={svg.default} />   
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
        alignItems:'center',
        justifyContent:'center'
    },
    TextStyle:{
        fontSize: 20,
        color:'#000000',
        fontWeight:'bold'
    },
});


//<Text>{this.props.title.name}</Text>


