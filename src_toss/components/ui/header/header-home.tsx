import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet, Switch, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import AnimatedButtonIcon from '~components/animations/animated-button-icon';
import Text from '../text/text';
import {BlurView} from '@react-native-community/blur';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();
  const {theme, setTheme} = useThemeStore();
  const [height, setHeight] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };
  return (
    <>
      <View
        onLayout={handleLayout}
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
        ]}>
        <Text.Common style={{...styles.logo, color: colors[theme].primary}}>
          toss
        </Text.Common>
        <View style={[styles.icons]}>
          <Switch
            trackColor={{
              false: colors[theme].primary,
              true: colors[theme].primary,
            }}
            ios_backgroundColor={colors[theme].primary}
            thumbColor={theme === 'dark' ? 'black' : 'white'}
            onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            value={theme === 'dark' ? true : false}
          />
          <AnimatedButtonIcon>
            <IonIcon
              name="location-sharp"
              size={30}
              color={colors[theme].lightSlate}
            />
          </AnimatedButtonIcon>
          <AnimatedButtonIcon>
            <IonIcon
              name="notifications"
              size={30}
              color={colors[theme].lightSlate}
            />
          </AnimatedButtonIcon>
        </View>
      </View>
      <BlurView
        style={[
          styles.blurview,
          {
            height: height,
          },
        ]}
        blurType={theme}
        blurAmount={10}
        reducedTransparencyFallbackColor={theme}
      />
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 10,

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  blurview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 0,
    // padding: 0,
  },
});
