import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from 'src_toss/styles/color';
import {assetLists} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import IconTextList from '~components/lists/icon-text-list';
import LinkButton from '~components/ui/buttons/link-button';
import Header from '~components/ui/header/header-home';
import Text from '~components/ui/text/text';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 여부
  const {theme, setTheme} = useThemeStore();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (refreshing) {
    // 스피너 돌아가게
    <View>
      <Text.Common>로딩중</Text.Common>
    </View>;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors[theme].bg, paddingTop: insets.top + 50},
      ]}>
      <ScrollView
        contentContainerStyle={{}}
        refreshControl={
          <RefreshControl
            tintColor={colors[theme].text_title}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Pressable
          onPress={() => {
            setIsBottomSheetOpen(true);
          }}>
          <Text.Common>바텀 시트 열기</Text.Common>
        </Pressable>

        <Switch
          trackColor={{false: '#d8d521', true: '#aaaaaa'}}
          ios_backgroundColor="#d8d521"
          thumbColor={theme === 'dark' ? 'black' : 'white'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          value={theme === 'dark' ? true : false}
        />

        <View style={{gap: 10}}>
          <Pressable
            onPressOut={() => {
              console.log('클릭!');
            }}>
            <LinkButton
              text="토스뱅크"
              containerStyle={{
                marginVertical: 12,
                marginHorizontal: 12,
              }}
            />
          </Pressable>

          <View
            style={{
              backgroundColor: colors[theme].bg_setion,
              height: 200,
              borderRadius: 12,
            }}
          />
        </View>

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
    paddingHorizontal: 12,
  },
  blurview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
