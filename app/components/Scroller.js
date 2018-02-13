import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, PanResponder } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FacebookTabBar from './FacebookTabBar'

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
  state = { selected: (new Map(): Map<string, boolean>) ,  num_items: 1};

  componentDidUpdate = (prevProps, prevState) => {
    this.tabView.goToPage(this.state.num_items-1)
  }

  _onScrollEnd = (id) => {
    console.log('end'+ id)
    id>=this.state.num_items && this.setState({...this.state, num_items: this.state.num_items+1})
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

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <FacebookTabBar />}
        initialPage={this.state.num_items-1}
        ref={(tabView) => { this.tabView = tabView; }}
        // page={this.state.num_items-1}
      >
        {this.props.data.slice(0,this.state.num_items).map((item)=>(
          <FlatList
          id={item.id}
          key={item.id}
          tabLabel={item.tabLabel}
          data={item.data}
          extraData={this.state}
          renderItem={this._renderItem}
          onEndReached={()=>this._onScrollEnd(item.id)}
          onEndReachedThreshold={0.1}
        />
        ))}
      </ScrollableTabView>
    );
  }
}
