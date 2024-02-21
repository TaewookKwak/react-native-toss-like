import {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import Permissions, {PERMISSIONS} from 'react-native-permissions';

export const usePermissionCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // 권한 설정으로 이동하는 알림창
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
    // 안드로이드 버전이 10 이상인 경우
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]); // 이미지, 비디오 권한 확인

      // 이미지, 비디오 권한이 모두 허용되어 있는 경우
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
      ]); // 이미지, 비디오 권한 요청

      // 이미지, 비디오 권한이 모두 허용되어 있는 경우
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }

      // 이미지, 비디오 권한이 하나라도 거부된 경우
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions(); // 이미지, 비디오 권한 다시 확인
      }

      // 이미지, 비디오 권한이 하나라도 차단된 경우
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        }); // 이미지, 비디오 권한 설정으로 이동
      }
    }

    // 안드로이드 버전이 10 미만인 경우
    else {
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ); // 외부 저장소 권한 확인
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      } // 외부 저장소 권한이 허용되어 있는 경우

      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ); // 외부 저장소 권한 요청

      // 외부 저장소 권한이 허용되어 있는 경우
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }

      // 외부 저장소 권한이 거부된 경우
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }

      // 외부 저장소 권한이 차단된 경우
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);

  const checkPermission = useCallback(async () => {
    // iOS인 경우
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY); // 사진 라이브러리 권한 확인

      // 사진 라이브러리 권한이 허용되어 있는 경우
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }

      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY); // 사진 라이브러리 권한 요청

      // 사진 라이브러리 권한이 허용되어 있는 경우
      if (
        res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
      }

      // 사진 라이브러리 권한이 거부된 경우
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }

    // 안드로이드인 경우
    else if (Platform.OS === 'android') {
      checkAndroidPermissions(); // 안드로이드 권한 확인
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {hasPermission};
};
