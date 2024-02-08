import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function GrandientWhite() {
  const count = 20;
  return (
    <View>
      {Array(count)
        .fill('')
        .map((_, index) => (
          <View
            style={[styles.gradientEffect1, {height: 50 * (1 / count) * index}]}
            key={index}
          />
        ))}

      <View style={styles.gradientEffect1} />
    </View>
  );
}

const styles = StyleSheet.create({
  gradientEffect1: {
    position: 'absolute',
    height: 50 * 0.1, // 또는 원하는 높이로 설정
    width: '100%',
    bottom: 0,
    backgroundColor: '#ffffff', // 배경색 설정
    opacity: 0.2, // 투명도 설정
  },
});
