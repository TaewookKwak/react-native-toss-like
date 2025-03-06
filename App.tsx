import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from 'src/navigations/bottom-tab';

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {storage} from './src/utils/mmkv';
import useThemeStore from './src/utils/zustand/themeStore';
import HomePage from '@screens/home';
import SplashScreen from 'react-native-splash-screen';

enableLatestRenderer();

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  Auth: undefined;
  Home: undefined;
};

function App() {
  const {setTheme} = useThemeStore();

  useEffect(() => {
    const _theme = storage.getString('theme');
    setTheme(_theme as 'light' | 'dark');
  }, [setTheme]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
