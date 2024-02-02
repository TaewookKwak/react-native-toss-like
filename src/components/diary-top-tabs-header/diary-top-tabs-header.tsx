import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Txt from '@components/ui/text/text';

// right_arrow.svg 이미지 import
const ArrowRightImage = require('@assets/arrow_right.png');
const ArrowLeftImage = require('@assets/arrow_left.png');
const DiaryViewHeader = ({
  state,
  descriptors,
  navigation,
  position,
  navigationState,
  ...props
}) => {
  const routeIndex = navigationState.index; // 현재 라우트 인덱스
  const routeName = navigationState.routes[navigationState.index].name; // 현재 라우트 이름
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => {
          if (routeIndex === 0) {
            navigation.jumpTo('Album');
          } else {
            navigation.jumpTo('Story');
          }
        }}>
        <Image source={ArrowLeftImage} width={19} height={22} />
      </TouchableOpacity>

      <Txt.Common style={styles.header} numberOfLines={3}>
        {routeName === 'Story' ? '우리의 이야기' : '앨범별 보기'}
      </Txt.Common>

      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => {
          if (routeIndex === 0) {
            navigation.jumpTo('Album');
          } else {
            navigation.jumpTo('Story');
          }
        }}>
        <Image source={ArrowRightImage} width={19} height={22} />
      </TouchableOpacity>
    </View>
  );
};

export default DiaryViewHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  arrowContainer: {
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  header: {
    color: '#171717',
    textAlign: 'center',
    fontFamily: 'Galmuri9-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    letterSpacing: -0.18,
    alignSelf: 'center',
  },
});
