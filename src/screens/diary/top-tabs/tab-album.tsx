import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AlbumTab = () => {
  return (
    <View style={styles.container}>
      <Text>AlbumTab</Text>
    </View>
  );
};

export default AlbumTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    position: 'relative',
  },
});
