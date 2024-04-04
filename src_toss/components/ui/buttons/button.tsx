import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../text/text';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import {colors} from 'src_toss/styles/color';
type ButtonProps = {
  onPress: () => void;
  text: string;
};

const Button = ({onPress, text}: ButtonProps) => {
  const {theme} = useThemeStore();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors[theme].bg_button,
        },
      ]}>
      <Text.Common
        style={{
          fontSize: 16,
          color: colors[theme].text_button,
        }}>
        {text}
      </Text.Common>
    </Pressable>
  );
};

Button.defaultProps = {
  text: 'Button',
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
