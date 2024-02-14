import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import IconFAw6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from 'src_toss/styles/color';
import {AssetListParams} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

const IconTextList = ({data}: {data: AssetListParams}) => {
  const {theme} = useThemeStore();
  return (
    <Pressable
      style={styles.container}
      key={data.id}
      onPress={() => {
        console.log(data);
      }}>
      <IconFAw6 name={data.iconName} size={24} style={styles.icon} />
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
  );
};

export default IconTextList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
    marginHorizontal: 24,
  },
  icon: {
    color: 'lightblue',
    height: 24,
    width: 30,
  },
  text: {
    fontSize: 18,
  },
});
