import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../actions';

const dummyData = [
  {imgUri: 'https://lorempixel.com/400/200/nature/1/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/2/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/3/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/4/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/5/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/6/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/7/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/8/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/9/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/1/', title: 'besties'},
  {imgUri: 'https://lorempixel.com/400/200/nature/2/', title: 'besties'},
];

const WINDOW_WIDTH = Dimensions.get('window').width;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dummyData,
      text: '',
    }
  }

  searchText() {
    console.log(this.props.searchText);
    fetch('http://localhost:5000/searchText', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.props.searchText }),
    }).then(res => console.log(res));
    this.search.clearText()
  }

  render() {
    return (
      <View style={{flex:1, display:'flex'}}>
        <SearchBar
          ref = {search => this.search = search}
          containerStyle={{backgroundColor:'white', borderWidth:0}}
          inputStyle={{backgroundColor:'white', borderWidth:1, borderColor:'gray'}}
          onChangeText={(text) => this.props.changeText(text)}
          onSubmitEditing={ e => this.searchText.call(this)}
          autoCorrect={false}
          lightTheme
          round
          placeholder='Type Here...' />

        <View style={{height: 20}}/>

        <View style={{flex:1}}>
          <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             SeparatorComponent={() => <View style={{width: 20}} />}
             keyExtractor={(item, index) => index}
             data={this.state.data}
             renderItem={({ item }) => {
               return (
                 <View style={{display:'flex', alignItems:'center', width: (WINDOW_WIDTH) / 3}}>
                   <Image style={{width: (WINDOW_WIDTH * 0.95) / 3 , height: (WINDOW_WIDTH * 0.95) / 3 * 9 / 16, marginHorizontal:2}}
                   source={{uri: item.imgUri}}/>
                   <Text>{item.title}</Text>
                 </View>
               );
             }}
          />
        </View>

        <View style={{height: 20}}/>

        <View style={{width: WINDOW_WIDTH, flex:2}}>
          <View style={{marginLeft: 18}}><Text>Followers</Text></View>
          <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             SeparatorComponent={() => <View style={{width: 20}} />}
             keyExtractor={(item, index) => index}
             data={this.state.data}
             renderItem={({ item }) => {
               return (
                 <View style={{display:'flex', alignItems:'center', width: (WINDOW_WIDTH) / 2}}>
                   <Image style={{width: WINDOW_WIDTH * 0.95/ 2 , height: (WINDOW_WIDTH * 0.95) / 2 * 9 / 16, marginHorizontal:2}} source={{uri: item.imgUri}}/>
                 </View>
               );
             }}
          />
        </View>

        <View style={{width: WINDOW_WIDTH, flex:2}}>
          <View style={{marginLeft: 18}}><Text>Friends</Text></View>
          <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             SeparatorComponent={() => <View style={{width: 20}} />}
             keyExtractor={(item, index) => index}
             data={this.state.data}
             renderItem={({ item }) => {
               return (
                 <View style={{display:'flex', alignItems:'center', width: (WINDOW_WIDTH) / 2}}>
                   <Image style={{width: WINDOW_WIDTH * 0.95/ 2 , height: (WINDOW_WIDTH * 0.95) / 2 * 9 / 16, marginHorizontal:2}} source={{uri: item.imgUri}}/>
                 </View>
               );
             }}
          />
        </View>

      </View>
    )
  }
}

const mapStateToProps = ({ home }) => {
  const { searchText } = home;
  return { searchText };
};

const matchDispatchToProps = dispatch =>
  bindActionCreators(HomeActions, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);

// import React from "react";
// import { ScrollView, Text, Linking, View } from "react-native";
// import { Card, Button } from "react-native-elements";
//
// const stories = [
//   {
//     key: 1,
//     name: "Spain trip in summer '16",
//     image: require("../images/1.jpg"),
//     url: "https://unsplash.com/photos/C9t94JC4_L8"
//   },
//   {
//     key: 2,
//     name: "Jeju with besties",
//     image: require("../images/2.jpg"),
//     url: "https://unsplash.com/photos/waZEHLRP98s"
//   },
//   {
//     key: 3,
//     name: "All of the foods in Japan",
//     image: require("../images/3.jpg"),
//     url: "https://unsplash.com/photos/cFplR9ZGnAk"
//   },
//   {
//     key: 4,
//     name: "Backpacking in Australia",
//     image: require("../images/4.jpg"),
//     url: "https://unsplash.com/photos/89PFnHKg8HE"
//   }
// ];
//
// export default () => (
//   <View style={{ flex: 1 }}>
//     <ScrollView contentContainerStyle={{ paddingVertical: 20, backgroundColor: 'white' }}>
//       {stories.map(({ name, image, url, key }) => (
//         <Card title={`CARD ${key}`} image={image} key={key}>
//           <Text style={{ marginBottom: 10 }}>
//             {name}
//           </Text>
//           <Button
//             backgroundColor="#03A9F4"
//             title="VIEW NOW"
//             onPress={() => Linking.openURL(url)}
//           />
//         </Card>
//       ))}
//     </ScrollView>
//   </View>
// );
