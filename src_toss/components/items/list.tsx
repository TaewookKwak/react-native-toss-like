// compound component pattern 으로 구현할거고 구조는 리스트 컨테이너, 아이콘, 텍스트, 서브텍스트, 버튼으로 구성할거임

import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';

type ItemProps = {
  children: ReactNode;
};

const Item = ({children}: ItemProps) => {
  return <View style={styles.container}>{children}</View>;
};

type PrefixProps = {
  image: string;
  children: ReactNode;
};

const Prefix = ({image, children}: PrefixProps) => {
  return (
    <View style={styles.prefixContainer}>
      <Image
        source={image as ImageSourcePropType}
        style={{width: 24, height: 24}}
      />
      <View style={styles.textContainer}>{children}</View>
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
    justifyContent: 'space-between',

    padding: 12,
  },
  prefixContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
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

export default Item;
