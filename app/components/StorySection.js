import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import { fetchStory } from '../redux/story'
import LottieView from 'lottie-react-native';
import { Buffer } from 'buffer'

class AnimationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: new Animated.Value(0),
        };
    }
    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();
    }
    render() {
        // var speaker = this.props.story.pages[this.props.page].dialog[i].speaker;
        // let animation = Buffer.from(this.props.story.characters[characterData[speakerIndex]], 'base64').toString('utf8')
        // let x = JSON.parse(animation);
        console.log(" the style data is : " , this.props.styles)
        console.log(" the animationcharacter data is : " , this.props.animationCharacter)
        
        return (
            <LottieView style={this.props.styles}
                source={this.props.animationCharacter}
                progress={this.state.progress} />

        )
    }
}


class StorySection extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     progress: new Animated.Value(0),
        // };
    }
    componentDidMount() {
    //     Animated.timing(this.state.progress, {
    //         toValue: 1,
    //         duration: 5000,
    //     }).start();
    }

    // this.animation.play();
    render(props) {
        const stories = [];
        console.log("the page number is :", this.props.page)
        var dialog = this.props.story.pages[this.props.page].dialog;

        var characterData = [];
        console.log("How many character is there : ", Object.keys(this.props.story.characters).length)

        for (var i = 0; i < Object.keys(this.props.story.characters).length; i++)
            characterData.push("" + Object.keys(this.props.story.characters)[i])

        console.log(characterData)

        for (let i = 0; i < this.props.count; i++) {
            for (let j = 0; j <= dialog.length; j++) {

                var speaker = this.props.story.pages[this.props.page].dialog[i].speaker;
                var speakerIndex = 0;
                for (let k = 0; k < characterData.length; k++) {
                    if (characterData[k] == speaker) {
                        speakerIndex = k;
                    }
                }
                //var chapter = this.props.story.pages[this.props.page].dialog[i].chapter;
                if (!this.props.story.pages[this.props.page].dialog[i].speaker) {


                    console.log("checkinggg non dialog", this.props.story.pages[this.props.page].dialog[i].text);

                    stories.push(
                        <View style={styles.chapterContainer}>
                            <Image style={{ width: 200, height: 100, position: 'absolute' }}
                                source={{
                                    uri: 'data:image/png;base64,' + this.props.story.pages[this.props.page].dialog[i].img,
                                }} />
                            <Text style={styles.chapterTextStyle}>
                                {this.props.story.pages[this.props.page].dialog[i].text}
                            </Text>
                        </View>
                    );
                    break

                }
                else {
                    var speaker = this.props.story.pages[this.props.page].dialog[i].speaker;
                    let animation = Buffer.from(this.props.story.characters[characterData[speakerIndex]], 'base64').toString('utf8')
                    let x = JSON.parse(animation);

                    if (speakerIndex % 2 == 0) {
                        // console.log("animation", this.props.story.characters[characterData[speakerIndex]]);
                        stories.push(

                            <View style={styles.storyContainer}>

                                <AnimationView 
                                
                                    styles = {styles.characterImageStyle}
                                    animationCharacter = {x}
                                
                                />




                                {/* <LottieView style={styles.characterImageStyle}
                                    source={x}
                                    progress={this.state.progress} /> */}


                                {/* <Animation style={styles.characterImageStyle}
                                    ref={animation => { this.animation = animation; }}
                                    source={x} /> */}

                                {/* <LottieView style={styles.characterImageStyle}
                                source={require('../assets/lottie/Chicken 1.json')} progress={this.state.progress} /> */}


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
                        stories.push(
                            <View style={styles.storyContainer2}>
                                <View style={styles.textContainer2}>
                                    <Text style={styles.dialogStyle}>
                                        {this.props.story.pages[this.props.page].dialog[i].text}
                                    </Text>
                                </View>
                                {/* <LottieView style={styles.characterImageStyle}
                                    source={x}
                                    progress={this.state.progress} /> */}
                                     <AnimationView 
                                
                                    styles = {styles.characterImageStyle}
                                    animationCharacter = {x}
                                
                                />
                            </View>
                        );
                        break;
                    }

                }
            }
        }

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
        margin: 10

    },
    textContainer: {
        width: 220,
        borderRadius: 20,
        backgroundColor: '#70ef9b',
        padding: 10,
        margin: 10,
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
        height: 80,
        width: 80,
        margin: 10,
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
    },
    chapterContainer: {
        flex: 1,
        height: 70,
        backgroundColor: '#09c3f2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chapterTextStyle: {
        fontSize: 25,
        color: 'red',
        fontWeight: '600',
    }

}

export default connect(state => ({
    story: state.story.story,
    isFetching: state.story.isFetching,
}))(StorySection)
