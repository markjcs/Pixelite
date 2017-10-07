import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { GoogleAuthButton } from './AuthButtons';


const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
  },
};

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text); // emailChanged -> action creator
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onSignUpButtonPress() {
    const { email, password } = this.props;
    this.props.signUpUser({ email, password });
  }
  onGoogleAuthButtonPress() {

  }
  renderButtonLogin() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }
  renderButtonSignUp() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onSignUpButtonPress.bind(this)}>
        SignUp
      </Button>
    );
  }
  renderButtonGoogleAuth() {
    return (
      <GoogleAuthButton onPress={this.onGoogleAuthButtonPress.bind(this)}>
        Google +
      </GoogleAuthButton>
    )
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            autoCapitalize="none"
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)} // this -> LoginFrom
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButtonLogin()}
          {this.renderButtonSignUp()}
        </CardSection>

        <CardSection>
          {this.renderButtonGoogleAuth()}
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => { // auth = state.auth
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signUpUser,
})(Login);
