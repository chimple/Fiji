import React, { PureComponent } from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import StoryTitle from './StoryTitle'

export default class StoryList extends PureComponent {
  _keyExtractor = (item, index) => item._id

  _renderItem = ({ item }) => (
    <View>
      <StoryTitle
        title={item}
        onPressItem={this.props.onPressItem}
      />
    </View>
  )

  render() {
    return (
        <FlatList
          contentContainerStyle={styles.StoryListStyle}
          columnWrapperStyle={{}}
          horizontal={false}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={this.props.titles}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
    )
  }
}

StoryList.propTypes = {
  titles: PropTypes.array,
  onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
  StoryListStyle: {
    //flex: 1,
    backgroundColor: 'white',
    //paddingTop: '8%',
    //paddingLeft: '7%',
    //paddingRight: '4%'
  }
});
