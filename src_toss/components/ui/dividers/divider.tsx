import React from 'react';
import {StyleProp, View, ViewProps} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type DividerProps = {
  style?: StyleProp<ViewProps>;
};

const Divider = () => {
  return null;
};

const Horizontal = ({style}: DividerProps) => {
  const {theme} = useThemeStore();
  return (
    <View
      style={[
        {
          borderBottomColor: colors[theme].divider,
          borderBottomWidth: 1,
          alignSelf: 'stretch',
        },
        style,
      ]}
    />
  );
};

const Vertical = ({style}: DividerProps) => {
  const {theme} = useThemeStore();
  return (
    <View
      style={[
        {
          borderRightColor: colors[theme].divider,
          borderRightWidth: 1,
          alignSelf: 'stretch',
        },
        style,
      ]}
    />
  );
};

Divider.Horizontal = Horizontal;
Divider.Vertical = Vertical;

export default Divider;
