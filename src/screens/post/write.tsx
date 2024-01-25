import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '@components/layout/header-component';

type RootStackParamList = {
  WriteScreen: undefined; // 파라미터가 있는 경우 해당 타입을 지정
};

type NavigationProps = NativeStackScreenProps<RootStackParamList>;

const WriteScreen: React.FC<NavigationProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 해더 */}
      <Header title="편지 쓰기" isGoBack={true} />

      <Text>WriteScreen</Text>
    </SafeAreaView>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});
