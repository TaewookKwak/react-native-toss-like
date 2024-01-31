/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Tabs from '@navigations/tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '@screens/login';
import PostScreens from '@screens/post';
import LetterScreen from '@screens/post/letter';
import PostScreen from '@screens/post/post';
import WriteScreen from '@screens/post/write';
import WelcomePage from '@screens/welcome';
import React, {useState} from 'react';
import {useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

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

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

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
                      component={Tabs}
                      options={{headerShown: false}}
                    />
                  </Stack.Group>
                  <Stack.Group
                    screenOptions={{
                      presentation: 'fullScreenModal',
                      headerShown: false,
                    }}>
                    <Stack.Screen name="PostScreen" component={PostScreen} />
                    <Stack.Screen name="WriteScreen" component={WriteScreen} />
                    <Stack.Screen
                      name="LetterScreen"
                      component={LetterScreen}
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
