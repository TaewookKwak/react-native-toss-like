/**
 * Compound Components
 * <UnderlineButton> 언더라인 스타일 버튼
 * <UnderlineButton.ButtonText> 버튼 텍스트
 */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const UnderlineButton = ({children, style, ...props}) => {
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

UnderlineButton.ButtonText = ButtonText;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 27,
    color: '#000',
    textAlign: 'center',
    // textDecorationLine: 'underline',
    letterSpacing: -0.16,
    fontFamily: 'Galmuri11-Regular',
  },
});

export default UnderlineButton;
