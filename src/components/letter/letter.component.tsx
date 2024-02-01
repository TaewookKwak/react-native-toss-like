import {
  Image,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'App';

// right_arrow.svg 이미지 import
const RightArrowSvg = require('@assets/right_arrow.png');

const LetterPreview = ({date, content}: {date: string; content: string}) => {
  const [isTextTruncated, setTextTruncated] = useState(false); // 텍스트가 잘렸는지 여부
  const [contentHeight, setContentHeight] = useState<number>(0); // 텍스트의 높이 (ios 에서 lines 값이 정확히 안나옴)
  const contentRef = useRef<Text>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onContentLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout; // 텍스트의 높이
    setContentHeight(height);
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const {lines} = e.nativeEvent;

    const isOverLinesInAndroid = lines.length >= 3; // 3줄 이상인지 여부 (안드로이드)
    const isOverLinesInIos = contentHeight > styles.content.lineHeight * 3; // 3줄 이상인지 여부 (ios)

    if (isOverLinesInAndroid || isOverLinesInIos) {
      setTextTruncated(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* 날짜 */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      {/* 내용 */}
      <Text
        ref={contentRef}
        style={styles.content}
        numberOfLines={3}
        ellipsizeMode="tail"
        onLayout={onContentLayout}
        onTextLayout={onTextLayout}>
        {content}
      </Text>

      {/* 더보기 화살표 */}

      {isTextTruncated && (
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => {
            navigation.navigate('LetterScreen');
          }}>
          <Image
            style={styles.arrow}
            source={RightArrowSvg}
            width={22}
            height={15}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LetterPreview;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 126,

    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#B9B9B9',
    backgroundColor: '#FFF',
    paddingTop: 42,
    paddingRight: 50,
    paddingLeft: 8,
  },
  dateContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,

    paddingHorizontal: 7,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#B9B9B9',
    backgroundColor: '#F3F3F3',

    // borderTop과 borderLeft 제거
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  dateText: {
    color: '#454545',
    fontFamily: 'Galmuri9-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.5,
    letterSpacing: -0.15,
  },
  content: {
    color: '#171717',
    fontFamily: 'Galmuri11-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.16,

    overflow: 'hidden',
  },

  arrowContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 13,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {},
});
