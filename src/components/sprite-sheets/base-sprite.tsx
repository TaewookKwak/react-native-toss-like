import {Atlas, Skia, useImage, useRectBuffer} from '@shopify/react-native-skia';
import React, {useEffect, useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

const FRAME_WIDTH: number = 128;
const FRAME_HEIGHT: number = 128;

interface BaseSpriteProps {
  spritePath: any;
  x?: number;
  y?: number;
  isFocused?: boolean;
}

export default function BaseSprite({
  spritePath,
  x = 0,
  y = 0,
  isFocused = true,
}: BaseSpriteProps) {
  const counter: SharedValue<number> = useSharedValue(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const spriteMap = useImage(spritePath);

  const numberOfSprites = spriteMap
    ? Math.floor(spriteMap.width() / FRAME_WIDTH)
    : 0;

  const sprites = useRectBuffer(numberOfSprites, (rect, _i) => {
    'worklet';
    let nFrame = !counter ? 0 : Math.floor(counter.value);
    rect.setXYWH(FRAME_WIDTH * nFrame, 0, FRAME_WIDTH, FRAME_HEIGHT);
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && isFocused) {
      interval = setInterval(() => {
        counter.value = (counter.value + 1) % numberOfSprites;
      }, 100);
    }

    return () => {
      if (interval) {
        console.log('정지 중');
        clearInterval(interval);
      }
    };
  }, [isFocused, isPlaying, counter, numberOfSprites]);

  console.log(numberOfSprites);

  return (
    <Atlas
      image={spriteMap}
      sprites={sprites}
      transforms={[Skia.RSXform(1, 0, x, y)]}
    />
  );
}
