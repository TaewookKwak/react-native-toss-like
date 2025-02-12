import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TossTabs from 'src/navigations/bottom-tab';

import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginPage from '@screens/login';
import WelcomePage from '@screens/welcome';
import {storage} from '@utils/mmkv';
import useThemeStore from '@utils/zustand/themeStore';

enableLatestRenderer();

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  WriteCompleteScreen: {recipient: string};
  WriteScreen: undefined;
  LetterScreen: undefined;
  Login: undefined;
  Welcome: undefined;
  DiaryScreen: undefined;
  StroyScreen: undefined;
  HomeScreen: undefined;
  Tabs: undefined;
  Auth: undefined;
  ModalSelectPhoto: undefined;
  WriteFeedScreen: undefined;
};

type StackGroupProps = {
  name: keyof RootStackParamList;
  component: React.FC<any>;
};

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

function App() {
  const [isLoggedIn] = useState(true);
  const {setTheme} = useThemeStore();

  useEffect(() => {
    const _theme = storage.getString('theme');
    setTheme(_theme as 'light' | 'dark');
  }, [setTheme]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              {isLoggedIn ? (
                // Screens for logged in users
                <>
                  <Stack.Group>
                    <Stack.Screen
                      name="Tabs"
                      component={TossTabs}
                      options={{
                        headerShown: false,
                      }}
                    />
                  </Stack.Group>
                </>
              ) : (
                // Auth screens
                <Stack.Group>
                  <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{headerShown: false}}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
