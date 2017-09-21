import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Image, TouchableOpacity, NativeModules, CameraRoll } from 'react-native';
import { Icon } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import { API_KEY, API_SECRET } from 'react-native-dotenv'
import * as firebase from 'firebase';
// import Exif from 'react-native-exif';
import FloatingLabelInput from '../components/common/FloatingLabelInput';

const ImagePicker = NativeModules.ImageCropPicker;
console.log(RNS3);

// arn:aws:s3:::pixelite-s3bucket-dev
const options = {
  keyPrefix: "uploads/",
  bucket: "pixelite-s3bucket-dev",
  region: "ap-northeast-2",
  accessKey: API_KEY,
  secretKey: API_SECRET,
  successActionStatus: 201
}

  /**
   * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
   */
export default class NewStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      image: null,
      images: null,
      user: null,
    }
  }
  componentDidMount() {
    const user = firebase.auth().currentUser.uid;
    this.setState({ user: user });
  }

  handleTextChange = newText => this.setState({ value: newText });
  saveImageToS3(uri) {
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: `file://${uri}`,
      name: `${this.state.user}-${uri.slice(uri.lastIndexOf('/') + 1)}`,
      type: "image/jpg"
    }
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false
    }).then(images => {

      this.setState({
        images: images.map(i => {
          console.log('received image', i);
          this.saveImageToS3(i.path);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  renderImage(image) {
    console.log(image)
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
    console.log(CameraRoll)
    console.log(this.getPhoto)
    return (
      <View style={{ flex: 1, paddingTop: 25, backgroundColor: 'white' }}>
        <View style={{ marginLeft: 8, marginRight: 8, alignSelf: "flex-start", flexDirection: "row" }}>
          <Icon type='material-community' name='close' color='grey' size={23} style={{ marginLeft: 0 }}/>
        </View>
        <ScrollView style={{ marginLeft: 18, marginRight: 18 }}>
          <FloatingLabelInput
            label="Add Title"
            value={this.state.value}
            onChangeText={this.handleTextChange}
          />

          <ScrollView>
            {this.state.image ? this.renderAsset(this.state.image) : null}
            {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
          </ScrollView>

          <TouchableOpacity onPress={this.pickMultiple.bind(this)}>
            <Text>Select Multiple</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}
//
// import React, {Component} from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, Alert,
//   Image, TouchableOpacity, NativeModules, Dimensions
// } from 'react-native';
//
// var ImagePicker = NativeModules.ImageCropPicker;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   button: {
//     backgroundColor: 'blue',
//     marginBottom: 10
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center'
//   }
// });
//
// export default class NewStory extends Component {
//
//   constructor() {
//     super();
//     this.state = {
//       image: null,
//       images: null
//     };
//   }
//
//   pickSingleWithCamera(cropping) {
//     ImagePicker.openCamera({
//       cropping: cropping,
//       width: 500,
//       height: 500,
//     }).then(image => {
//       console.log('received image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height},
//         images: null
//       });
//     }).catch(e => alert(e));
//   }
//
//   pickSingleBase64(cropit) {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       includeBase64: true
//     }).then(image => {
//       console.log('received base64 image');
//       this.setState({
//         image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
//         images: null
//       });
//     }).catch(e => alert(e));
//   }
//
//   cleanupImages() {
//     ImagePicker.clean().then(() => {
//       console.log('removed tmp images from tmp directory');
//     }).catch(e => {
//       alert(e);
//     });
//   }
//
//   cleanupSingleImage() {
//     let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
//     console.log('will cleanup image', image);
//
//     ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
//       console.log(`removed tmp image ${image.uri} from tmp directory`);
//     }).catch(e => {
//       alert(e);
//     })
//   }
//
//   cropLast() {
//     if (!this.state.image) {
//       return Alert.alert('No image', 'Before open cropping only, please select image');
//     }
//
//     ImagePicker.openCropper({
//       path: this.state.image.uri,
//       width: 200,
//       height: 200
//     }).then(image => {
//       console.log('received cropped image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         images: null
//       });
//     }).catch(e => {
//       console.log(e);
//       Alert.alert(e.message ? e.message : e);
//     });
//   }
//
//   pickSingle(cropit, circular=false) {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       cropperCircleOverlay: circular,
//       compressImageMaxWidth: 640,
//       compressImageMaxHeight: 480,
//       compressImageQuality: 0.5,
//       compressVideoPreset: 'MediumQuality',
//     }).then(image => {
//       console.log('received image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         images: null
//       });
//     }).catch(e => {
//       console.log(e);
//       Alert.alert(e.message ? e.message : e);
//     });
//   }
//
//   pickMultiple() {
//     ImagePicker.openPicker({
//       multiple: true,
//       waitAnimationEnd: false
//     }).then(images => {
//       console.log(images)
//       this.setState({
//         image: null,
//         images: images.map(i => {
//           console.log('received image', i);
//           return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
//         })
//       });
//     }).catch(e => alert(e));
//   }
//
//   scaledHeight(oldW, oldH, newW) {
//     return (oldH / oldW) * newW;
//   }
//
//   // renderVideo(video) {
//   //   return (<View style={{height: 300, width: 300}}>
//   //     <Video source={{uri: video.uri, type: video.mime}}
//   //        style={{position: 'absolute',
//   //           top: 0,
//   //           left: 0,
//   //           bottom: 0,
//   //           right: 0
//   //         }}
//   //        rate={1}
//   //        paused={false}
//   //        volume={1}
//   //        muted={false}
//   //        resizeMode={'cover'}
//   //        onError={e => console.log(e)}
//   //        onLoad={load => console.log(load)}
//   //        repeat={true} />
//   //    </View>);
//   // }
//
//   renderImage(image) {
//     return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
//   }
//
//   renderAsset(image) {
//     // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//     //   return this.renderVideo(image);
//     // }
//
//     return this.renderImage(image);
//   }
//
//   render() {
//     return (<View style={styles.container}>
//       <ScrollView>
//         {this.state.image ? this.renderAsset(this.state.image) : null}
//         {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
//       </ScrollView>
//
//       <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Camera</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Camera With Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
//         <Text style={styles.text}>Crop Last Selected Image</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single Returning Base64</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Circular Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Select Multiple</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Cleanup All Images</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Cleanup Single Image</Text>
//       </TouchableOpacity>
//     </View>);
//   }
// }
