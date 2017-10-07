import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import Login from './components/Login';
// import Tabs from './TabRouter';
import Home from './components/Home';
import NewStory from './components/NewStory';
import Profile from './components/Profile';
import { HomeIcon, StoryIcon, ProfileIcon } from './components/icons/Icons';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar >
        <Scene key="auth" >
          <Scene key="login" component={Login} title="Please Login" />
        </Scene>
        <Scene key="main" hideNavBar>
          <Tabs
            key="tabBar"
            activeTintColor="black"
            tabStyle={{
              paddingTop: Platform.OS === 'android'
              ? StatusBar.currentHeight : 0,
              backgroundColor: 'white' }}
            labelStyle={{ fontSize: 9, fontFamily: 'Avenir' }}
            swipeEnabled={true}
            hideNavBar
          >
            <Scene key="Home"
              component={Home}
              icon={HomeIcon}
              tab={{ labelStyle:{fontSize: 20, fontFamily: 'Avenir'}}}
              hideNavBar
            />
            <Scene key="NewStory" component={NewStory} icon={StoryIcon} hideNavBar />
            <Scene key="Profile" component={Profile} icon={ProfileIcon} hideNavBar />
          </Tabs>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
