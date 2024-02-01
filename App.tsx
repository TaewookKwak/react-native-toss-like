/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Tabs from '@navigations/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopTabs from '@screens/diary/top-tabs';
import LetterScreen from '@screens/letter/letter';
import WriteScreen from '@screens/letter/write';
import WriteCompleteScreen from '@screens/letter/write-complete';
import LoginPage from '@screens/login';
import WelcomePage from '@screens/welcome';
import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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

// const MainGroup: StackGroupProps[] = [
//   {
//     name: 'LetterBoxScreen',
//     component: LetterBoxScreen,
//   },
//   {
//     name: 'DiaryScreen',
//     component: DiaryScreen,
//   },
//   {
//     name: 'StroyScreen',
//     component: StoryScreen,
//   },
//   {
//     name: 'HomeScreen',
//     component: HomeScreen,
//   },
// ];

const PostModalGroup: StackGroupProps[] = [
  {
    name: 'WriteScreen',
    component: WriteScreen,
  },
  {
    name: 'LetterScreen',
    component: LetterScreen,
  },
  {
    name: 'WriteCompleteScreen',
    component: WriteCompleteScreen,
  },
];

function App() {
  const [isLoggedIn] = useState(true);

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
                      options={{
                        headerShown: false,
                      }}
                    />
                  </Stack.Group>

                  <Stack.Group
                    screenOptions={{
                      presentation: 'fullScreenModal',
                      headerShown: false,
                    }}>
                    {PostModalGroup.map(item => (
                      <Stack.Screen
                        key={item.name}
                        name={item.name}
                        component={item.component}
                      />
                    ))}
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
