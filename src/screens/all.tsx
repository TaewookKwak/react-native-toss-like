import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import {Canvas} from '@shopify/react-native-skia';
import JumpSprite from '@components/sprite-sheets/jump-sprite';
import RunSprite from '@components/sprite-sheets/run-sprite';
import AttackSprite from '@components/sprite-sheets/attack-sprite';
import {colors} from 'src/styles/color';
import useThemeStore from 'src/utils/zustand/themeStore';
import {useIsFocused} from '@react-navigation/native';

const AllPage = () => {
  const {theme} = useThemeStore();
  const isFocused = useIsFocused();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors[theme].lightGray}}>
      <Canvas style={{flex: 1}}>
        <JumpSprite x={0} y={0} isFocused={isFocused} />
        <RunSprite x={0} y={120} isFocused={isFocused} />
        <AttackSprite x={0} y={240} isFocused={isFocused} />
      </Canvas>
    </SafeAreaView>
  );
};

export default AllPage;
