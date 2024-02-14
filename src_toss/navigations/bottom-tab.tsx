import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AllPage from '../screens/all';
import BenefitsPage from '../screens/benefits';
import HomePage from '../screens/home';
import PayPage from '../screens/pay';
import TabBarIcon from './bottom-tab-icon';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import {colors} from 'src_toss/styles/color';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets(); // safe area insets 값

  //house, piggy-bank,medal,credit-card,bars
  const tabs = [
    {
      name: 'Home',
      component: HomePage,
      icon: 'house',
      label: '홈',
    },
    {
      name: 'Benefits',
      component: BenefitsPage,
      icon: 'piggy-bank',
      label: '혜택',
    },
    {
      name: 'Pay',
      component: PayPage,
      icon: 'credit-card',
      label: '페이',
    },
    {
      name: 'All',
      component: AllPage,
      icon: 'bars',
      label: '전체',
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: insets.bottom + 60,
          backgroundColor: colors[theme].bg_bottom_tab,
          borderColor: colors[theme].bg_bottom_tab,
          borderTopColor: colors[theme].bg_bottom_tab,
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

export default Tabs;
