import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconFth from 'react-native-vector-icons/Feather';
import HomePage from '../screens/home';
import BenefitsPage from '../screens/benefits';
import PayPage from '../screens/pay';
import AllPage from '../screens/all';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const insets = useSafeAreaInsets(); // safe area insets 값

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 110 + insets.bottom,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          title: '홈',
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
                홈
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Benefits"
        component={BenefitsPage}
        options={{
          headerShown: false,
          title: '혜택',
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
                혜택
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pay"
        component={PayPage}
        options={{
          headerShown: false,
          title: '페이',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabBarIconContainer,
                focused && styles.avtiveTabBarIconContainer,
              ]}>
              <IconFth
                name="life-buoy"
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
                페이
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="All"
        component={AllPage}
        options={{
          headerShown: false,
          title: '전체',
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
                전체
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
    position: 'absolute',
    elevation: 1,
    backgroundColor: 'white',
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
