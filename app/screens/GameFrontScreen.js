import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'
//import { fetchGameTheme } from '../redux/game'
import setIcons from '../assets/games/setIcons';

export default class GameFrontScreen extends PureComponent {
  componentDidMount() {
    //this.props.dispatch(fetchGameTheme(this.props.navigation.state.params.title._id))
    console.log(this.props.navigation.state.params.user._id)
    console.log(this.props.navigation.state.params.title._id)
    console.log(this.props.navigation.state.key)
  }

  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item }) => {
    const svg = setIcons[item._id] || setIcons['missing']
    return (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Modes',
      {
        item,
        game: this.props.navigation.state.params.title,
        user: this.props.navigation.state.params.user,
        key:this.props.navigation.state.key
      }
    )} 
    style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 2 }}
    accessibilityLabel={item.name} 
    >
      <SvgUri
        width='50'
        height='50'
        svgXmlData={svg.default}
      />
      <Text style={{ color: 'black', fontSize: 50, fontWeight: 'bold' }}>{item.name}</Text>
    </TouchableOpacity>
  )
  }

  render() {

    //const Screen = this.props.navigation.state.params.title.screen

    return (
      // this.props.isFetching
      //   ?
      //   <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      //   :
        this.props.navigation.state.params.title.sets.length
          ?
          <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.navigation.state.params.title.sets}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
          </View>
          :
          <View><Text>No Themes Found.</Text></View>


    )
  }
}

GameFrontScreen.propTypes = {
  theme: PropTypes.object,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
      })
    })
  })
}

// export default connect(state => ({
//   theme: state.game.theme,
//   isFetching: state.game.isFetching,
// }))(GameFrontScreen)



