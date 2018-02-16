import React,{Component} from 'react';

import {

    StyleSheet,

    Text, 

    View,

    TouchableOpacity,

} from 'react-native';

import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchStickerPacks, fetchStickers, STICKERS_PATH } from '../redux/sticker';




export default class FacebookTabBar extends Component {

    // icons = [];

    // constructor(props) {

    //     super(props);

    //     this.icons = [];

    // }



    // // componentDidMount() {
    // //         this.props.dispatch(fetchStickers(this.props._id));
    // //         console.log("this ia an sticker packs",this.props.stickers)
    // // }


    // setAnimationValue({ value, }) {

    //     this.icons.forEach((icon, i) => {

    //         const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;

    //         icon.setNativeProps({

    //             style: {

    //                 color: this.iconColor(progress),

    //             },

    //         });

    //     });

    // }



    // //color between rgb(59,89,152) and rgb(204,204,204)

    // iconColor(progress) {

    //     const red = 59 + (204 - 59) * progress;

    //     const green = 89 + (204 - 89) * progress;

    //     const blue = 152 + (204 - 152) * progress;

    //     return `rgb(${red}, ${green}, ${blue})`;

    // }
    updatedId= (keyValue,packId) => {
         this.props.goToPage(keyValue);
         this.props.onPressTab(packId)
        // console.log("the tabId : ", keyValue);
        // this.props.onPressTab(packId);
        // console.log("this is on presss",packId);
      }


    render() {
            console.log("data is not coming",this.props.tabData);
return  <View style={[styles.tabs, this.props.style,]}>

            {this.props.tabData.map((tab, i) => {
        const svg = tab == 'caterpillar.svg'
        ? require('../assets/stickers/caterpillar.svg')
        : tab == 'caterpillar_walk.svg'
          ? require('../assets/stickers/caterpillar_walk.svg')
          : tab == 'caterpillar_dance.svg'
            ? require('../assets/stickers/caterpillar_dance.svg')
            : tab == 'cheshire-cat.svg'
            ? require('../assets/stickers/cheshire-cat.svg')
            : tab == 'cheshire-cat_grin.svg'
              ? require('../assets/stickers/cheshire-cat_grin.svg')
              : tab == 'cheshire-cat_clap.svg'
                ? require('../assets/stickers/cheshire-cat_clap.svg')
                : ''
              //  let svgImage = Buffer.from(tab.svg, 'base64').toString('utf8')
              console.log("data is not coming",this.props.tabData.tab);
                return <TouchableOpacity key={i} onPress={ ()=>this.updatedId(i,tab)} style={styles.tab}>
                
                    {/* <Text key={i} >{tab._id} </Text> */}
                    <SvgUri
                                key={i} 
                                width="50"
                                height="50"
                                source={svg}
                                />
                </TouchableOpacity>;

            })}

        </View>;

    }

}



const styles = StyleSheet.create({

    tab: {

        flex: 1,

        alignItems: 'center',

        justifyContent: 'center',

        paddingBottom: 10,

    },

    tabs: {

        height: 45,

        flexDirection: 'row',

        paddingTop: 5,

        borderWidth: 1,

        borderTopWidth: 0,

        borderLeftWidth: 0,

        borderRightWidth: 0,

        borderBottomColor: "red",

    },

});

FacebookTabBar.propTypes = {
    _id:PropTypes.string,
     i:PropTypes.number,
     stickers:PropTypes.array
  }
  
//   export default connect(state => ({
//     packs: state.sticker.packs,
//     stickers: state.sticker.stickers,
//     isFetching: state.sticker.isFetching,
//   }))(FacebookTabBar)

