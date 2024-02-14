import {Appearance, ColorSchemeName} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';

const useColorScheme = (delay = 500): NonNullable<ColorSchemeName> => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const timeout: any = useRef<NodeJS.Timeout | null>(null);

  const resetCurrentTimeout = useCallback(() => {
    if (timeout?.current) {
      clearTimeout(timeout.current);
    }
  }, [timeout]);

  const onColorSchemeChange = useCallback(
    (preferences: Appearance.AppearancePreferences) => {
      resetCurrentTimeout();

      timeout.current = setTimeout(() => {
        console.log('====================================');
        console.log('onColorSchemeChange', preferences.colorScheme);
        console.log('====================================');
        setColorScheme('dark');
      }, delay);
    },
    [delay, resetCurrentTimeout],
  );

  useEffect(() => {
    const AppearanceChange = Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      if (AppearanceChange) {
        AppearanceChange.remove();
      }
    };
  }, [onColorSchemeChange, resetCurrentTimeout]);

  console.log('====================================');
  console.log('useColorScheme', colorScheme);
  console.log('====================================');

  return colorScheme as NonNullable<ColorSchemeName>;
};

export default useColorScheme;
