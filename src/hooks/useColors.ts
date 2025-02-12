import {useColorScheme} from 'react-native';
import {dark, light} from 'src/styles/color';

export function useColors() {
  const colorTheme = useColorScheme();

  return colorTheme === 'dark' ? dark : light;
}
