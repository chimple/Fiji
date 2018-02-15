import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import { fetchStory } from '../redux/story'
import LottieView from 'lottie-react-native';
import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'

class AnimationView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: new Animated.Value(0),
        };
        // this.manusMethod();
        // console.log("constructor called ----> ");
    }

    componentDidMount() {
        console.log("--------------this is my progress--------------", this.state.progress)
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
        }).start();
    }
    render() {
        console.log(" the style data is : ", this.props.styles)
        console.log(" the animationcharacter data is : ", this.props.animationCharacter)

        return (
            <LottieView style={this.props.styles}
                source={this.props.animationCharacter}
                progress={this.state.progress} />
        )
    }
}

class StorySection extends Component {
    render() {
        const stories = [];
        console.log("the page number is :", this.props.item)
        console.log("the count number is :", this.props.index)
        // var dialog = this.props.item.dialog;

        let svg = Buffer.from(this.props.item[1].bg, 'base64').toString('utf8')
        const h = Dimensions.get("window").height
        const w = Dimensions.get("window").width
        const length = h > w ? h : w
        // console.log("bg isssss :", this.props.story.pages[this.props.page].bg)


        var characterData = [];
        console.log("How many character is there : ", Object.keys(this.props.story.characters).length)

        for (var i = 0; i < Object.keys(this.props.story.characters).length; i++)
            characterData.push("" + Object.keys(this.props.story.characters)[i])

        console.log(characterData)

        // for (let i = 0; i < this.props.index; i++) {
        //     for (let j = 0; j <= dialog.length; j++) {
        var speaker = this.props.item[0].speaker;
        var speakerIndex = 0;
        for (let k = 0; k < characterData.length; k++) {
            if (characterData[k] == speaker) {
                speakerIndex = k;
            }
        }
        //var chapter = this.props.story.pages[this.props.page].dialog[i].chapter;
        if (!this.props.item[0].speaker) {


            console.log("checkinggg non dialog", this.props.item[0].text);

            stories.push(
                <View style={styles.chapterContainer}>
                    <Image style={{ width: 200, height: 100, position: 'absolute' }}
                        source={{
                            uri: 'data:image/png;base64,' + this.props.item[0].img,
                        }} />
                    <Text style={styles.chapterTextStyle}>
                        {this.props.item[0].text}
                    </Text>
                </View>
            );
            // break

        }
        else {
            var speaker = this.props.item.speaker;
            let animation = Buffer.from(this.props.story.characters[characterData[speakerIndex]], 'base64').toString('utf8')
            let x = JSON.parse(animation);

            if (speakerIndex % 2 == 0) {
                // console.log("animation", this.props.story.characters[characterData[speakerIndex]]);
                stories.push(
                    <View style={{ marginTop: 20, borderColor:'grey',borderWidth:2,marginRight:'3%', marginLeft:'3%'}}>
                        <SvgUri
                            style={{ position: 'absolute' }}
                            width={length}
                            height={length}
                            //source={{ uri:'data:image/svg+xml;base64,' + this.props.story.pages[this.state.page].bg }}
                            svgXmlData={svg}
                        >
                        </SvgUri>
                        <View style={styles.storyContainer}>

                            <AnimationView

                                styles={styles.characterImageStyle}
                                animationCharacter={x}

                            />

                            <View style={styles.textContainer}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.item[0].text}
                                </Text>
                            </View>
                        </View>
                    </View>

                );
                {/* <LottieView style={styles.characterImageStyle}
                                    source={x}
                                    progress={this.state.progress} /> */}

                // break;
            }
            else {
                stories.push(
                    <View style={{ marginTop: 20, borderColor:'grey',borderWidth:2,marginRight:'3%', marginLeft:'3%',}}>
                        <SvgUri
                            style={{ width: '100%', position: 'absolute' }}
                            width={length}
                            height={length}
                            //source={{ uri:'data:image/svg+xml;base64,' + this.props.story.pages[this.state.page].bg }}
                            svgXmlData={svg}
                        >
                        </SvgUri>
                        <View style={styles.storyContainer2}>
                            <View style={styles.textContainer2}>
                                <Text style={styles.dialogStyle}>
                                    {this.props.item[0].text}
                                </Text>
                            </View>
                            {/* <LottieView style={styles.characterImageStyle}
                                    source={x}
                                    progress={this.state.progress} /> */}
                            <AnimationView

                                styles={styles.characterImageStyle}
                                animationCharacter={x}

                            />
                        </View>
                    </View>
                );
                // break;
            }

        }
        //     }
        // }

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
        alignItems: 'center',
        marginTop: 20
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
