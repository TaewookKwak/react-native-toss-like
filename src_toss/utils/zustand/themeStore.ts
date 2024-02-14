import {Appearance} from 'react-native';
import {create} from 'zustand';
import {storage} from '../mmkv';

type ThemeProp = 'light' | 'dark';

type ThemeStoreProps = {
  theme: ThemeProp;
  setTheme: (theme: ThemeProp) => void;
};

const useThemeStore = create<ThemeStoreProps>(set => ({
  theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  setTheme: theme => {
    set({theme});
    storage.set('theme', theme);
  },
}));

export default useThemeStore;
