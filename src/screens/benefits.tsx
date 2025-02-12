import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from 'src/components/ui/text/text';
import {usePermissionCamera} from 'src/hooks/usePermission';

const {width: screenWidth} = Dimensions.get('window');

const BenefitsPage = () => {
  const {hasPermission} = usePermissionCamera(); // 카메라 권한 확인하기
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]); // 기기 내 사진 데이터
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // 선택한 사진 데이터

  //  선택한 사진 데이터 추가/제거하기
  const handleSelectPhoto = (uri: string) => {
    if (selectedPhotos.includes(uri)) {
      setSelectedPhotos(selectedPhotos.filter(photoUri => photoUri !== uri)); // 선택한 사진 데이터에서 uri 를 제외한 나머지 데이터만 남기기
    } else {
      setSelectedPhotos([...selectedPhotos, uri]); // 선택한 사진 데이터에 uri 추가하기
    }
  };

  // 기기 내 사진 데이터 가져오기
  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
      groupTypes: 'Album',
      // groupName: '가족사진',
      // Include fileSize only for android since it's causing performance issues on IOS.
      ...(Platform.OS === 'android' && {include: ['fileSize', 'filename']}),
    });

    setPhotos(res?.edges);
  }, []);

  // 기기 내 그룹 앨범명 가져오기
  const fetchAlbums = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      groupName: '가족사진',
      groupTypes: 'Album',
    });
  }, []);

  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
      fetchAlbums();
    }
  }, [hasPermission, fetchPhotos, fetchAlbums]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text.Common
        style={{
          fontSize: 22,
          textAlign: 'center',
          fontWeight: '600',
          padding: 24,
        }}>
        {`Permission: ${hasPermission ? 'Granted ✅' : 'Denied ❌'}`}
      </Text.Common>

      <TouchableOpacity
        onPress={() => {
          // alert 로 선택된 사진 데이터 보여주기
          Alert.alert('선택한 사진들', selectedPhotos.join('\n'));
        }}>
        <Text.Common
          style={{
            fontSize: 20,
            fontWeight: '600',
            padding: 24,
          }}>
          {selectedPhotos.length > 0
            ? `선택한 사진들 (${selectedPhotos.length})`
            : '사진 선택하기'}
        </Text.Common>
      </TouchableOpacity>

      <View style={{width: screenWidth, height: screenWidth}}>
        <PhotoSlider
          photos={photos}
          selectedPhotos={selectedPhotos}
          screenWidth={screenWidth}
        />
      </View>

      <View style={[styles.album]}>
        <TouchableOpacity style={[styles.albumButton]}>
          <Text.Common
            style={{
              fontSize: 20,
              fontWeight: '600',
              padding: 24,
            }}>
            기기 내 앨범명 ⌵
          </Text.Common>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.photos}>
            {photos?.map(item => {
              const isSelected = selectedPhotos.includes(
                item?.node?.image?.uri,
              );
              const photoIndex =
                selectedPhotos.indexOf(item?.node?.image?.uri) + 1;
              return (
                <TouchableOpacity
                  key={item?.node?.image?.uri}
                  onPress={() => {
                    handleSelectPhoto(item?.node?.image?.uri);
                  }}
                  style={styles.photoContainer}>
                  <Image
                    style={[
                      {
                        height: screenWidth / 3 - 10,
                        width: screenWidth / 3 - 10,
                      },
                      isSelected ? {opacity: 0.5} : {},
                    ]}
                    source={{uri: item?.node?.image?.uri}}
                  />
                  {isSelected && (
                    <View style={styles.selectedOverlay}>
                      <Text.Common style={styles.checkmark}>⎷</Text.Common>
                      <Text.Common style={styles.photoIndex}>
                        {photoIndex}
                      </Text.Common>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const PhotoSlider = ({
  photos,
  selectedPhotos,
  screenWidth,
}: {
  photos: PhotoIdentifier[];
  selectedPhotos: string[];
  screenWidth: number;
}) => {
  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={{width: screenWidth, height: screenWidth}}>
        <Image
          source={{uri: item}}
          style={{height: screenWidth, width: screenWidth}}
        />
      </View>
    );
  };

  const emptyComponent = () => (
    <View
      style={{width: screenWidth, height: screenWidth, backgroundColor: 'grey'}}
    />
  );

  // 선택된 사진이 있으면 선택된 사진들을 보여주고,
  if (selectedPhotos.length) {
    return (
      <FlatList
        data={selectedPhotos}
        renderItem={renderItem}
        horizontal
        keyExtractor={item => item}
        ListEmptyComponent={emptyComponent}
      />
    );
  }
  // 없으면 첫번째 사진을 보여주고,
  else if (photos.length > 0) {
    return (
      <Image
        source={{uri: photos?.[0]?.node?.image?.uri}}
        style={{height: screenWidth, width: screenWidth}}
      />
    );
  }
  // 사진이 없으면 회색 배경 보여주기
  else {
    return emptyComponent();
  }
};

export default BenefitsPage;

const styles = StyleSheet.create({
  album: {
    flex: 1,
    justifyContent: 'center',
  },
  albumButton: {},
  photos: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',

    gap: 5,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  checkmark: {
    color: 'white',
    fontSize: 30,
  },
  photoIndex: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: 'white',
    fontSize: 20,
  },
});
