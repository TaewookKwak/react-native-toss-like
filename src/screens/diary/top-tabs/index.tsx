import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import StoryTab from './tab-story';
import AlbumTab from './tab-album';
import DiaryViewHeader from '@components/diary-view-header/diary-view-header';

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Story"
      tabBar={props => <DiaryViewHeader {...props} />}>
      <Tab.Screen name="Story" component={StoryTab} />
      <Tab.Screen name="Album" component={AlbumTab} />
    </Tab.Navigator>
  );
};

export default TopTabs;

const styles = StyleSheet.create({});
