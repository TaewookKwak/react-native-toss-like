import DotButton from '@components/compound-components/button-dot.compound';
import Header from '@components/layout/header-component';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from 'App';
import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type WriteScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

type LetterColorPalatteProps = {
  color: string;
  id: number;
};

const {width: screenWidth} = Dimensions.get('window');

const WriteScreen: React.FC<WriteScreenProps> = ({navigation}) => {
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
  const [component, setComponent] = useState(0); // 0 : 팔레트, 1 : 편지 쓰기

  return (
    <SafeAreaView style={styles.container}>
      {/* 해더 */}
      <Header title="편지 쓰기" isGoBack={true} />

      {/* 편지지 색상 팔레트 */}
      {component === 0 ? (
        <PalatteComponent
          letterColorPalatte={letterColorPalatte}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          setComponent={setComponent}
          navigation={navigation}
        />
      ) : (
        <LetterWritingComponent navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

type PalatteComponentProps = {
  letterColorPalatte: LetterColorPalatteProps[];
  selectedColor: number;
  setSelectedColor: (id: number) => void;
  setComponent: (id: number) => void;
  navigation: NavigationProp<RootStackParamList>;
};

// wrapper 컴포넌트 분리
const PalatteComponent = ({
  letterColorPalatte,
  selectedColor,
  setSelectedColor,
  setComponent,
}: PalatteComponentProps) => {
  return (
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

      {/* 편지 쓰러가기 버톤 */}
      <View>
        <Pressable
          onPress={() => {
            setComponent(1);
          }}>
          <Text>편지 쓰러가기</Text>
        </Pressable>
      </View>
    </View>
  );
};

type LetterWritingComponentProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const LetterWritingComponent = ({navigation}: LetterWritingComponentProps) => {
  const [text, setText] = useState('');
  const maxLength = 1000;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={styles.avoid}
      keyboardVerticalOffset={0}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          editable
          multiline
          textAlignVertical="top"
          onChangeText={newText => setText(newText)}
          value={text}
          maxLength={maxLength}
          autoFocus={true}
        />
        <View style={styles.counterContainer}>
          <Text style={styles.counter}>{`${text.length}/${maxLength}`}</Text>
        </View>

        <DotButton
          style={{width: '100%'}}
          onPress={() => {
            navigation.navigate('WriteCompleteScreen', {
              recipient: '안지은',
            });
          }}>
          <DotButton.ButtonText>Send</DotButton.ButtonText>
        </DotButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  // 메인
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  // 팔레트 컴포넌트
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

  // 편지 쓰기 컴포넌트
  inputContainer: {
    // maxHeight: 500,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    maxHeight: 0,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  counterContainer: {
    alignSelf: 'stretch',
  },
  counter: {
    textAlign: 'right',
    marginTop: 4,
  },
  avoid: {
    flex: 1,
  },
});
