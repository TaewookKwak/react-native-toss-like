import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type TxtProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  [key: string]: any;
};

const Txt = () => {};

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
  numberOfLines,
  ellipsizeMode,
  ...props
}: TxtProps) => {
  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}>
      {children}
    </Text>
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

Txt.Common = Common;

export default Txt;
