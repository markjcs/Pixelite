import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Tabs from './TabRouter';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth">
          <Scene key="login" component={Login} title="Please Login"/>
        </Scene>
        <Scene key="main">
          <Scene
            onRight={() => Actions.newStory()}
            rightTitle="Add"
            key="storyList"
            component={Home}
            title="Home"
            initial
          />
        </Scene>
        <Scene key="newStory">
          <Scene component={NewStory} title="Create a Story" />
        </Scene>
      </Scene>

    </Router>
  );
};

export default RouterComponent;
