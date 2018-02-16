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
import ImageResizer from 'react-native-image-resizer';
import Orientation from 'react-native-orientation';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { addUser } from '../redux/user'




class CamPage extends Component {

    componentWillMount() {
        // this locks the view to Portrait Mode
        Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        // this locks the view to Portrait Mode
        Orientation.unlockAllOrientations();
    }

    onBarCodeRead(e) {
        console.log(
            'Barcode Found!',
            'Type: ' + e.type + '\nData: ' + e.data
        );
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                ImageResizer.createResizedImage(data.path, 128, 128, 'JPEG', 80)
                    .then(({ uri }) => {
                        RNFS.readFile(Platform.OS === 'android' ? uri.substring(7) : uri, "base64")  //substring(7) -> to remove the file://
                            .then(res => {
                                this.props.navigation.navigate('Friends');
                                this.props.dispatch(addUser({ name: '', image: res }));
                                console.log('this is the id in camPage')
                            })
                            .catch(err => console.error(err))
                    })
            })
            .catch((err) => {
                console.log(err);
                // return Alert.alert('Unable to resize the photo',
                //     'Check the console for full the error message');
            });
    }

    render() {
        console.log("camera is working" + this.props);
        const h = Dimensions.get("window").height
        const w = Dimensions.get("window").width
        const height = h > w ? h : w
        const width = h < w ? h : w
        return (
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={{
                    width: width,
                    height: width,
                    overflow: 'hidden',
                    borderRadius: width * 0.5,
                    alignItems: 'center'
                }}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        captureQuality={"480p"}
                        type={'front'}
                        onBarCodeRead={this.onBarCodeRead.bind(this)}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            width: width,
                            height: width
                        }}
                    />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Icon
                        containerStyle={{
                            width: width * 0.97,
                            height: height * 0.08,
                            backgroundColor: 'red'
                        }}
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

