import React from 'react';
import {StyleSheet} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import IconFth from 'react-native-vector-icons/Feather';

type TabBarIconProps = {
  label: string;
  icon: string;
  focused: boolean;
};
// 별도의 TabBarIcon 컴포넌트 생성
const TabBarIcon = ({label, icon, focused}: TabBarIconProps) => {
  const scaleValue = useSharedValue(1);
  const backgroundColorValue = useSharedValue('#fff');

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scaleValue.value, {
            damping: 10,
            stiffness: 600,
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
        .onTouchesDown(() => {
          scaleValue.value = 0.9;
          backgroundColorValue.value = '#F4F5F7';
        })
        .onFinalize(() => {
          scaleValue.value = 1;
          backgroundColorValue.value = '#fff';
        }),
    [backgroundColorValue, scaleValue],
  );

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[
          styles.tabBarIconContainer,
          focused && styles.avtiveTabBarIconContainer,
          animatedStyles,
        ]}>
        <IconFth
          name={icon}
          size={22}
          color={
            focused
              ? styles.activeTabBarText.color
              : styles.inactiveTabBarText.color
          }
        />
        <Animated.Text
          style={[
            {
              color: focused
                ? styles.activeTabBarText.color
                : styles.inactiveTabBarText.color,
            },
            styles.tabBarText,
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  tabBarText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabBarText: {
    color: '#1E1E25',
  },
  inactiveTabBarText: {
    color: '#B0B7C1',
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
