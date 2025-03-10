import React from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {colors} from 'src/styles/color';
import useThemeStore from 'src/utils/zustand/themeStore';
import AnimatedButton from 'src/components/animations/animated-button';
import Text from '../text/text';
type ButtonProps = {
  onPress: () => void;
  text: string;
};

const Button = ({onPress, text}: ButtonProps) => {
  const {theme} = useThemeStore();
  return (
    <AnimatedButton foucsedBackgroundColor={colors[theme].mediumGray}>
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          {
            backgroundColor: colors[theme].softGray,
          },
        ]}>
        <Text.Common style={[styles.text, {color: colors[theme].slateGray}]}>
          {text}
        </Text.Common>
      </Pressable>
    </AnimatedButton>
  );
};

Button.defaultProps = {
  text: 'Button',
};

export default Button;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '400',
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
