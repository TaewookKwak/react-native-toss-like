import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src/styles/color';
import {StyleProps} from 'src/types/types';
import useThemeStore from 'src/utils/zustand/themeStore';

type TabBarIconProps = {
  label: string;
  icon: string;
  focused: boolean;
};

// 별도의 TabBarIcon 컴포넌트 생성
const TabBarIcon = ({label, icon, focused}: TabBarIconProps) => {
  const {theme} = useThemeStore();
  const scaleValue = useSharedValue(1);
  const backgroundColorValue = useSharedValue(colors[theme].white);

  const stylesT = React.useMemo(() => styles(colors[theme]), [theme]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scaleValue.value, {
            damping: 3,
            stiffness: 500,
          }),
        },
      ],
      backgroundColor: backgroundColorValue.value,
    };
  });

  const tap = React.useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(10000)
        .onBegin(() => {
          scaleValue.value = 0.9;
          backgroundColorValue.value = colors[theme].mediumGray;
        })
        .onFinalize(() => {
          scaleValue.value = 1;
          backgroundColorValue.value = colors[theme].white;
        }),
    [backgroundColorValue, scaleValue, theme],
  );

  useEffect(() => {
    backgroundColorValue.value = colors[theme].white;
  }, [theme, backgroundColorValue]);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[
          stylesT.tabBarIconContainer,
          focused && stylesT.avtiveTabBarIconContainer,
          animatedStyles,
        ]}>
        <IconFAw6
          name={icon}
          size={22}
          color={
            focused
              ? stylesT.activeTabBarText.color
              : stylesT.inactiveTabBarText.color
          }
        />
        <Animated.Text
          style={[
            {
              color: focused
                ? stylesT.activeTabBarText.color
                : stylesT.inactiveTabBarText.color,
            },
            stylesT.tabBarText,
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = (theme: StyleProps) =>
  StyleSheet.create({
    tabBarText: {
      fontSize: 12,
      fontWeight: '500',
    },
    activeTabBarText: {
      color: theme.darkSlate,
    },
    inactiveTabBarText: {
      color: theme.lightSlate,
    },
    tabBarIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      width: 50,
      height: 50,
      borderRadius: 10,
    },

    avtiveTabBarIconContainer: {},
  });

export default TabBarIcon;
