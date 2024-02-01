import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StoryTab = () => {
  return (
    <View style={styles.container}>
      <Text>StoryTab</Text>
    </View>
  );
};

export default StoryTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    position: 'relative',
  },
});
