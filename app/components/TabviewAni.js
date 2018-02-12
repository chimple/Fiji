import React, { Component } from 'react';

import {

  StyleSheet,

  Text,
  
  View,

  ScrollView,
  TouchableOpacity,

} from 'react-native';


import FacebookTabBar from './NewTab';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchStickerPacks, fetchStickers ,fetchSticker} from '../redux/sticker';
import { sendMessage } from '../redux/chat';




class TabbedView extends Component {

  // componentDidMount() {
  //   this.props.dispatch(fetchStickerPacks());
  // }


 onPressTabView = (pack_id) => {
    this.packId = pack_id
    // console.log("on press tab view method is trigger label is -------- ", pack_id)
    // this.props.tabPress()
     this.props.dispatch(fetchStickers(pack_id));
    // console.log("stickers inside onpressTavView",this.props);
  }


  updatedStickerId= (StickerId) => {
    //  this.props.onPress(StickerId, this.props.stickers);
    this.props.dispatch(fetchSticker(StickerId));
      this.props.dispatch(sendMessage(this.props.friend,StickerId,'sticker'))
      // this.props.stickers
 
   // this.props.onPressTab(packId);
  //  console.log("this is on presss",StickerId);
 }

  render() {
    // console.log("kiran got database", this.props.stickers);
    // console.log("the data is :",this.props.packs)
    return <ScrollableTabView

      style={{ marginTop: 20, }}

      initialPage={0}

      renderTabBar={() => <FacebookTabBar tabData={this.props.packs} onPressTab={this.onPressTabView} />}
    >

      <ScrollView tabLabel="jionomk" >
        <View style={styles.card}>
          {this.props.stickers.map((tab, i) => {
            let svgImage = Buffer.from(tab.svg, 'base64').toString('utf8')
            // console.log("this is svgImage ", svgImage);
            //  return <Text key={i} >{tab._id}</Text>

            return <TouchableOpacity key={i} onPress={() => this.updatedStickerId(tab._id)}>
              <SvgUri
                key={i}
                width="30"
                height="30"
                svgXmlData={svgImage}
              />
            </TouchableOpacity>
          })}
        </View>
      </ScrollView>
      {/* 
    <ScrollView tabLabel="ios-people" style={styles.tabView}>

      <View style={styles.card}>

        <Text>Friends</Text>

      </View>

    </ScrollView> */}
    </ScrollableTabView>;


    // // <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>

    // //   <View style={styles.card}>

    // //     <Text>Messenger</Text>

    // //   </View>

    // // </ScrollView>

    // // <ScrollView tabLabel="ios-notifications" style={styles.tabView}>

    // //   <View style={styles.card}>

    // //     <Text>Notifications</Text>

    // //   </View>

    // // </ScrollView>

    // <ScrollView tabLabel="ios-list" style={styles.tabView}>

    //   <View style={styles.card}>

    //     <Text>Other nav</Text>

    //   </View>

    // </ScrollView> */}

  }
}

ScrollableTabView.propTypes = {
  pack_id: PropTypes.string,
  _id: PropTypes.string,
  packs: PropTypes.array,
  svg: PropTypes.string,
  stickers: PropTypes.array,


}

const styles = StyleSheet.create({

  tabView: {

    flex: 1,

    padding: 10,

    backgroundColor: 'rgba(0,0,0,0.01)',

  },

  card: {

    borderWidth: 1,

    backgroundColor: '#fff',

    borderColor: 'rgba(0,0,0,0.1)',

    margin: 5,

    height: 150,

    padding: 15,

    shadowColor: '#ccc',

    shadowOffset: { width: 2, height: 2, },

    shadowOpacity: 0.5,

    shadowRadius: 3,

  },

});

export default connect(state => ({
  packs: state.sticker.packs,
  stickers: state.sticker.stickers,
  isFetching: state.sticker.isFetching,
}))(TabbedView)
