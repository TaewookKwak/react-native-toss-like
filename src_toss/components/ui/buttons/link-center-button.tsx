import React from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import AnimatedButton from '~components/animations/animated-button';

type LinkCenterButtonProps = {
  text: string;
  image?: ImageURISource | ImageURISource[] | ImageRequireSource;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
};

const LinkCenterButton = ({
  text,
  image,
  containerStyle,
  textStyle,
  iconStyle,
}: LinkCenterButtonProps) => {
  const {theme} = useThemeStore();

  return (
    <AnimatedButton
      paddingHorizontal={0}
      paddingVertical={0}
      marginHorizontal={0}
      marginVertical={0}
      backgroundColor={colors[theme].bg_setion}
      foucsedBackgroundColor={colors[theme].bg_button_focus}>
      <View style={[styles.container, containerStyle]}>
        <Text
          style={[
            styles.text,
            {
              color: colors[theme].text_more,
            },
            textStyle,
          ]}>
          {text}
        </Text>

        <IconFAw6
          name="angle-right"
          size={16}
          style={[
            {
              color: colors[theme].icon,
            },
          ]}
        />
      </View>
    </AnimatedButton>
  );
};

export default LinkCenterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 6,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
