import React, {useState} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from 'src_toss/styles/color';
import {formatAmount} from 'src_toss/utils/common';
import {assetLists, bankInfoList} from 'src_toss/utils/constants';
import useThemeStore from 'src_toss/utils/zustand/themeStore';
import AnimatedButton from '~components/animations/animated-button';
import Item from '~components/items/list';
import IconTextList from '~components/lists/icon-text-list';
import Button from '~components/ui/buttons/button';
import LinkButton from '~components/ui/buttons/link-button';
import LinkCenterButton from '~components/ui/buttons/link-center-button';
import Divider from '~components/ui/dividers/divider';
import Header from '~components/ui/header/header-home';
import Text from '~components/ui/text/text';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';
import {Image} from 'react-native';
import {toss_card} from 'src_toss/utils/icons';
import DdayText from '~components/ui/text/d-day-text';

const wait = (timeout: number) => {
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
        contentContainerStyle={{paddingVertical: 10}}
        refreshControl={
          <RefreshControl
            tintColor={colors[theme].text_title}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {/* 토스뱅크 */}
        <View style={{gap: 10}}>
          <Pressable
            onPressOut={() => {
              setIsBottomSheetOpen(true);
            }}>
            <LinkButton
              text="토스뱅크"
              containerStyle={{
                marginVertical: 12,
                marginHorizontal: 12,
              }}
            />
          </Pressable>

          {/* 내 계좌 미리보기 */}
          <FlatList
            scrollEnabled={false}
            data={bankInfoList}
            contentContainerStyle={{
              backgroundColor: colors[theme].bg_setion,
              borderRadius: 12,
              gap: 10,
              paddingTop: 12,
            }}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <AnimatedButton
                foucsedBackgroundColor={colors[theme].bg_button_focus}>
                <Pressable>
                  <Item key={item?.id} style={{marginHorizontal: 12}}>
                    <Item.Prefix
                      renderPrefix={
                        <Image
                          source={item?.iconName as ImageSourcePropType}
                          style={{width: 24, height: 24}}
                        />
                      }>
                      <Text.Common style={styles.text}>
                        {item?.name}
                      </Text.Common>
                      <Text.Common style={styles.subText}>
                        {formatAmount(item?.amount)}
                      </Text.Common>
                    </Item.Prefix>

                    <Item.Suffix
                      style={{position: 'absolute', right: 12, zIndex: 20}}>
                      <Button
                        text="입금"
                        onPress={() => {
                          console.log('입금');
                        }}
                      />
                    </Item.Suffix>
                  </Item>
                </Pressable>
              </AnimatedButton>
            )}
            ListFooterComponent={
              <>
                <Divider.Horizontal />
                <LinkCenterButton
                  text="내 계좌/대출/증권/포인트 보기"
                  containerStyle={{}}
                />
              </>
            }
          />

          {/* 이번 달 요약 */}
          <View
            style={[
              styles.box,
              {
                backgroundColor: colors[theme].bg_setion,
              },
            ]}>
            <AnimatedButton
              foucsedBackgroundColor={colors[theme].bg_button_focus}>
              <Pressable>
                <Item style={{marginHorizontal: 12}}>
                  <Item.Prefix
                    renderPrefix={
                      <Image
                        source={toss_card}
                        style={{width: 40, height: 40}}
                        resizeMode="contain"
                      />
                    }>
                    <Text.Common style={styles.text}>4월에 쓴 돈</Text.Common>
                    <Text.Common style={styles.subText}>
                      {formatAmount(15000000)}
                    </Text.Common>
                  </Item.Prefix>

                  <Item.Suffix
                    style={{position: 'absolute', right: 12, zIndex: 20}}>
                    <Button
                      text="납부"
                      onPress={() => {
                        console.log('입금');
                      }}
                    />
                  </Item.Suffix>
                </Item>
              </Pressable>
            </AnimatedButton>

            <Divider.Horizontal />

            <AnimatedButton
              foucsedBackgroundColor={colors[theme].bg_button_focus}>
              <Pressable>
                <Item style={{marginHorizontal: 12}}>
                  <Item.Prefix renderPrefix={<DdayText date="2024-05-13" />}>
                    <Text.Common style={styles.text}>
                      4월 25일날 낼 카드 값
                    </Text.Common>
                    <Text.Common style={styles.subText}>
                      {formatAmount(12399000)}
                    </Text.Common>
                  </Item.Prefix>
                </Item>
              </Pressable>
            </AnimatedButton>
          </View>
        </View>

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
            style={{
              paddingHorizontal: 12,
            }}
            renderItem={({item}) => <IconTextList data={item} />}
            keyExtractor={item => item?.id?.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 12,
                  backgroundColor: 'transparent',
                }}
              />
            )}
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
  text: {
    fontSize: 14,
  },
  subText: {
    fontSize: 20,
    fontWeight: '600',
  },
  box: {
    borderRadius: 12,
    gap: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
