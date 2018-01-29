import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class multipleChoiceHome extends Component {
    render() {       
        return (
            <View style={{ backgroundColor: '#483d8b', flex: 1 }}>

            <View>
                <Text style={styles.midTextStyle}>Welcome</Text>
            </View>


            <View>
                <Text style={styles.midTextStyle}>To</Text>
            </View>
            
            <View>
                <Text style={styles.midTextStyle}>Multiple Choice Game</Text>
            </View>
            
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Game7')} 
            >
            <Text style={styles.endButtonStyle}>Single player</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.endButtonStyle}>Timed Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.endButtonStyle}>Multi player</Text>           
            </TouchableOpacity>
           

            </View>
        );
    }
}

const styles = {
    midTextStyle: {
        fontSize: 36, 
        color: '#fff', 
        alignSelf: 'center'
    },
    endButtonStyle: {
        fontSize: 36, 
        color: '#fff', 
        alignSelf: 'center',
        paddingTop: 10
    }
};

export default multipleChoiceHome;
