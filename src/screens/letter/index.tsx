import {useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from '@screens/letter/letterbox';
import {useCurrentScreenStore} from 'src/store/currentScreen';
import LetterScreen from './letter';
import WriteScreen from './write';

const Stack = createNativeStackNavigator();
const PostScreens = ({}): React.JSX.Element => {
  const routeName = useNavigationState(state => state.routes[state.index].name);
  const {setCurrentScreen} = useCurrentScreenStore(); // store에 현재 스크린 이름 저장

  return (
    <Stack.Navigator
      initialRouteName="PostScreen"
      screenOptions={({route}) => {
        return {
          headerShown: false,
          contentStyle: {backgroundColor: '#fff'}, // 배경색 안넣어주면 margin 값에 따라서 원래 배경색 들어감
        };
      }}>
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="WriteScreen" component={WriteScreen} />
        <Stack.Screen name="LetterScreen" component={LetterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PostScreens;
