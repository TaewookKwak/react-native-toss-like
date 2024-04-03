// compound component pattern 으로 구현할거고 구조는 리스트 컨테이너, 아이콘, 텍스트, 서브텍스트, 버튼으로 구성할거임

import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type ItemProps = {
  image: ImageSourcePropType;
  children: React.ReactElement[];
};

const Item = ({children}: ItemProps) => {
  return <View style={styles.container}>{children}</View>;
};

type PrefixProps = {
  image: ImageSourcePropType;
  children: React.ReactElement;
};

const Prefix = ({image, children}: PrefixProps) => {
  const {theme} = useThemeStore();

  return (
    <View style={styles.prefixContainer}>
      <Image source={image} style={{width: 24, height: 24}} />
      {children}
    </View>
  );
};

const Suffix = ({children}: {children: React.ReactElement}) => {
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 12,
  },
  prefixContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  subText: {
    marginLeft: 'auto',
    fontSize: 14,
  },
});

Item.Prefix = Prefix;
Item.Suffix = Suffix;
