import React, {ReactNode, useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimatedProps = {
  children: ReactNode;
};

export default function AnimatedListTranslateY({children}: AnimatedProps) {
  const opacityValue = useSharedValue(0); // Initial opacity set to 0
  const translateYValue = useSharedValue(50); // Initial position set to 100

  useEffect(() => {
    translateYValue.value = withTiming(0, {
      duration: 320,
      easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
    }); // Move to position 0 with animation
    opacityValue.value = withTiming(1); // Fade in with animation

    return () => {
      translateYValue.value = withTiming(50, {
        duration: 320,
        easing: Easing.out(Easing.bezierFn(0.25, 0.1, 0.25, 1)),
      }); // Move to position 100 with animation
      opacityValue.value = withTiming(0); // Fade out with animation
    };
  }, [opacityValue, translateYValue]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateYValue.value, // Apply translation
        },
      ],
      opacity: opacityValue.value, // Apply opacity
    };
  });
  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
}
