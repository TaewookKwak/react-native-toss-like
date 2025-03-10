import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src/styles/color';
import {AssetListParams} from 'src/utils/constants';
import useThemeStore from 'src/utils/zustand/themeStore';
import AnimatedButton from 'src/components/animations/animated-button';
import AnimatedListTranslateY from 'src/components/animations/animated-list-translateY';

const IconTextList = ({data}: {data: AssetListParams}) => {
  const {theme} = useThemeStore();

  return (
    <AnimatedButton
      backgroundColor={colors[theme].white}
      foucsedBackgroundColor={colors[theme].mediumGray}>
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
                color: colors[theme].mutedGray,
              },
            ]}
          />
          <Text
            style={[
              styles.text,
              {
                color: colors[theme].mutedGray,
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
