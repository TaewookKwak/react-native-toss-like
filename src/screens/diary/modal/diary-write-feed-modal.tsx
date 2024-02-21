import DotButton from '@components/compound-components/button-dot.compound';
import Text from '@components/ui/text/text';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const maxLength = 1000; // 최대 글자 수

const DiaryWriteFeedScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        style={styles.container}
        keyboardVerticalOffset={0}>
        <View style={styles.bodyContainer}>
          {/* 피드 입력 창 */}
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
          </View>

          {/* 글자 수 */}
          <View style={styles.counterContainer}>
            <Text.Common
              style={
                styles.counter
              }>{`${text.length}/${maxLength}`}</Text.Common>
          </View>

          {/* 위치 입력 창 */}
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ModalSelectLocation');
              }}>
              <Text.Common>위치 입력</Text.Common>
            </TouchableOpacity>
          </View>

          {/* 작성 버튼 */}
          <View style={{marginTop: 20}}>
            <DotButton onPress={() => {}}>
              <DotButton.ButtonText>피드 작성</DotButton.ButtonText>
            </DotButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DiaryWriteFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // 편지 쓰기 컴포넌트
  inputContainer: {
    flex: 1,
    marginTop: 20,
    maxHeight: 400,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  counterContainer: {
    marginTop: 4,
    alignSelf: 'stretch',
  },
  counter: {
    fontSize: 14,
    fontFamily: 'Galmuri9-Regular',
    textAlign: 'right',
  },
});
