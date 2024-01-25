import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WriteScreen from './write';
import LetterScreen from './letter';
import PostScreen from '@screens/post/post';

const Stack = createNativeStackNavigator();
const PostScreens = ({}): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="PostScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="WriteScreen" component={WriteScreen} />
      <Stack.Screen name="LetterScreen" component={LetterScreen} />
    </Stack.Navigator>
  );
};

export default PostScreens;
