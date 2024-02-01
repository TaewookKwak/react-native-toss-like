/**
 * Compound Components
 * <Alert></Alert> : alert 를 감싸는 컨테이너
 * <Alert.Title></Alert.Title> : alert 제목
 * <Alert.Content></Alert.Content> : alert 내용
 * <Alert.Footer></Alert.Footer> : alert 하단 컨텐츠
 * <Alert.Dot></Alert.Dot> : alert 4개의 점
 * <Alert.TopPattern></Alert.TopPattern> : alert 상단 패턴
 * <Alert.BottomPattern></Alert.BottomPattern> : alert 하단 패턴
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

type AlertProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type PatternProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pattern?: React.JSX.Element;
};

type TextProps = {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const Alert = ({children, style, ...props}: AlertProps) => {
  return (
    <Animated.View style={[styles.container, style]} {...props}>
      {children}
    </Animated.View>
  );
};

const Dot = ({style}: AlertProps) => {
  return (
    <>
      <View style={[styles.dot, styles.leftTop, style]} />
      <View style={[styles.dot, styles.rightTop, style]} />
      <View style={[styles.dot, styles.rightBottom, style]} />
      <View style={[styles.dot, styles.leftBottom, style]} />
    </>
  );
};

const TopPattern = ({style, pattern}: PatternProps) => {
  return (
    <View style={[styles.topPattern, style]}>
      {Array(5)
        .fill('')
        .map((_, index) => {
          // 패턴에 key prop을 추가, 고유한 값을 보장하기 위해 index 사용
          return React.cloneElement(pattern, {key: index});
        })}
    </View>
  );
};

const BottomPattern = ({style, pattern}: PatternProps) => {
  return (
    <View style={[styles.bottomPattern, style]}>
      {Array(5)
        .fill('')
        .map((_, index) => {
          // 패턴에 key prop을 추가, 고유한 값을 보장하기 위해 index 사용
          return React.cloneElement(pattern, {key: index});
        })}
    </View>
  );
};

const Title = ({children, style, ...props}: TextProps) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
};
const Content = ({children, style, ...props}: TextProps) => {
  return (
    <Text style={[styles.content, style]} {...props}>
      {children}
    </Text>
  );
};

const Footer = ({children, style, ...props}: AlertProps) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

Alert.Title = Title;
Alert.Content = Content;
Alert.Footer = Footer;
Alert.Dot = Dot;
Alert.TopPattern = TopPattern;
Alert.BottomPattern = BottomPattern;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    // alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E53DDC',
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 36,

    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E53DDC',
  },
  topPattern: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: -18,
    left: 0,
    transform: [{rotate: '180deg'}],
  },
  bottomPattern: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: -2,
    left: 0,
  },
  leftTop: {
    left: 8,
    top: 8,
  },
  rightTop: {
    left: 'auto',
    top: 8,
    right: 8,
  },
  leftBottom: {
    top: 'auto',
    right: 'auto',
    bottom: 8,
    left: 8,
  },
  rightBottom: {
    top: 'auto',
    left: 'auto',
    bottom: 8,
    right: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#E53DDC',
    textAlign: 'center',
    letterSpacing: -0.16,
    fontFamily: 'Galmuri11-Regular',
  },

  content: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#E53DDC',
    textAlign: 'center',
    letterSpacing: -0.16,
    fontFamily: 'Galmuri11-Regular',
  },
  footer: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Alert;
