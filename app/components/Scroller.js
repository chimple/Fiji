import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, PanResponder } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { titles } from '../../config/jest/mockData'

const window = Dimensions.get('window')
const imageDimensions = {
  height: window.height,
  width: window.width
}


class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ height: 100 }}>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class Scroller extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: (new Map(): Map<string, boolean>),
      num_items: 1,
      refreshing: false,
      data: props.data[0]
    };
  
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected, num_items: state.num_items };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      key={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _onRefresh = () => {
    this.setState({ ...this.state, refreshing: true })
    setTimeout(() => {
      this.setState({
        ...this.state,
        data: {...this.state.data, data: [{id: 1, title: '1'},...this.state.data.data]},
        refreshing: false
      })
    }, 5000)
  }

  render() {
    return (
      <FlatList
        id={this.state.data.id}
        key={this.state.data.id}
        ref="scroller"
        tabLabel={this.state.data.tabLabel}
        data={this.state.data.data}
        extraData={this.state}
        renderItem={this._renderItem}
        inverted={true}
        onRefresh={this._onRefresh}
        refreshing={this.state.refreshing}
      />
    )
  }
}
