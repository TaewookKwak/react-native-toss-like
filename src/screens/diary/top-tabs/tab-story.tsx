import DotButton from '@components/compound-components/button-dot.compound';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width: screenWidth} = Dimensions.get('window');
const StoryTab = () => {
  const scrollY = useSharedValue(0); // 스크롤 위치 상태

  // 스크롤 이벤트 핸들러
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // fixed 헤더 애니메이션 스타일
  const fixedHeaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      display: scrollY.value < 80 ? 'none' : 'flex',
    };
  });
  return (
    <View style={styles.container}>
      {/* Fixed 피드 작성 */}
      <Animated.View
        style={[styles.fixedHeaderContainer, fixedHeaderAnimatedStyle]}>
        <FeedWriteButton onPress={() => {}} />
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        // stickyHeaderIndices={[0]}
      >
        {/* Stiky 피드 작성 */}
        <View style={[styles.headerContainer]}>
          <FeedWriteButton onPress={() => {}} />
        </View>
        <View style={styles.feedsContainer}>
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
          <View style={[styles.feed]} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

// 스티키 버튼 구현하기 위해 재사용 컴포넌트 분리
const FeedWriteButton = ({onPress}) => {
  return (
    <DotButton
      style={styles.feedWriteButton}
      wrapStyle={{
        paddingRight: 18,
        paddingLeft: 18,
        paddingVertical: 7,
      }}>
      <DotButton.ButtonText>피드 작성</DotButton.ButtonText>
    </DotButton>
  );
};

export default StoryTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  fixedHeaderContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    zIndex: 1,
    alignSelf: 'flex-end',
    marginBottom: 20,
    backgroundColor: 'red',
  },
  headerContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    marginTop: 8,
    textAlign: 'right',
    marginBottom: 20,

    marginRight: 20,
  },
  feedWriteButton: {
    backgroundColor: '#FFFA7D',
  },
  scrollView: {
    flex: 1,
  },

  feedsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  feed: {
    width: screenWidth / 3 - 3,
    height: screenWidth / 3 - 3,
    backgroundColor: '#D9D9D9',
  },
});
