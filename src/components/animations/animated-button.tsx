import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors} from 'src/styles/color';
import useThemeStore from 'src/utils/zustand/themeStore';

interface AnimatedButtonProps extends React.PropsWithChildren {
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 버튼의 세로 패딩 */
  paddingVertical?: number;
  /** 버튼의 가로 패딩 */
  paddingHorizontal?: number;
  /** 버튼의 세로 마진 */
  marginVertical?: number;
  /** 버튼의 가로 마진 */
  marginHorizontal?: number;
  /** 버튼의 기본 배경색 */
  backgroundColor?: string;
  /** 버튼이 눌렸을 때의 배경색 */
  foucsedBackgroundColor?: string;
  /** 버튼 클릭 시 실행될 함수 */
  onPress?: () => void;
  /** 버튼 스타일 */
  style?: React.ComponentProps<typeof Animated.View>['style'];
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  disabled = false,
  paddingVertical = 0,
  paddingHorizontal = 0,
  marginVertical = 0,
  marginHorizontal = 0,
  backgroundColor = 'transparent',
  foucsedBackgroundColor = 'transparent',
  onPress,
  style,
}) => {
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
            stiffness: 200,
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
        .enabled(!disabled)
        .onBegin(() => {
          scaleValue.value = 0.95;
          backgroundColorValue.value =
            foucsedBackgroundColor || colors[theme].mediumGray;
        })
        .onFinalize(() => {
          scaleValue.value = 1;
          backgroundColorValue.value = backgroundColor;
        }),
    [
      disabled,
      backgroundColorValue,
      scaleValue,
      theme,
      backgroundColor,
      foucsedBackgroundColor,
    ],
  );

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animatedStyles, style]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default AnimatedButton;
