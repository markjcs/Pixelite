import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { SimpleLineIcons } from "react-native-vector-icons";

import Home from "./screens/Home";
import NewStory from "./screens/NewStory";
import Profile from "./screens/Profile";
import Login from "./screens/Login";


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => <SimpleLineIcons name="home" size={21} color={tintColor} />
    },
  },
  NewStory: {
    screen: NewStory,
    navigationOptions: {
      tabBarLabel: 'NEW STORY',
      tabBarIcon: ({ tintColor }) => <SimpleLineIcons name="plus" size={21} color={tintColor} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => <SimpleLineIcons name="user" size={21} color={tintColor} />
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
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: 'white',
    }
  }
});


export const CreateRootNavigator = StackNavigator({
  LoggedIn: {
    screen: Tabs,
  },
}, {
  headerMode: "none",
});


// export const SignedOut = StackNavigator({
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: "Sign Up",
//       headerStyle
//     }
//   },
//   SignIn: {
//     screen: SignIn,
//     navigationOptions: {
//       title: "Sign In",
//       headerStyle
//     }
//   }
// });

// export const SignedIn = TabNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         tabBarIcon: ({ tintColor }) =>
//           <FontAwesome name="home" size={30} color={tintColor} />
//       }
//     },
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         tabBarLabel: "Profile",
//         tabBarIcon: ({ tintColor }) =>
//           <FontAwesome name="user" size={30} color={tintColor} />
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       style: {
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//       }
//     }
//   }
// );
