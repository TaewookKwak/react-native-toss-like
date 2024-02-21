import {
  FlatList,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {usePermissionLocation} from '~hooks/usePermission';
import {Input} from '@components/compound-components/input.component';
import DotButton from '@components/compound-components/button-dot.compound';
import Geolocation from '@react-native-community/geolocation';
import IconFontAweSome5 from 'react-native-vector-icons/FontAwesome5';
import Text from '@components/ui/text/text';

const Map = () => {
  const {hasPermission} = usePermissionLocation();
  const [latitude, setLatitude] = useState(36.3406); // 현재 위치 위도
  const [longitude, setLongitude] = useState(127.3503); // 현재 위치 경도
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색어
  const [searchResult, setSearchResult] = useState([]); // 검색 결과
  const [nextPageToken, setNextPageToken] = useState(''); // 다음 페이지 토큰

  async function searchPlaceNearby() {
    const googleApiUrl =
      'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const googleApiUrlNearby =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

    const distance = 2000; // 2km
    const location = `${latitude},${longitude}&radius=${distance}`;
    const url = `${googleApiUrl}?query=${searchKeyword.trim()}&location=${location}&key=${
      process.env.GOOGLE_MAP_API_KEY
    }`;
    const urlNearby = `${googleApiUrlNearby}?location=${location}&radius=${distance}&keyword=${searchKeyword.trim()}&key=${
      process.env.GOOGLE_MAP_API_KEY
    }`;

    try {
      const res = await fetch(urlNearby);
      const data = await res.json();
      setSearchResult(data.results);
      setNextPageToken(data.next_page_token);
    } catch (error) {
      console.error(error);
    }
  }

  function searchPlaceNextPage() {
    const googleApiUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const distance = 2000; // 2km
    const location = `${latitude},${longitude}&radius=${distance}`;
    const url = `${googleApiUrl}?location=${location}&radius=${distance}&keyword=${searchKeyword.trim()}&key=${'AIzaSyAXkty35QHx5mnl4YktmaKXmuZ44XjkH7g'}&pagetoken=${nextPageToken}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSearchResult([...searchResult, ...data.results]);
        setNextPageToken(data.next_page_token);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getMyLocation() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  useEffect(() => {
    getMyLocation();
    searchPlaceNearby();
  }, []);

  return (
    <View style={styles.container}>
      {/* {hasPermission ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
      ) : null} */}

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* 내 위치 불러오가 버튼*/}
        <TouchableOpacity
          onPress={() => {
            getMyLocation();
            searchPlaceNearby();
          }}>
          <IconFontAweSome5 name="location-arrow" size={20} color="#000" />
        </TouchableOpacity>
        {/* 제목 */}
        <Text.Common>위치</Text.Common>
        {/* 취소 버튼 */}
        <TouchableOpacity>
          <Text.Common>취소</Text.Common>
        </TouchableOpacity>
      </View>

      <Input>
        <Input.TextFieldContainer style={{}}>
          <Input.TextField
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            placeholder="위치를 입력하세요"
            autoCapitalize="sentences"
            autoComplete="address-line1"
          />
        </Input.TextFieldContainer>
      </Input>

      <DotButton style={{alignSelf: 'stretch'}} onPress={searchPlaceNearby}>
        <DotButton.ButtonText>검색</DotButton.ButtonText>
      </DotButton>

      {/* flatlist 검색결과 :  장소이름 + 주소 + 거리 / 더보기버튼 */}
      <View style={styles.searchResults}>
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.searchResultContainer}>
              <Text.Common style={styles.placeName}>{item.name}</Text.Common>
              <Text.Common style={styles.vicinity}>{item.vicinity}</Text.Common>
              <Text.Common style={styles.distance}>{item.distance}</Text.Common>
            </View>
          )}
          onEndReached={searchPlaceNextPage}
          onEndReachedThreshold={0.8}
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchResults: {
    flex: 1,
  },
  searchResultContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  placeName: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
    letterSpacing: -0.18,
    color: '#171717',
  },
  vicinity: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.14,
    color: '#171717',
  },
  distance: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -0.14,
    color: '#171717',
  },
});
