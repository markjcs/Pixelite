import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const GoogleAuthButton = ({ onPress, children }) => {
  const { googleAuthButtonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={googleAuthButtonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  googleAuthButtonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#DD4B39',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    marginLeft: 5,
    marginRight: 5,
  },
  facebookAuthButtonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3b5998',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0D47A1',
    marginLeft: 5,
    marginRight: 5,
  },
};

export { GoogleAuthButton };
