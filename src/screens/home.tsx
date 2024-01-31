import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
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
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
