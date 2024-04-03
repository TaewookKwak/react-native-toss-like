import React, {useEffect, ReactNode} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type AnimatedButtonProps = {
  children: ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  backgroundColor?: string;
  foucsedBackgroundColor?: string;
};

const AnimatedButton = ({
  children,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  backgroundColor,
  foucsedBackgroundColor,
}: AnimatedButtonProps) => {
  const {theme} = useThemeStore();
  const scaleValue = useSharedValue(1);
  const backgroundColorValue = useSharedValue(backgroundColor);

  useEffect(() => {
    backgroundColorValue.value = backgroundColor;
  }, [backgroundColorValue, backgroundColor]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scaleValue.value, {
            stiffness: 90,
          }),
        },
      ],
      backgroundColor: backgroundColorValue.value,
      borderRadius: 12,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      marginVertical: marginVertical,
      marginHorizontal: marginHorizontal,
    };
  });

  const tap = React.useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(10000)
        .onBegin(() => {
          scaleValue.value = 0.98;
          backgroundColorValue.value =
            foucsedBackgroundColor || colors[theme].bg_button_focus;
        })
        .onFinalize(() => {
          scaleValue.value = 1;
          backgroundColorValue.value = backgroundColor;
        }),
    [
      backgroundColorValue,
      scaleValue,
      theme,
      backgroundColor,
      foucsedBackgroundColor,
    ],
  );

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animatedStyles]}>{children}</Animated.View>
    </GestureDetector>
  );
};

AnimatedButton.defaultProps = {
  children: null,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginVertical: 4,
  marginHorizontal: 12,
  backgroundColor: 'transparent',
  foucsedBackgroundColor: 'transparent',
};

export default AnimatedButton;
