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
        contentStyle: {backgroundColor: '#fff'}, // 배경색 안넣어주면 margin 값에 따라서 원래 배경색 들어감
      }}>
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="WriteScreen" component={WriteScreen} />
      <Stack.Screen name="LetterScreen" component={LetterScreen} />
    </Stack.Navigator>
  );
};

export default PostScreens;
