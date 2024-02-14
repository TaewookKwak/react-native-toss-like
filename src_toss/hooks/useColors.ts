import {useColorScheme} from 'react-native';
import {dark, light} from 'src_toss/styles/color';

export function useColors() {
  const colorTheme = useColorScheme();

  return colorTheme === 'dark' ? dark : light;
}
