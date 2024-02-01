import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/layout/header-component';

const LetterScreen = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.wrapper}>
        {/* 해더 */}
        <Header title="우편함" isGoBack={true} />

        {/* 날짜 */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>2020/10/10</Text>
        </View>

        {/* 편지내용 */}
        <ScrollView style={[styles.letterContainer]}>
          <Text style={styles.letterText}>
            편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정
            길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수
            있습니다. 편지 내용이 일정 길이 이상일 시에는... 편지 내용입니다.
            상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일
            시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지
            내용이 일정 길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴
            편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일 시에는.. 편지
            내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이
            이상일 시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다.
            편지 내용이 일정 길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴
            편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일 시에는... 편지
            내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이
            이상일 시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다.
            편지 내용이 일정 길이 이상일 시에는.... 상대방이 쓴 편지를 볼 수
            있습니다. 편지 내용이 일정 길이 이상일 시에는... 편지 내용입니다.
            상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일
            시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지
            내용이 일정 길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴
            편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일 시에는... 편지
            내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이
            이상일 시에는....상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정
            길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수
            있습니다. 편지 내용이 일정 길이 이상일 시에는... 편지 내용입니다.
            상대방이 쓴 편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일
            시에는... 편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 편지
            내용이 일정 길이 이상일 시에는... 편지 내용입니다. 상대방이 쓴
            편지를 볼 수 있습니다. 편지 내용이 일정 길이 이상일 시에는....
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LetterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  wrapper: {
    marginHorizontal: 20,
    flex: 1,
  },
  dateContainer: {
    marginTop: 20,
    paddingHorizontal: 7,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#B9B9B9',
    backgroundColor: '#F3F3F3',
  },
  dateText: {
    color: '#454545',
    fontFamily: 'Galmuri9-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.15,
    alignSelf: 'center',
  },
  letterContainer: {
    flex: 1,
  },
  letterText: {
    color: '#171717',
    fontFamily: 'Galmuri11-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.16,
    backgroundColor: 'rgba(255, 214, 0, 0.30)',
    marginTop: 20,
    padding: 15,
    paddingRight: 11,
  },
});
