import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProfileActions from '../actions';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';
import { MapIcon, SettingIcon, CalendarIcon, LocationIcon } from './icons/Icons';

const IMAGE_URLS = [
  {uri: "https://s3.us-east-2.amazonaws.com/coderaising-cs/38824_1.jpg"},
  // {uri: "https://forums.imore.com/attachments/photography-videography/66363d1411762006t-show-us-some-photos-taken-iphone-6-imageuploadedbyimore-forums1411762005.474797.jpg"},
  // {uri: "https://forums.imore.com/attachments/iphone-6/66677d1411955559t-post-pictures-video-taken-your-iphone-6-imageuploadedbyimore-forums1411955558.906521.jpg"},
  {uri: "https://forums.imore.com/attachments/photography-videography/66363d1411762006t-show-us-some-photos-taken-iphone-6-imageuploadedbyimore-forums1411762005.474797.jpg"},
  // {uri: "http://lorempixel.com/400/400/business"},
  {uri: "http://lorempixel.com/400/400/food"},
  {uri: "http://lorempixel.com/400/400/nightlife"},
  {uri: "http://lorempixel.com/400/400/people"},
  // {uri: "http://lorempixel.com/400/400/technics"},
  // {uri: "http://lorempixel.com/400/400/transport"},
  // {uri: "http://lorempixel.com/400/400/sports"},
  {uri: "http://lorempixel.com/400/400/fashion"},
  {uri: "http://lorempixel.com/400/400/city"},
];

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 126.9780;
const LATITUDE_DELTA = 120;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const windowWidth = Dimensions.get('window').width - 36;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      image: null,
    };
  }

  calculatedSize(length) {
    return { width: windowWidth / length, height: windowWidth / 5 }
  }

  renderRandomChunk(imagesArr) {
    const array = imagesArr.slice(0);
    const length = array.length;
    const result = [];
    let sum = 0;

    while (sum < length) {
      const willAdd = Math.floor(Math.random() * 3) + 2;
      const tuple = [];
      for (let i = 0; i < willAdd; i += 1) {
        if (array[i]) tuple.push(array[i]);
      }
      if (tuple.length > 0) result.push(tuple);
      array.splice(0, willAdd);
      sum += willAdd;
    }
    return result;
  }

  renderRow(images) {
    console.log('images: ', images);
    return images.map((image, i) => {
      return (
        <Image key={i} style={[{margin: 0}, this.calculatedSize(images.length)]} source={{ uri: image.imgUri }} />
      );
    });
  }

  renderImagesInGroups(items) {
    console.log('items:', items);
    return this.renderRandomChunk(items).map((imagesForRow, i) => {
      return (
        <View style={{ margin: 0, flexDirection: "row" }} key={i}>
          {this.renderRow(imagesForRow)}
        </View>
      )
    })
  }

  renderStories(story) {
    return (
      <View style={{ marginBottom: 25 }}>
        <View style={{ marginBottom: 6, borderRadius: 10, overflow: 'hidden' }}>
          {this.renderImagesInGroups(story.items)}
        </View>
        <Text style={{ color: '#565656', fontFamily: 'Avenir', fontSize: 15, fontWeight: 'bold'}}>Backpacking in Australia</Text>
        <View style={{marginTop: 4, flexDirection: "row"}}>
          <CalendarIcon />
          <Text style={{ color: 'grey', fontFamily: 'Avenir', fontSize: 10, marginRight: 10}}>July 16-21</Text>
          <LocationIcon />
          <Text style={{ color: 'grey', fontFamily: 'Avenir', fontSize: 10}}>Sydney, Australia</Text>
        </View>
      </View>
    )
  }
  onMapIconPress (e) {
    this.props.profileShowMap();
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id += id,
          color: randomColor(),
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.profileScreen}>
        <View style={styles.profileMenu}>
          <TouchableOpacity onPress={(e) => { this.onMapIconPress(e) }}>
            <MapIcon />
          </TouchableOpacity>

          <SettingIcon />
        </View>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={{uri:'https://s3.us-east-2.amazonaws.com/coderaising-cs/KakaoTalk_Photo_2017-03-27-14-38-15.jpeg'}}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>Jenny Hong</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {this.props.isShowingMap &&
              <MapView
                provider={this.props.provider}
                style={styles.map}
                initialRegion={this.state.region}
                onPress={(e) => this.onMapPress(e)}
              >
                {this.state.markers.map((marker, i) => (
                  <MapView.Marker
                    key={marker.key}
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
                    key={i}
                  />
                ))}
              </MapView>
            }
          </View>
          {this.props.stories.map((story) => {
            this.renderStories(story);
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  profileMenu: {
    margin: 8,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    margin: 10,
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  profileName: {
    color: '#565656',
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: 'bold',
  },
  scrollView: {
    marginLeft: 18,
    marginRight: 18,
  },
  container: {
    width: windowWidth,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = ({ profile }) => {
  const { stories, selectedStory, isShowingMap } = profile;
  return { stories, selectedStory, isShowingMap };
};
const matchDispatchToProps = dispatch =>
  bindActionCreators(ProfileActions, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
