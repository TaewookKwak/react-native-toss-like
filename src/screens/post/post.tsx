import Alert from '@components/compound-components/alert.compound';
import DotButton from '@components/compound-components/button-dot.compound';
import Header from '@components/layout/header-component';
import LetterPreview from '@components/letter/letter.component';
import ThreeHeartSvg from '@components/svgs/svg-three-hearts.component';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type LetterProp = {
  id: number;
  date: string;
  content: string;
};

const {width: screenWidth} = Dimensions.get('window');

const data: LetterProp[] = [
  {
    id: 1,
    date: '2021/09/01',
    content:
      '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 내가 편지를 쓴 이후에 열람 가능합니다. 상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
  {
    id: 2,
    date: '2021/09/01',
    content: '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다.',
  },
  {
    id: 3,
    date: '2021/09/01',
    content:
      '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 내가 편지를 쓴 이후에 열람 가능합니다. 상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
  {
    id: 4,
    date: '2021/09/01',
    content: '상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
  {
    id: 5,
    date: '2021/09/01',
    content:
      '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 내가 편지를 쓴 이후에 열람 가능합니다. 상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
  {
    id: 6,
    date: '2021/09/01',
    content:
      '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 내가 편지를 쓴 이후에 열람 가능합니다. 상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
  {
    id: 7,
    date: '2021/09/01',
    content:
      '편지 내용입니다. 상대방이 쓴 편지를 볼 수 있습니다. 내가 편지를 쓴 이후에 열람 가능합니다. 상대방이 쓴 편지를 볼 수 있습니다 상대방이 쓴 편지를 볼 수',
  },
];

const PostScreen = ({navigation}) => {
  const handlePressWrite = () => {
    navigation.push('WriteScreen');
  };
  return (
    <SafeAreaView style={[styles.container]}>
      {/* 해더 */}
      <Header title="우편함" />

      {/* 편지쓰기 */}
      <View style={styles.buttonContainer}>
        <DotButton onPress={handlePressWrite}>
          <DotButton.ButtonText>편지 쓰기</DotButton.ButtonText>
        </DotButton>
      </View>

      {/* 편지 리스트 스크롤 */}
      <FlatList
        style={styles.letterList}
        data={data}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{height: 12}} />;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <LetterPreview date={item.date} content={item.content} />;
        }}
      />

      {/* 편지 알림 */}
      <Alert style={styles.alert}>
        <Alert.Dot />
        <Alert.Title>새로운 편지가 도착했어요!</Alert.Title>
        <Alert.Content>
          편지를 쓰면 상대방의 편지를 읽을 수 있어요
        </Alert.Content>
        <Alert.Footer>
          <ThreeHeartSvg fill="#FF8FFA" />
        </Alert.Footer>
      </Alert>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    paddingHorizontal: 20,
  },
  alert: {
    position: 'absolute',
    bottom: 20,
    left: '50%', // 부모 컨테이너의 가운데로 이동
    transform: [{translateX: -(screenWidth - 16) / 2}], // 자신의 너비의 반만큼 왼쪽으로 이동

    width: screenWidth - 8 - 8,
    backgroundColor: '#FFE9FF',
    borderColor: '#FFE9FF',
  },
  header: {
    marginTop: 15,
    marginBottom: 7,
  },
  headerText: {
    color: '#171717',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },

  letterList: {
    flex: 1,
    marginTop: 20,
  },
});

export default PostScreen;
