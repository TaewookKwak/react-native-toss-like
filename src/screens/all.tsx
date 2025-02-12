import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Canvas, Circle, Group} from '@shopify/react-native-skia';
import {colors} from 'src/styles/color';
import useThemeStore from 'src/utils/zustand/themeStore';

const AllPage = () => {
  const {theme} = useThemeStore();
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  return (
    <SafeAreaView style={{backgroundColor: colors[theme].lightGray}}>
      <Text>AllPage</Text>
      <Canvas style={{width, height}}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>
    </SafeAreaView>
  );
};

export default AllPage;

const styles = StyleSheet.create({});
