import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DotButton from '@components/compound-components/button-dot.compound';

const {width: screenWidth} = Dimensions.get('window');
const TabStory = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Fixed 피드 작성 */}
      <View style={[styles.fixedHeaderContainer]}>
        <DotButton
          style={styles.feedWriteButton}
          onPress={() => {
            navigation.navigate('ModalSelectPhoto');
          }}>
          <DotButton.ButtonText>피드 작성</DotButton.ButtonText>
        </DotButton>
      </View>
      {/* 피드 */}
      <ScrollView style={styles.scrollView} scrollEventThrottle={16}>
        <View style={styles.feedsContainer}>
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
          <View style={styles.feed} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TabStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  fixedHeaderContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    zIndex: 1,
    alignSelf: 'flex-end',
    marginBottom: 20,
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
