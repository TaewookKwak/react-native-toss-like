import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
  BottomSheetHandleProps,
  BottomSheetHandle,
} from '@gorhom/bottom-sheet';

type BottomSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const BottomSheet = ({isOpen, setIsOpen}: BottomSheetProps) => {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 800,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    () => [
      '35%',
      //    '70%',
      // '100%'
    ],
    [],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderHandle = useCallback((props: BottomSheetHandleProps) => {
    return (
      <BottomSheetHandle {...props}>
        <View>
          <Text>dqwd</Text>
        </View>
      </BottomSheetHandle>
    );
  }, []);

  const handlePressOpenModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePressCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    if (isOpen) {
      handlePressOpenModal();
    }
  }, [isOpen, handlePressOpenModal]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints} // 스냅 포인트 : 바텀시트가 열릴 때 높이
      animationConfigs={animationConfigs} // 애니메이션 설정
      style={styles.bottomSheet}
      backgroundStyle={styles.backgroundStyle}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      containerStyle={styles.containerStyle}
      handleComponent={renderHandle} // 핸들 컴포넌트
      backdropComponent={renderBackdrop} // 뒷 배경 컴포넌트
      onChange={handleSheetChanges} // 바텀시트 상태 변화 시
      onDismiss={handlePressCloseModal} // 모달 닫힐 때
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    // backgroundColor: 'black',

    margin: 12,
  },
  backgroundStyle: {
    backgroundColor: 'transparent',
  },
  containerStyle: {
    // backgroundColor: 'pink',
  },
  handleStyle: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  handleIndicatorStyle: {
    backgroundColor: 'grey',
    width: 40,
  },
  contentContainer: {
    backgroundColor: 'blue',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
