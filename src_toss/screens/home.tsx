import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {assetLists} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';
import IconTextList from '~components/lists/icon-text-list';
import {colors} from 'src_toss/styles/color';
import Header from '~components/ui/header/header-home';
import Text from '~components/ui/text/text';
import {BlurView} from '@react-native-community/blur';

const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 여부
  const {theme, setTheme} = useThemeStore();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {backgroundColor: colors[theme].bg}]}>
      <ScrollView contentContainerStyle={{paddingTop: insets.top + 50}}>
        <Pressable
          onPress={() => {
            setIsBottomSheetOpen(true);
          }}>
          <Text.Common>바텀 시트 열기</Text.Common>
        </Pressable>

        {/* 다크모드 토글 버튼 */}
        <Switch
          trackColor={{false: '#d8d521', true: '#aaaaaa'}}
          ios_backgroundColor="#d8d521"
          thumbColor={theme === 'dark' ? 'black' : 'white'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          value={theme === 'dark' ? true : false}
        />

        <View style={{flex: 1, height: 100, backgroundColor: 'lightred'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightblue'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightred'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightgreen'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightgrey'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightpink'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightgreen'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightgrey'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'lightpink'}} />

        {/* 바텀시트 */}
        <BottomSheet
          isOpen={isBottomSheetOpen}
          setIsOpen={setIsBottomSheetOpen}
          snapPoint={['70%']}>
          <Text.Common
            style={{
              color: colors[theme].text_title,
              fontSize: 20,
              fontWeight: '700',
              paddingHorizontal: 24,
              paddingBottom: 30,
            }}>
            자산 추가
          </Text.Common>
          <FlatList
            data={assetLists}
            renderItem={({item}) => <IconTextList data={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </BottomSheet>
      </ScrollView>

      {/* 해더 blur 처리 때문에 뒤로 위치 */}
      <Header />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
