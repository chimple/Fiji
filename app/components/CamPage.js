import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Platform
} from 'react-native';
import RNFS from 'react-native-fs';
import Camera, { constants } from 'react-native-camera';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { addUser } from '../redux/user'



class CamPage extends Component {

    state = {
            name: 'kkkk',
            image: ''
    }

    onBarCodeRead(e) {
        console.log(
            'Barcode Found!',
            'Type: ' + e.type + '\nData: ' + e.data
        );
    }

    sendData(data){
        this.setState({ image: data })
        if(this.state.image !== ''){
            console.log('this is image value'+data)
            this.props.dispatch(addUser(this.state))
       }
    }

    // takePicture() {
    //     const options = {};
    //     //options.location = ...
    //     this.camera.capture({ metadata: options })
    //         .then((data) =>  this.setState({ image: data.path }))
    //         .catch(err => console.error(err));
    //     this.sendData(this.state)
    // }

    takePicture() {
        this.camera.capture()
          .then((data) => {
            let base64Img = data.path;
            RNFS.readFile(Platform.OS === 'android'? base64Img.substring(7): base64Img, "base64")  //substring(7) -> to remove the file://
             .then(res =>  this.sendData(res))
             .catch(err => console.error(err))
           })
     }

    render() {
        // console.log("camera is working"+this.state.uri);
        return (
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        type={'front'}
                        onBarCodeRead={this.onBarCodeRead.bind(this)}
                        style={styles.preview}
                        // aspect={constants.Aspect.fill}
                    />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Icon
                        containerStyle={styles.capture}
                        reverse
                        raised
                        name='check'
                        type='font-awesome'
                        onPress={this.takePicture.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        overflow: 'hidden',
        borderRadius: Dimensions.get('window').width * 0.5,
        alignItems: 'center'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    capture: {
        // flex: 1,
        width: Dimensions.get('window').width * 0.97,
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: 'red',
        // borderRadius: 5,
        // color: '#000',
        // padding: 10,
        // margin: 40
    }
});

CamPage.propTypes = {
    user: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string
    }))
  }
// export default CamPage;

export default connect(state => ({
    addUser: state.user.addUser
  }))(CamPage)
