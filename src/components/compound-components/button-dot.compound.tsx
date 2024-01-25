/**
 * Compound Components
 * <DotButton></DotButton> Dot 스타일 버튼
 * <DotButton.ButtonText/> 버튼 텍스트
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type DotButtonProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

type ButtonTextProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const DotButton = ({children, style, onPress, ...props}: DotButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...props}>
      <View style={styles.dashWrap}>{children}</View>
    </TouchableOpacity>
  );
};

const ButtonText = ({children, style, ...props}: ButtonTextProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

DotButton.ButtonText = ButtonText;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#323232',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  dashWrap: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#323232',
    paddingVertical: 7,
    paddingLeft: 35,
    paddingRight: 34,
  },

  text: {
    fontSize: 16,
    letterSpacing: -0.2,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
});

export default DotButton;
