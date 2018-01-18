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

        var dialog = this.props.story.pages[0].dialog;
        for (let i = 0; i < this.props.count; i++) {
            for (let j = 0; j <=dialog.length ; j++) {
                
                if (i % 2 === 0) {
                    console.log("this is alice");
                    stories.push(
                        <View style={styles.storyContainer}>
                            <Image style={styles.characterImageStyle}
                                source={{
                                    uri:
                                        'data:image/png;base64,' + this.props.story.characters['Alice'],
                                }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.story.pages[0].dialog[i].text}
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
                            <View style={styles.textContainer}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.story.pages[0].dialog[i].text}
                                </Text>
                            </View>
                            <Image style={styles.characterImageStyle}
                                source={{
                                    uri:
                                        'data:image/png;base64,' + this.props.story.characters['White Rabbit'],
                                }} />
                        </View>
                    );
                    break;
                }
               
            }
            
        }
           // return stories;
            // console.log("comingg");
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
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },

    },
    characterImageStyle: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 20
    },

    dialogStyle: {
        fontSize: 18,
        color: '#555',
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
