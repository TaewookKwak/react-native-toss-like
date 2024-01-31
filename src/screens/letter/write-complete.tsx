import DotButton from '@components/compound-components/button-dot.compound';
import {BottomTabParamListProps} from '@navigations/tabs';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'App';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

type CompositeNavigationProp = NavigationProp<BottomTabParamListProps>;

export type WriteScreenProps = {
  navigation: CompositeNavigationProp;
  route: RouteProp<RootStackParamList, 'WriteCompleteScreen'>;
};

const WriteCompleteScreen = ({
  navigation,
  route: {
    params: {recipient},
  },
}: WriteScreenProps) => {
  return (
    <SafeAreaView style={[styles.container]}>
      {/* 인사말 */}
      <Text style={[styles.header]}>
        {recipient}님에게 편지를 보냈어요!{'\n'}젤리몽 우체부가 열심히 열심히
        배달할게요~
      </Text>

      {/* 이미지  */}
      <View style={[styles.imageContainer]}>{/* TODO : 이미지 삽입 */}</View>

      {/* 내가 받은 우편함 가기 버톤 */}
      <DotButton
        style={[styles.mailBoxButton]}
        onPress={() => {
          navigation.navigate('LetterBoxScreen');
        }}>
        <DotButton.ButtonText>내가 받은 우편함 가기</DotButton.ButtonText>
      </DotButton>
    </SafeAreaView>
  );
};

export default WriteCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Galmuri11-Regular',
    textAlign: 'center',
    lineHeight: 27,
    letterSpacing: -0.18,
    marginHorizontal: 44,
  },
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9d9d9',
    width: 300,
    height: 300,
    borderRadius: 9999,

    marginTop: 25,
  },
  mailBoxButton: {
    marginHorizontal: 20,
    marginTop: 38,
    alignSelf: 'stretch',
  },
});
