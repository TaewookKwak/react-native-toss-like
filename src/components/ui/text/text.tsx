import React from 'react';
import {StyleProp, StyleSheet, Text as RnText, TextStyle} from 'react-native';

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  [key: string]: any;
};

const Text = () => {};

/**
 * @param {React.ReactNode} children
 * @param {StyleProp<TextStyle>} style
 * @param {number} numberOfLines
 * @param {'head' | 'middle' | 'tail' | 'clip'} ellipsizeMode
 * @param {any} props
 * @returns <Text />
 */
const Common = ({
  children,
  style,
  fontFamily,
  fontSize,
  fontWeight,
  numberOfLines,
  ellipsizeMode,
  ...props
}: TextProps) => {
  return (
    <RnText
      style={[styles.text, {fontFamily, fontSize, fontWeight}, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}>
      {children}
    </RnText>
  );
};

const styles = StyleSheet.create({
  // 기본 폰트 스타일
  text: {
    fontFamily: 'Galmuri11-Regular',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: -0.13,
  },
});

Text.Common = Common;

Text.defaultProps = {
  children: null,
  fontFamily: 'Galmuri11-Regular',
  fontSize: 13,
  fontWeight: '400',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
  style: {},
};

export default Text;
