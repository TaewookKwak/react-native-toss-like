import React, {CSSProperties} from 'react';
import {Text as RnText, StyleSheet} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type TextProps = {
  children: React.ReactNode;
  style?: CSSProperties | undefined;
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
      style={[styles.text, {color: colors[theme].text_title}, style]}
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
    fontWeight: '400',
    // lineHeight: 19.5,
    // letterSpacing: -0.13,
  },
});

Text.Common = Common;

export default Text;
