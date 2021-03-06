import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class multipleChoiceHome extends Component {
    constructor(props) {
        super(props);

        Dimensions.addEventListener('change', () => {
            width = Dimensions.get('window').width;
            height = Dimensions.get('window').height;
        });
    }

    state = Dimensions.get("window");
    handler = dims => this.setState(dims);

    componentDidMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
        width = Dimensions.get('window').width;
        height = Dimensions.get('window').height;
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }

    render() {
        console.log(this.props.navigation.state.params.item.name)
        console.log(this.props.navigation.state.params.game.name)
        console.log(this.props.navigation.state.params.user.name)
        return (
            <ScrollView style={{ backgroundColor: '#483d8b', flex: 1 }}>

                <View>
                    <Text style={styles.midTextStyle}>Welcome</Text>
                </View>


                <View>
                    <Text style={styles.midTextStyle}>To</Text>
                </View>

                <View>
                    <Text style={styles.midTextStyle}>Multiple Choice Game</Text>
                </View>
                {height > width ? <View style={{ paddingTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Game7', {
                            item: this.props.navigation.state.params.item,
                            game: this.props.navigation.state.params.game,
                            user: this.props.navigation.state.params.user
                        })}
                    >
                        <Text style={styles.endButtonStyle}>Single player</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.endButtonStyle}>Timed Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.endButtonStyle}>Multi player</Text>
                    </TouchableOpacity></View> : <View style={{ flexDirection: 'row', alignContent: 'space-between', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Game7', {
                                item: this.props.navigation.state.params.item,
                                game: this.props.navigation.state.params.game,
                                user: this.props.navigation.state.params.user
                            })}
                            style={{ paddingTop: height * 0.1 }}>
                            <Text style={styles.landscapeEndButtonStyle}>Single player</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingTop: height * 0.1 }}>
                            <Text style={styles.landscapeEndButtonStyle}>Timed Mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingTop: height * 0.1 }}>
                            <Text style={styles.landscapeEndButtonStyle}>Multi player</Text>
                        </TouchableOpacity>
                    </View>}


            </ScrollView>
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
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        paddingTop: 10
    },
    landscapeEndButtonStyle: {
        fontSize: 24,
        color: '#fff',
        alignSelf: 'center',
        paddingTop: 10
    }
};

export default multipleChoiceHome;
