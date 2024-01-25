/**
 * Compound Components
 * <BorderButton></BorderButton> 우/하단 border 스타일 버튼
 * <BorderButton.Butto
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const BorderButton = ({children, style, ...props}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({children, style, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

BorderButton.ButtonText = ButtonText;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingLeft: 41,
    paddingRight: 40,

    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#323232',
  },

  text: {
    fontFamily: 'Galmuri11-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
});

export default BorderButton;
