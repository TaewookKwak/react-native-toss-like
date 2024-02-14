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
};

const AnimatedButton = ({children}: AnimatedButtonProps) => {
  const {theme} = useThemeStore();
  const scaleValue = useSharedValue(1);
  const backgroundColorValue = useSharedValue('transparent');

  useEffect(() => {
    backgroundColorValue.value = 'transparent';
  }, [backgroundColorValue]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scaleValue.value, {
            damping: 6,
            stiffness: 500,
          }),
        },
      ],
      backgroundColor: backgroundColorValue.value,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 4,
      marginHorizontal: 12,
    };
  });

  const tap = React.useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(10000)
        .onBegin(() => {
          scaleValue.value = 0.98;
          backgroundColorValue.value = colors[theme].bg_button_focus;
        })
        .onFinalize(() => {
          scaleValue.value = 1;
          backgroundColorValue.value = 'transparent';
        }),
    [backgroundColorValue, scaleValue, theme],
  );

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animatedStyles]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default AnimatedButton;
