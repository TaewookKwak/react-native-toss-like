import React from 'react';
import {Text as RnText, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle> | TextStyle | undefined;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  [key: string]: any;
};

const Text = () => {};

const Common = ({
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  ...props
}: TextProps) => {
  const {theme} = useThemeStore();
  return (
    <RnText
      style={[styles.text, {color: colors[theme].darkSlate}, style]}
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
    fontSize: 13,
    fontWeight: '400',
  },
});

Text.Common = Common;

export default Text;
