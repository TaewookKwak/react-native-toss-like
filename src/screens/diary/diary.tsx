import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopTabs from './top-tabs';

const {width: screenWidth} = Dimensions.get('window');

const DiaryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabs />
      {/* <ScrollView style={styles.scrollView}>
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
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },

  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  feedsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  feed: {
    width: screenWidth / 3 - 6,
    height: screenWidth / 3 - 6,
    backgroundColor: '#D9D9D9',
  },
});
