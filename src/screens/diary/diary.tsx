import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopTabs from './top-tabs';

const {width: screenWidth} = Dimensions.get('window');

const DiaryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabs />
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
});
