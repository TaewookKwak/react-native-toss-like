import Header from '@components/layout/header-component';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type RootStackParamList = {
  WriteScreen: undefined; // 파라미터가 있는 경우 해당 타입을 지정
};

type NavigationProps = NativeStackScreenProps<RootStackParamList>;

type LetterColorPalatteProps = {
  color: string;
  id: number;
};

const {width: screenWidth} = Dimensions.get('window');

const WriteScreen: React.FC<NavigationProps> = ({navigation}) => {
  const letterColorPalatte: LetterColorPalatteProps[] = [
    {
      color: '#4b4a47',
      id: 1,
    },
    {
      color: '#FFA500',
      id: 2,
    },
    {
      color: '#FF6F00',
      id: 3,
    },
    {
      color: '#FF0000',
      id: 4,
    },
    {
      color: '#FF00FF',
      id: 5,
    },
    {
      color: '#0000FF',
      id: 6,
    },
    {
      color: '#00FFFF',
      id: 7,
    },
    {
      color: '#00FF00',
      id: 8,
    },
    {
      color: '#000000',
      id: 9,
    },
  ];

  const [selectedColor, setSelectedColor] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      {/* 해더 */}
      <Header title="편지 쓰기" isGoBack={true} />

      <View style={styles.wrapper}>
        {/* 제목 */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>편지를 쓸 편지지를 골라보세요!</Text>
        </View>

        {/* 편지 색상 팔레트 */}
        <View style={styles.paletteContainer}>
          {letterColorPalatte.map(item => (
            <Pressable
              onPress={() => {
                setSelectedColor(item.id);
              }}
              key={item.id}>
              <View
                style={[
                  styles.paletteItem,
                  {
                    backgroundColor: item.color,
                    opacity: selectedColor === item.id ? 1 : 0.3,
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    color: '#000',
    fontFamily: 'Galmuri11-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 27,
    letterSpacing: -0.18,
    textAlign: 'center',
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  paletteItem: {
    width: screenWidth / 3 - 20,
    height: 135,
  },
});
