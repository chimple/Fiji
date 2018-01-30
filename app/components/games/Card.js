import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Alert,
  Image
} from 'react-native';



export default class Card extends Component {
  constructor(properties) {
        super(properties);
        this.state = {
            paired: false,
            visible: false
        };
    }

  componentWillReceiveProps (nextProps) {
      if (nextProps.cardCfg.hidden === true) {
          this.setState({
              visible: false,
              paired: false
          });
      }
  }

  componentWillMount() {
  this.animatedValue = new Animated.Value(0);
  this.value = 0;
  this.animatedValue.addListener(({ value }) => {
    this.value = value;
  })
  this.frontInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
 }

  flipCard() {
        if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  onPress() {
        var state = this.state;

        if (state.paired || state.visible || !this.props.canShow) {
            return;
        }

        this.show();

        this.props.onPress();
    }

  show() {
        this.flipCard();
        this.setState({visible: true});
        this.props.cardCfg.hidden = false;
    }

    setPaired() {
        this.setState({paired: true});
        this.props.cardCfg.hidden = false;
    }

    hide() {
        this.setState({visible: false});
        this.props.cardCfg.hidden = true;
        this.props.onHide;
    }


  render() {

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }

    var state = this.state,
      imageStyles = [styles.cardImage],
      cardStyles = [styles.card];

      if (state.visible === true) {
          imageStyles.push(styles.cardImageVisible);
          cardStyles.push(styles.cardVisible);
      }

      if (state.paired === true) {
          imageStyles.push(styles.cardImagePaired);
          cardStyles.push(styles.cardPaired);
      }

    return (
      <TouchableHighlight
            onPress={this.onPress.bind(this)}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Animated.View style={[frontAnimatedStyle, cardStyles]}>
              <Image style={imageStyles} ref="image" source={{uri: this.props.img}} />
            </Animated.View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    resizeMode: Image.resizeMode.cover,
    width: 80,
    height: 80,
    opacity: 0
  },
  card: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#2DBE99',
    borderColor: '#068981',
    borderWidth: 2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageVisible: {
    opacity: 1
  },

  cardImagePaired: {
    opacity: 0.5
  },

  cardPaired: {
    backgroundColor: '#F4F9CB',
    borderColor: '#89E0B9'
  },
  cardVisible: {
    backgroundColor: '#fff'
  }
});
