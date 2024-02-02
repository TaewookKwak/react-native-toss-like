import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UnderlineButton from '@components/compound-components/button-underlind.compound';

const AlbumTab = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text>이름순</Text>
          <UnderlineButton>
            <UnderlineButton.ButtonText>폴더 추가</UnderlineButton.ButtonText>
          </UnderlineButton>
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
      </ScrollView>
    </View>
  );
};

export default AlbumTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    position: 'relative',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
});
