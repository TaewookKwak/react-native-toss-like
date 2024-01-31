import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PostScreens from '@screens/post';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconFth from 'react-native-vector-icons/Feather';
import DiaryPage from '../screens/diary';
import HomePage from '../screens/home';
import StoryPage from '../screens/story';
import {useCurrentScreenStore} from 'src/store/currentScreen';
import PostScreen from '@screens/post/post';

const Tab = createBottomTabNavigator();

const Tabs = ({}) => {
  const insets = useSafeAreaInsets(); // safe area insets 값
  const {currentScreen} = useCurrentScreenStore(); // store에서 현재 스크린 불러오기

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...styles.tabBar,
          height: 100 + insets.bottom,
        },
      }}
      // screenOptions={({route}) => {
      //   const isTabBarVisible = currentScreen === 'WriteScreen' ? true : false; // 현재 스크린이 PostScreen이면 탭바 안보이게
      //   return {
      //     tabBarShowLabel: false,
      //     tabBarHideOnKeyboard: true,
      //     tabBarStyle: {
      //       display: isTabBarVisible ? 'none' : 'flex',

      //       ...styles.tabBar,
      //       height: 100 + insets.bottom,
      //     },
      //   };
      // }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          title: '메인',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabBarIconContainer,
                focused && styles.avtiveTabBarIconContainer,
              ]}>
              <IconFth
                name="home"
                size={20}
                color={
                  focused
                    ? styles.activeTabBarText.color
                    : styles.inactiveTabBarText.color
                }
              />
              <Text
                style={[
                  styles.tabBarText,
                  {
                    color: focused
                      ? styles.activeTabBarText.color
                      : styles.inactiveTabBarText.color,
                  },
                ]}>
                메인
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryPage}
        options={{
          headerShown: false,
          title: '스토리',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabBarIconContainer,
                focused && styles.avtiveTabBarIconContainer,
              ]}>
              <IconFth
                name="book"
                size={20}
                color={
                  focused
                    ? styles.activeTabBarText.color
                    : styles.inactiveTabBarText.color
                }
              />
              <Text
                style={[
                  styles.tabBarText,
                  {
                    color: focused
                      ? styles.activeTabBarText.color
                      : styles.inactiveTabBarText.color,
                  },
                ]}>
                스토리
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerShown: false,
          title: '우편함',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabBarIconContainer,
                focused && styles.avtiveTabBarIconContainer,
              ]}>
              <IconFth
                name="mail"
                size={20}
                color={
                  focused
                    ? styles.activeTabBarText.color
                    : styles.inactiveTabBarText.color
                }
              />
              <Text
                style={[
                  styles.tabBarText,
                  {
                    color: focused
                      ? styles.activeTabBarText.color
                      : styles.inactiveTabBarText.color,
                  },
                ]}>
                우편함
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryPage}
        options={{
          headerShown: false,
          title: '다이어리',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabBarIconContainer,
                focused && styles.avtiveTabBarIconContainer,
              ]}>
              <IconFth
                name="feather"
                size={20}
                color={
                  focused
                    ? styles.activeTabBarText.color
                    : styles.inactiveTabBarText.color
                }
              />
              <Text
                style={[
                  styles.tabBarText,
                  {
                    color: focused
                      ? styles.activeTabBarText.color
                      : styles.inactiveTabBarText.color,
                  },
                ]}>
                다이어리
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    // position: 'absolute',
  },
  tabBarText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8B8B8B',
    fontFamily: 'Galmuri7-Regular',
  },
  activeTabBarText: {
    color: '#fff',
  },
  inactiveTabBarText: {
    color: '#8B8B8B',
  },
  tabBarIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e8e8e8',
    backgroundColor: '#fff',
    width: 80,
    height: 72,
  },

  avtiveTabBarIconContainer: {
    borderColor: '#747474',
    backgroundColor: '#2E2E2E',
  },
});
export default Tabs;
