import {useIsFocused} from '@react-navigation/native';
import {
  Atlas,
  Canvas,
  Skia,
  useImage,
  useRectBuffer,
} from '@shopify/react-native-skia';

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

const FRAME_WIDTH: number = 128;
const FRAME_HEIGHT: number = 128;

export default function JumpSpriteSheet() {
  const isFocused = useIsFocused();
  const counter: SharedValue<number> = useSharedValue(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const spritesMapJump = useImage(
    require('src/assets/images/sprites/Jump.png'),
  );
  const spritesMapAttack1 = useImage(
    require('src/assets/images/sprites/Attack_1.png'),
  );
  const spritesMapAttack2 = useImage(
    require('src/assets/images/sprites/Attack_2.png'),
  );
  const spritesMapAttack3 = useImage(
    require('src/assets/images/sprites/Attack_3.png'),
  );
  const spritesMapDead = useImage(
    require('src/assets/images/sprites/Dead.png'),
  );
  const spritesMapIdle = useImage(
    require('src/assets/images/sprites/Idle.png'),
  );
  const spritesMapRun = useImage(require('src/assets/images/sprites/Run.png'));

  const numberOfSprites = spritesMapJump
    ? Math.floor(spritesMapJump.width() / FRAME_WIDTH)
    : 0; // 스프라이트 이미지의 전체 너비를 프레임 너비로 나누어 프레임 수를 계산합니다

  // useRectBuffer는 스프라이트 이미지의 프레임 수를 받아서 각 프레임의 위치와 크기를 반환합니다. (스프라이트 이미지의 프레임 수, 각 sprite의 위치와 크기를 반환하는 함수)
  const sprites = useRectBuffer(numberOfSprites, (rect, i) => {
    'worklet';
    let nFrame; // 현재 프레임
    if (!counter) {
      nFrame = 0;
    } else {
      nFrame = Math.floor(counter.value);
    }
    rect.setXYWH(FRAME_WIDTH * nFrame, 0, FRAME_WIDTH, FRAME_HEIGHT); // 각 프레임의 위치와 크기를 설정합니다. (x, y, width, height)
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && isFocused) {
      console.log('재생 중');
      interval = setInterval(() => {
        counter.value = (counter.value + 1) % numberOfSprites;
      }, 100);
    }

    return () => {
      if (interval) {
        console.log('정지 중');
        clearInterval(interval);
        // counter.value = 0;
      }
    };
  }, [isFocused, isPlaying]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button
        title={isPlaying ? '정지' : '시작'}
        onPress={() => setIsPlaying(prev => !prev)}
      />
      <Canvas style={{flex: 1}}>
        <Atlas
          image={spritesMapJump}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 0, 0)]}
        />
        {/* <Atlas
          image={spritesMapAttack1}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 120, 0)]}
        />
        <Atlas
          image={spritesMapAttack2}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 240, 0)]}
        />
        <Atlas
          image={spritesMapAttack3}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 0, 120)]}
        />
        <Atlas
          image={spritesMapDead}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 120, 120)]}
        />
        <Atlas
          image={spritesMapIdle}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 240, 120)]}
        />
        <Atlas
          image={spritesMapRun}
          sprites={sprites}
          transforms={[Skia.RSXform(1, 0, 0, 240)]}
        /> */}
      </Canvas>
    </SafeAreaView>
  );
}
