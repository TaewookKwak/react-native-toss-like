import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import AnimatedButton from '~components/animations/animated-button';
import Text from '../text/text';
type ButtonProps = {
  onPress: () => void;
  text: string;
};

const Button = ({onPress, text}: ButtonProps) => {
  const {theme} = useThemeStore();
  return (
    <AnimatedButton foucsedBackgroundColor={colors[theme].bg_button_focus}>
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          {
            backgroundColor: colors[theme].bg_button,
          },
        ]}>
        <Text.Common style={[styles.text, {color: colors[theme].text_button}]}>
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
    fontWeight: 'bold',
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
