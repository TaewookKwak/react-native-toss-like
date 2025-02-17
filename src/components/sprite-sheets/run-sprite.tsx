import React from 'react';
import BaseSprite from './base-sprite';
import {useIsFocused} from '@react-navigation/native';

export default function RunSprite({x = 0, y = 0, isFocused = true}) {
  return (
    <BaseSprite
      spritePath={require('src/assets/images/sprites/Run.png')}
      x={x}
      y={y}
      isFocused={isFocused}
    />
  );
}
