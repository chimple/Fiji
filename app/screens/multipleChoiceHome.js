import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderMCQ } from '../components';

class multpleChoiceHome extends Component {
    render() {       
        return (
            <View style={{ backgroundColor: '#483d8b', flex: 1 }}>
            <HeaderMCQ 
            lefticon="add-circle-outline" 
            centericon="favorite-border" 
            righticon="volume-up" 
            />

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
            onPress={() => this.props.navigation.navigate('singlePlay')} 
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
