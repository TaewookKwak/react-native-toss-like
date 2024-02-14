import React, {useState} from 'react';
import {Pressable, StyleSheet, Switch, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {assetLists} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';

import IconTextList from '~components/lists/icon-text-list';
import {colors} from 'src_toss/styles/color';
const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 여부

  const {theme, setTheme} = useThemeStore();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors[theme].bg}]}>
      <Text>HomePage</Text>
      <Pressable
        onPress={() => {
          setIsBottomSheetOpen(true);
        }}>
        <Text>바텀 시트 열기</Text>
      </Pressable>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
        snapPoint={['70%']}>
        {/* 타이블 / 아이콘 + 텍스트 */}
        <Text
          style={{
            color: colors[theme].text_title,
            fontSize: 20,
            fontWeight: '700',
            paddingHorizontal: 24,
            paddingBottom: 30,
          }}>
          자산 추가
        </Text>
        {assetLists.map(asset => {
          return <IconTextList data={asset} key={asset.id} />;
        })}
      </BottomSheet>
      {/* 다크모드 토글 버튼 */}
      <Switch
        trackColor={{false: '#d8d521', true: '#aaaaaa'}}
        ios_backgroundColor="#d8d521"
        thumbColor={theme === 'dark' ? 'black' : 'white'}
        onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        value={theme === 'dark' ? true : false}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
