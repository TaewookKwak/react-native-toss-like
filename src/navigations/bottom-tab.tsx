import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AllPage from '../screens/all';
import BenefitsPage from '../screens/benefits';
import HomePage from '../screens/home';
import PayPage from '../screens/pay';
import {colors} from '../styles/color';
import useThemeStore from '../utils/zustand/themeStore';
import TabBarIcon from './bottom-tab-icon';

type Tab = {
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  label: string;
};

const Tab = createBottomTabNavigator();

const tabs: Tab[] = [
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

const renderTabBarIcon = (label: string, icon: string, focused: boolean) => (
  <TabBarIcon label={label} icon={icon} focused={focused} />
);

const Tabs = () => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: insets.bottom + 60,
          backgroundColor: colors?.[theme]?.white,
          borderColor: colors?.[theme]?.white,
          borderTopColor: colors?.[theme]?.white,
        },
      }}>
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            lazy: true,
            headerShown: false,
            title: tab.label,
            tabBarIcon: props =>
              renderTabBarIcon(tab.label, tab.icon, props.focused),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    elevation: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Tabs;
