import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import { fetchStory } from '../redux/story'


class StorySection extends Component {
    constructor(props) {
        super(props)
    }
    render(props) {
        const stories = [];
        console.log("the page number is :", this.props.page)
        var dialog = this.props.story.pages[this.props.page].dialog;
        for (let i = 0; i < this.props.count; i++) {
            for (let j = 0; j <= dialog.length; j++) {

                if (i % 2 === 0) {
                    console.log("this is alice");
                    stories.push(
                        <View style={styles.storyContainer}>
                            <Image style={styles.characterImageStyle}
                                source={{
                                    uri: 'data:image/png;base64,' + this.props.story.characters['Alice'],
                                }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.story.pages[this.props.page].dialog[i].text}
                                </Text>
                            </View>
                        </View>
                    );
                    break;
                }
                else {
                    console.log("this is white rabbit");
                    stories.push(
                        <View style={styles.storyContainer2}>
                            <View style={styles.textContainer2}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.story.pages[this.props.page].dialog[i].text}
                                </Text>
                            </View>
                            <Image style={styles.characterImageStyle}
                                source={{
                                    uri: 'data:image/png;base64,' + this.props.story.characters['White Rabbit'],
                                }} />
                        </View>
                    );
                    break;
                }
            }
        }
        //console.log(this.props.story.characters);
        return stories;
    }
}

StorySection.propTypes = {
    story: PropTypes.object,

}
const styles = {
    storyContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5

    },
    textContainer: {
        width: 220,
        borderRadius: 20,
        backgroundColor: '#70ef9b',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
        textContainer2: {
            width: 220,
            borderRadius: 20,
            backgroundColor: '#f48ded',
            padding: 10,
            shadowColor: '#3d3d3d',
            shadowRadius: 2,
            shadowOpacity: 0.5,
            shadowOffset: {
                height: 1,
            }
    
    },
    characterImageStyle: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 20
    },

    dialogStyle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
    },
    storyContainer2: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',

    },
    nextButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#9999ff',
        height: 30,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        position: 'relative',
        opacity: 1
    }
}

export default connect(state => ({
    story: state.story.story,
    isFetching: state.story.isFetching,
}))(StorySection)
