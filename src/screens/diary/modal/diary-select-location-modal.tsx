import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Map from '../map';

const DiarySelectLocationScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

export default DiarySelectLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
