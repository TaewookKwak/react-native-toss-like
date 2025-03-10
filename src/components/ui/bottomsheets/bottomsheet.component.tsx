import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'src/styles/color';
import {StyleProps} from 'src/types/types';
import useThemeStore from 'src/utils/zustand/themeStore';
import GrandientWhite from '../gradients/gradient-white';

type BottomSheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  snapPoint?: string[];
};

const BottomSheet = ({
  isOpen,
  setIsOpen,
  children,
  snapPoint = ['35%'],
}: BottomSheetProps) => {
  const {theme} = useThemeStore();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 800,
  });

  const stylesT = React.useMemo(() => styles(colors[theme]), [theme]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
      snapPoints={snapPoint} // 스냅 포인트 : 바텀시트가 열릴 때 높이
      animationConfigs={animationConfigs} // 애니메이션 설정
      enableContentPanningGesture={false} // 스크롤 다운 가능하게 할 수 있음
      style={stylesT.bottomSheet}
      backgroundStyle={stylesT.backgroundStyle}
      handleStyle={stylesT.handleStyle}
      handleIndicatorStyle={stylesT.handleIndicatorStyle}
      containerStyle={stylesT.containerStyle}
      // handleComponent={renderHandle} // 핸들 컴포넌트
      backdropComponent={renderBackdrop} // 뒷 배경 컴포넌트
      onChange={handleSheetChanges} // 바텀시트 상태 변화 시
      onDismiss={handlePressCloseModal} // 모달 닫힐 때
    >
      {children}
      <View
        style={{
          marginBottom: 30,
        }}
      />
      <GrandientWhite />
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = (theme: StyleProps) =>
  StyleSheet.create({
    bottomSheet: {
      position: 'relative',
      margin: 10,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.white,
    },
    backgroundStyle: {
      // bottom sheet background
      backgroundColor: 'transparent',
    },
    containerStyle: {
      // outside of the bottom sheet background
    },
    handleStyle: {
      // handle style
      backgroundColor: 'transparent',
      height: 40,
    },
    handleIndicatorStyle: {
      // handle indicator style
      backgroundColor: theme.lightGray,
      width: 50,
    },
  });
