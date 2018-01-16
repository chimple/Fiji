import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, ImageBackground, ScrollView } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchStory } from '../redux/story'
import SvgUri from 'react-native-svg-uri'

export class StorySection extends Component {
    render() {
      console.log("item");
      console.log(this.props.item);
      const Storymsg = (props) => {
    if (this.props.story.characters['Alice'] === this.props.story.pages[0].dialog[0].speaker) 
      return(
      <View style={styles.storyContainer}>
        <Image style={styles.characterImageStyle}
          source={{
            uri:
              'data:image/png;base64,' + this.props.story.pages[0].dialog[0].image,
          }} />
        <View style={styles.textContainer}>
          <Text style={styles.dialogStyle}>
            {this.props.story.pages[0].dialog[0].text}
          </Text>
        </View>
      </View>
      );
  
      return (
      <View style={styles.storyContainer2}>
        <View style={styles.textContainer}>
          <Text style={styles.dialogStyle}>
            {this.props.story.pages[0].dialog[1].text}
          </Text>
        </View>
        <Image style={styles.characterImageStyle}
          source={{
            uri:
              'data:image/png;base64,' + this.props.story.pages[0].dialog[1].image,
          }} />
      </View>
    );
  }
      return (
        <View>
          <Storymsg />
          </View>
      );


    }
}
    StorySection.propTypes = {
        titles: PropTypes.array,
        story:PropTypes.object,
        pages:PropTypes.array,
        dialog:PropTypes.array,
        image:PropTypes.array,
        speaker:PropTypes.array,
        navigation: PropTypes.shape({
            state: PropTypes.shape({
              params: PropTypes.shape({
                title: PropTypes.object.isRequired
              })
            })
          })
      }
      const styles = {
        headerViewStyle: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'skyblue',
          height: 60,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.9,
          position: 'relative'
        },
        HeaderTextStyle: {
          fontSize: 25,
          color: 'black'
        },
        backgroundImageStyle: {
          flex: 1
      
        },
        storyContainer: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          margin: 5,
      
        },
        textContainer: {
          width: 220,
          borderRadius: 5,
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
          borderRadius: 20,
          backgroundColor: 'white'
        },
      
        dialogStyle: {
          fontSize: 15,
          color: '#555',
          fontWeight: '600',
        },
        storyContainer2: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          margin: 5,
          alignSelf: 'flex-end',
      
        },
      }