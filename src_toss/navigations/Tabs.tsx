import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AllPage from '../screens/all';
import BenefitsPage from '../screens/benefits';
import HomePage from '../screens/home';
import PayPage from '../screens/pay';
import TabBarIcon from './TabBarIcon';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const insets = useSafeAreaInsets(); // safe area insets 값

  const tabs = [
    {
      name: 'Home',
      component: HomePage,
      icon: 'home',
      label: '홈',
    },
    {
      name: 'Benefits',
      component: BenefitsPage,
      icon: 'award',
      label: '혜택',
    },
    {
      name: 'Pay',
      component: PayPage,
      icon: 'briefcase',
      label: '페이',
    },
    {
      name: 'All',
      component: AllPage,
      icon: 'menu',
      label: '전체',
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: insets.bottom + 60,
        },
      }}>
      {tabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              headerShown: false,
              title: tab.label,
              tabBarIcon: props => (
                <TabBarIcon
                  label={tab.label}
                  icon={tab.icon}
                  focused={props.focused}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    elevation: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default Tabs;
