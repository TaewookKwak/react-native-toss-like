import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import GrandientWhite from '../gradients/gradient-white';

type BottomSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

const BottomSheet = ({isOpen, setIsOpen, children}: BottomSheetProps) => {
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
      enableContentPanningGesture={false} // 스크롤 다운 가능하게 할 수 있음
      style={styles.bottomSheet}
      backgroundStyle={styles.backgroundStyle}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      containerStyle={styles.containerStyle}
      // handleComponent={renderHandle} // 핸들 컴포넌트
      backdropComponent={renderBackdrop} // 뒷 배경 컴포넌트
      onChange={handleSheetChanges} // 바텀시트 상태 변화 시
      onDismiss={handlePressCloseModal} // 모달 닫힐 때
    >
      {children}
      <GrandientWhite />
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'relative',
    margin: 12,
    borderColor: '#171717',
    borderWidth: 2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    // 포그라운드 스타일
    backgroundColor: 'transparent',
  },
  containerStyle: {
    // 백그라운드 스타일
  },
  handleStyle: {
    // 핸들 스타일
    backgroundColor: 'transparent',
    height: 40,
  },
  handleIndicatorStyle: {
    // 핸들 인디케이터 바 스타일
    display: 'none',
  },
});
