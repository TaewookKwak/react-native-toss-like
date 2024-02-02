/**
 * Compound Components
 * <UnderlineButton> 언더라인 스타일 버튼
 * <UnderlineButton.ButtonText> 버튼 텍스트
 */
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

type ButtonTextProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const UnderlineButton = ({children, style, onPress, ...props}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      {...props}
      onPress={onPress}>
      {children}
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

UnderlineButton.ButtonText = ButtonText;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
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
