import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import Text from '~components/ui/text/text';

const {width: screenWidth} = Dimensions.get('window');

const BenefitsPage = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const selectPhoto = (uri: string) => {
    if (selectedPhotos.includes(uri)) {
      setSelectedPhotos(selectedPhotos.filter(photoUri => photoUri !== uri));
    } else {
      setSelectedPhotos([...selectedPhotos, uri]);
    }
  };

  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });
    setPhotos(res?.edges);
  }, []);

  const openSettingsAlert = useCallback(({title}: {title: string}) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Open Settings',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  }, []);
  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        });
      }
    } else {
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);

  const checkPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
    }
  }, [hasPermission, fetchPhotos]);
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
                  onPress={() => selectPhoto(item?.node?.image?.uri)}
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

const PhotoSlider = ({photos, selectedPhotos, screenWidth}) => {
  const renderItem = ({item}) => {
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
        source={{uri: photos[0].node.image.uri}}
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
