import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src_toss/styles/color';
import {AssetListParams} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import AnimatedButton from '~components/animations/animated-button';
import AnimatedListTranslateY from '~components/animations/animated-list-translateY';

const IconTextList = ({data}: {data: AssetListParams}) => {
  const {theme} = useThemeStore();

  return (
    <AnimatedButton
      backgroundColor={colors[theme].bg_setion}
      foucsedBackgroundColor={colors[theme].bg_button_focus}>
      <AnimatedListTranslateY>
        <Pressable
          style={[styles.container]}
          onPressOut={() => {
            console.log('ff');
          }}>
          <IconFAw6
            name={data.iconName}
            size={24}
            style={[
              styles.icon,
              {
                color: colors[theme].text,
              },
            ]}
          />
          <Text
            style={[
              styles.text,
              {
                color: colors[theme].text,
              },
            ]}>
            {data.name}
          </Text>
        </Pressable>
      </AnimatedListTranslateY>
    </AnimatedButton>
  );
};

export default IconTextList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  icon: {
    height: 24,
    width: 30,
  },
  text: {
    fontSize: 18,
  },
});
