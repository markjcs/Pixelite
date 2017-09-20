/* global window */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; // middleware
import reducers from './src/reducers'; // getting combined reducers
import Router from './src/Router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(ReduxThunk),
));

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: true
  //   };
  // }
  // componentDidMount() {
  //   this.setState({
  //     isLoading: false
  //   });
  // }
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDscedGD6dyCL7cZ56kWOvz0LsXMjp4cyU',
      authDomain: 'manager-c381e.firebaseapp.com',
      databaseURL: 'https://manager-c381e.firebaseio.com',
      projectId: 'manager-c381e',
      storageBucket: '',
      messagingSenderId: '372117802073',
    };

    firebase.initializeApp(config);
  }
  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

// jenimotion index.ios.js

// import { Tabs } from "./src/TabRouter";
//
//
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true
//     };
//   }
//
//   componentDidMount() {
//     this.setState({
//       isLoading: false
//     });
//   }
//
//   render() {
//     if (this.state.isLoading) {
//       return (<View></View>);
//     }
//     return <Tabs />; // login 기능 구현한 다음에 수정
//   }
// }
