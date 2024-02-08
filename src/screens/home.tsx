import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '../components/ui/bottomsheets/bottomsheet.component';

const HomeScreen = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 여부

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Pressable
        onPress={() => {
          setIsBottomSheetOpen(true);
        }}>
        <Text>바텀 시트 열기</Text>
      </Pressable>

      {/*  바텀 시트 */}
      <BottomSheet isOpen={isBottomSheetOpen} setIsOpen={setIsBottomSheetOpen}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            {Array.from({length: 10}).map((_, index) => (
              <TouchableOpacity style={styles.folderContainer} key={index}>
                <View style={styles.folderImg} />
                <Text style={styles.folderName}>폴더명</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    // 인디케이터 바 아래 컨텐츠 스타일
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 20, // 스크롤바 안으로 들어가는 문제 해결
  },
  folderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 28,
  },
  folderImg: {
    width: 56,
    height: 56,
    backgroundColor: 'lightgrey',
  },
  folderName: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
    letterSpacing: -0.18,
    color: '#171717',
  },
});
