import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Image, TouchableOpacity, NativeModules, CameraRoll } from 'react-native';
import { Icon } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import { API_KEY, API_SECRET } from 'react-native-dotenv'
import * as firebase from 'firebase';
import FloatingLabelInput from '../components/common/FloatingLabelInput';
import { connect } from 'react-redux';
import { newStoryCreateStory } from '../actions';

const ImagePicker = NativeModules.ImageCropPicker;

const options = {
  keyPrefix: "uploads/",
  bucket: "pixelite-s3-oregon",
  region: "us-west-2",
  accessKey: API_KEY,
  secretKey: API_SECRET,
  successActionStatus: 201
}

class NewStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      image: null,
      images: null,
      user: null,
      sendData: null,
    }
  }
  componentDidMount() {
    const userFirebase = firebase.auth().currentUser;
    const user = { uid: userFirebase.uid, email: userFirebase.email };
    this.setState({ user: user });
    console.log('user information from Firebase: ', user);
  }

  handleTextChange = newText => this.setState({ value: newText });
  saveImageToS3(uri) {
    const file = {
      uri: `file://${uri}`,
      name: `${this.state.user.uid}_AND_${uri.slice(uri.lastIndexOf('/') + 1)}`,
      type: "image/jpg"
    }
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
    });
  }
  saveImageDataToServer() {
    const story = {
      title: "hihihihi",
      items: [...this.state.sendData],
      mainImgUri: this.state.sendData[0].imgUri,
    };
    this.props.newStoryCreateStory(story, this.props.user)
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
        }),
        sendData:images.map(i => {
          const prefix = 'https://s3.us-west-2.amazonaws.com/pixelite-s3-oregon/uploads/'
          const uri =  `${prefix}${this.state.user.uid}_AND_${i.path.slice(i.path.lastIndexOf('/') + 1)}`
          return {imgUri: uri, tag:['jeju']};
        })
      });
    }).catch(e => alert(e));
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
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

          <TouchableOpacity onPress={this.saveImageDataToServer.bind(this)}>
            <Text>Submit!</Text>
          </TouchableOpacity>


        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps, {
  newStoryCreateStory,
})(NewStory);
