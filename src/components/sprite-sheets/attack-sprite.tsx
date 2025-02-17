import React from 'react';
import BaseSprite from './base-sprite';

export default function AttackSprite({x = 0, y = 0, isFocused = true}) {
  return (
    <BaseSprite
      spritePath={require('src/assets/images/sprites/Attack_1.png')}
      x={x}
      y={y}
      isFocused={isFocused}
    />
  );
}
