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
import {colors} from 'src/styles/color';
import {formatAmount, getToday} from 'src/utils/common';
import {
  assetLists,
  bankInfoList,
  bankServiceList,
  etcServiceList,
} from 'src/utils/constants';
import useThemeStore from 'src/utils/zustand/themeStore';
import AnimatedButton from 'src/components/animations/animated-button';
import Item from 'src/components/items/list';
import IconTextList from 'src/components/lists/icon-text-list';
import Button from 'src/components/ui/buttons/button';
import LinkButton from 'src/components/ui/buttons/link-button';
import LinkCenterButton from 'src/components/ui/buttons/link-center-button';
import Divider from 'src/components/ui/dividers/divider';
import Header from 'src/components/ui/header/header-home';
import Text from 'src/components/ui/text/text';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';
import {Image} from 'react-native';
import {toss_card} from 'src/utils/icons';
import DdayText from 'src/components/ui/text/d-day-text';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 여부
  const {theme} = useThemeStore();
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
        {backgroundColor: colors[theme].lightGray, paddingTop: insets.top + 50},
      ]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            tintColor={colors[theme].darkSlate}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.mainContent}>
          <Pressable onPressOut={() => setIsBottomSheetOpen(true)}>
            <LinkButton
              text="토스뱅크"
              textStyle={styles.bankLinkText}
              containerStyle={styles.bankLinkButton}
            />
          </Pressable>

          <FlatList
            scrollEnabled={false}
            data={bankInfoList}
            contentContainerStyle={[
              styles.accountList,
              {backgroundColor: colors[theme].white},
            ]}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <AnimatedButton foucsedBackgroundColor={colors[theme].mediumGray}>
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
                        {formatAmount(item?.amount)}
                      </Text.Common>
                      <Text.Common
                        style={[
                          styles.subText,
                          {
                            color: colors[theme].slateGray,
                          },
                        ]}>
                        {item?.name}
                      </Text.Common>
                    </Item.Prefix>

                    <Item.Suffix>
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
                <Divider.Horizontal style={{marginHorizontal: 24}} />
                <Pressable>
                  <LinkCenterButton text="내 계좌/대출/증권/포인트 보기" />
                </Pressable>
              </>
            }
          />

          <View
            style={[
              styles.monthSummaryContainer,
              {backgroundColor: colors[theme].white},
            ]}>
            <AnimatedButton foucsedBackgroundColor={colors[theme].mediumGray}>
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

            <Divider.Horizontal style={{marginHorizontal: 24}} />

            <AnimatedButton foucsedBackgroundColor={colors[theme].mediumGray}>
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

          <FlatList
            contentContainerStyle={[
              styles.serviceGrid,
              {backgroundColor: colors[theme].white},
            ]}
            data={bankServiceList}
            horizontal={true}
            scrollEnabled={false}
            renderItem={({item}) => (
              <AnimatedButton
                key={item?.id}
                foucsedBackgroundColor={colors[theme].mediumGray}>
                <Pressable style={styles.serviceGridItem}>
                  <Text.Common
                    style={[
                      styles.serviceGridText,
                      {color: colors[theme].slateGray},
                    ]}>
                    {item?.name}
                  </Text.Common>
                </Pressable>
              </AnimatedButton>
            )}
            keyExtractor={item => item?.id?.toString()}
            ItemSeparatorComponent={() => (
              <Divider.Vertical style={{marginVertical: 12}} />
            )}
          />

          <FlatList
            scrollEnabled={false}
            data={etcServiceList}
            contentContainerStyle={[
              styles.recommendationContainer,
              {backgroundColor: colors[theme].white},
            ]}
            ListHeaderComponent={
              <Item style={styles.recommendationHeader}>
                <Item.Prefix>
                  <Text.Common style={styles.dateLabel}>
                    {getToday()}
                  </Text.Common>
                  <Text.Common style={styles.welcomeText}>
                    곽태욱님을 위해 준비했어요
                  </Text.Common>
                </Item.Prefix>
              </Item>
            }
            renderItem={({item}) => (
              <LinkButton
                text={item?.name}
                image={item?.iconName as ImageSourcePropType}
                textStyle={{fontSize: 18, fontWeight: '400'}}
                containerStyle={{}}
              />
            )}
            ListFooterComponent={
              <>
                <Divider.Horizontal style={{marginHorizontal: 24}} />
                <Pressable>
                  <LinkCenterButton text="추천 서비스 더보기" />
                </Pressable>
              </>
            }
          />
        </View>

        <BottomSheet
          isOpen={isBottomSheetOpen}
          setIsOpen={setIsBottomSheetOpen}
          snapPoint={['70%']}>
          <Text.Common
            style={[styles.bottomSheetTitle, {color: colors[theme].darkSlate}]}>
            자산 추가
          </Text.Common>
          <FlatList
            data={assetLists}
            style={styles.assetListContainer}
            renderItem={({item}) => <IconTextList data={item} />}
            keyExtractor={item => item?.id?.toString()}
          />
        </BottomSheet>
      </ScrollView>

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
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 70,
  },
  mainContent: {
    gap: 10,
  },
  bankLinkButton: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
  bankLinkText: {
    fontSize: 16,
    fontWeight: '600',
  },
  accountList: {
    borderRadius: 12,
    gap: 10,
    paddingTop: 12,
  },
  monthSummaryContainer: {
    borderRadius: 12,
    gap: 10,
    paddingVertical: 12,
  },
  serviceGrid: {
    borderRadius: 12,
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  serviceGridItem: {
    marginVertical: 20,
    marginHorizontal: 36,
  },
  serviceGridText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationContainer: {
    borderRadius: 12,
    gap: 10,
    paddingVertical: 12,
  },
  recommendationHeader: {
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  assetListContainer: {
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
  },
});
