import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './components/Home';
import NewStory from './components/NewStory';
import Profile from './components/Profile';
// import Login from './components/Login';


const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => <Icon type='simple-line-icon' name='home' color={tintColor} size={21} />
    },
  },
  NewStory: {
    screen: NewStory,
    navigationOptions: {
      tabBarLabel: 'NEW STORY',
      tabBarIcon: ({ tintColor }) => <Icon type='simple-line-icon' name='plus' color={tintColor} size={21} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => <Icon type='simple-line-icon' name='user' color={tintColor} size={21} />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: 'black',
    labelStyle: {
      fontSize: 9,
      fontFamily: 'Avenir',
    },
    style: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: 'white',
    },
  },
});


// export const CreateRootNavigator = StackNavigator({
//   LoggedIn: {
//     screen: Tabs,
//   },
// }, {
//   headerMode: 'none',
// });
