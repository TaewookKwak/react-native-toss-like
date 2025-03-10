import React from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src/styles/color';
import useThemeStore from 'src/utils/zustand/themeStore';
import AnimatedButton from 'src/components/animations/animated-button';
import Text from '../text/text';

type LinkButtonProps = {
  text: string;
  image?: ImageURISource | ImageURISource[] | ImageRequireSource;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
};

const LinkButton = ({
  text,
  image,
  containerStyle,
  textStyle,
  iconStyle,
}: LinkButtonProps) => {
  const {theme} = useThemeStore();

  return (
    <AnimatedButton
      paddingHorizontal={0}
      paddingVertical={0}
      marginHorizontal={0}
      marginVertical={0}
      backgroundColor={colors[theme].white}
      foucsedBackgroundColor={colors[theme].mediumGray}>
      {/* <AnimatedListTranslateY> */}
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.textContainer]}>
          {image && (
            <Image
              source={image}
              width={12}
              height={12}
              style={[iconStyle, {width: 24, height: 24}]}
              resizeMode="contain"
            />
          )}
          <Text.Common
            style={[
              styles.text,
              {
                color: colors[theme].darkSlate,
              },
              textStyle,
            ]}>
            {text}
          </Text.Common>
        </View>

        <IconFAw6
          name="angle-right"
          size={16}
          style={[
            styles.icon,
            {
              color: colors[theme].lightSlate,
            },
          ]}
        />
      </View>
      {/* </AnimatedListTranslateY> */}
    </AnimatedButton>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
});
