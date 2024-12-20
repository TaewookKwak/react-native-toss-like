import React, {CSSProperties} from 'react';
import {View} from 'react-native';
import {colors} from 'src_toss/styles/color';
import useThemeStore from 'src_toss/utils/zustand/themeStore';

type DividerProps = {
  style?: CSSProperties | any;
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
          borderBottomColor: colors[theme].lightGray,
          borderBottomWidth: 2,
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
          borderRightColor: colors[theme].lightGray,
          borderRightWidth: 2,
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
