import React, {useState, useRef, useEffect} from 'react';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import {View, PanResponder, Animated, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';

const SOFA_IMAGE = require('@assets/sofa.png');
const STAND_IMAGE = require('@assets/stand.png');
const TABLE_IMAGE = require('@assets/table.png');
const WINDOW_IMAGE = require('@assets/window.png');
const THING_IMAGE = require('@assets/thing.png');
const PLANT_IMAGE = require('@assets/plant.png');
const BACKGROUND = require('@assets/background1.png');
const CHARATOR = require('@assets/charator.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ITEM_WIDTH = 100; // 아이템의 가로 크기
const ITEM_HEIGHT = 100; // 아이템의 세로 크기

const Drawer = ({}: any) => {
  const [homeHeight, setHomeHeight] = useState(0);
  // 가구 리스트
  const [furniture, setFurniture] = useState([
    {id: '1', x: 0, y: 0, image: SOFA_IMAGE},
    {id: '2', x: 0, y: 0, image: STAND_IMAGE},
    {id: '3', x: 0, y: 0, image: TABLE_IMAGE},
    {id: '4', x: 0, y: 0, image: WINDOW_IMAGE},
    {id: '5', x: 0, y: 0, image: THING_IMAGE},
    {id: '6', x: 0, y: 0, image: PLANT_IMAGE},
  ]);

  console.log(furniture);

  // 포커스된 가구
  const [focusedFurniture, setFocusedFurniture] = useState(null);

  // 선택된 가구
  const [selectedFurniture, setSelectedFurniture] = useState([]);

  // 각 아이템에 대한 Animated.ValueXY 인스턴스를 생성합니다.
  const positions = selectedFurniture.map(
    item => new Animated.ValueXY({x: item.x, y: item.y}),
  );

  // gestureState
  // stateID: 제스처 상태의 ID (화면에 하나 이상의 터치가 있는 한 지속됨)
  // moveX, moveY: 최근 이동한 터치의 최신 화면 좌표 (View의 중심이 아니라 터치한 좌표)
  // x0, y0: 응답자 부여의 화면 좌표
  // dx, dy: 터치가 시작된 이후 제스처의 누적거리
  // vx, by: 제스처의 현재 속도
  // numberActiveTouches: 현재 화면의 터치 수

  // 각 아이템에 대한 PanResponder를 생성합니다.
  const panResponders = selectedFurniture.map((item, index) => {
    return PanResponder.create({
      // 제스처가 시작될 때 호출됩니다.
      onStartShouldSetPanResponder: () => {
        return true;
      },
      // 제스처가 시작될 때 호출됩니다.
      onStartShouldSetPanResponderCapture: (evt, gesture) => {
        positions[index].setOffset({
          x: positions[index].x._value,
          y: positions[index].y._value,
        }); // 이전의 위치를 offset으로 설정합니다.
        positions[index].setValue({x: 0, y: 0});
        // 이동 거리가 5px 이하일 때는 터치를 무시합니다.

        if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
          return false;
        }

        return true;
      },

      onPanResponderMove: (event, gesture) => {
        let newX = positions[index].x._offset + gesture.dx; // 이전의 위치에 gesture의 변화량을 더합니다.
        let newY = positions[index].y._offset + gesture.dy; // 이전의 위치에 gesture의 변화량을 더합니다.

        if (newX < 0) {
          newX = 0;
        } // 화면의 왼쪽을 벗어나지 않도록 합니다.
        if (newY < 0) {
          newY = 0;
        } // 화면의 위쪽을 벗어나지 않도록 합니다.
        if (newX > screenWidth - ITEM_WIDTH) {
          newX = screenWidth - ITEM_WIDTH;
        } // 화면의 오른쪽을 벗어나지 않도록 합니다.
        if (newY > homeHeight - ITEM_HEIGHT) {
          newY = homeHeight - ITEM_HEIGHT;
        } // 화면의 아래쪽을 벗어나지 않도록 합니다.

        positions[index].x.setValue(newX - positions[index].x._offset);
        positions[index].y.setValue(newY - positions[index].y._offset);
      },
      onPanResponderRelease: () => {
        setSelectedFurniture(prevFurniture => {
          const newFurniture = [...prevFurniture];
          newFurniture[index].x = positions[index].x._value;
          newFurniture[index].y = positions[index].y._value;
          return newFurniture;
        }); // furniture 에 저장된 아이템의 위치를 업데이트 합니다.

        setFocusedFurniture(item.id); // 포커스된 가구를 업데이트 합니다.

        positions[index].flattenOffset(); // offset을 초기화합니다.
      },
    });
  });

  const onLayout = e => {
    console.log(e.nativeEvent.layout);
    setHomeHeight(e.nativeEvent.layout.height);
  };

  // furniture의 상태를 저장하고 불러오는 함수를 만듭니다.
  const saveState = async () => {
    console.log(selectedFurniture);

    await AsyncStorage.setItem('furniture', JSON.stringify(selectedFurniture));
  };

  // furniture의 상태를 불러오는 함수를 만듭니다.
  const loadState = async () => {
    const savedFurniture = await AsyncStorage.getItem('furniture');
    if (savedFurniture) {
      setSelectedFurniture(JSON.parse(savedFurniture));
    }
  };

  // 컴포넌트가 마운트 될 때, loadState 함수를 실행합니다.
  useEffect(() => {
    loadState();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          position: 'relative',
          flex: 1,
        }}>
        <View style={{flex: 10}} onLayout={onLayout}>
          <Image
            source={BACKGROUND}
            resizeMode="stretch"
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'pink',
            }}
          />
        </View>

        <View
          pointerEvents="none" // 터치를 불가능하게 만들어서, 가구와 겹칠 때 가구가 클릭 되도록 합니다.
          style={{
            position: 'absolute',
            bottom: homeHeight / 2 - ITEM_HEIGHT / 2,
            zIndex: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={CHARATOR} />
        </View>

        <View
          style={{
            flex: 2,
          }}>
          <TouchableOpacity
            onPress={saveState}
            style={{
              width: 'auto',
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              위치 저장
            </Text>
          </TouchableOpacity>
        </View>

        {selectedFurniture.map((item, index) => {
          return (
            <Animated.View
              {...panResponders[index].panHandlers}
              style={[
                // positions[index].getLayout(),
                {
                  position: 'absolute',
                  borderColor: 'lightgrey',
                  borderWidth: 3,
                  borderStyle: 'dashed',
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                },
                {
                  transform: [
                    {translateX: positions[index].x},
                    {translateY: positions[index].y},
                  ],
                },
              ]}
              key={item.id}>
              <Image
                source={item.image}
                style={{
                  width: 'auto',
                  height: '100%',
                }}
              />

              <Pressable
                onPress={() => {
                  console.log('delete');

                  setSelectedFurniture(prevFurniture => {
                    return prevFurniture.filter(
                      selectedItem => selectedItem.id !== item.id,
                    );
                  });
                }}
                style={{
                  display: focusedFurniture === item.id ? 'flex' : 'none',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 20,
                  height: 20,

                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  X
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 20,
          padding: 20,
        }}>
        {furniture.map(item => {
          const isAlreadySelected = selectedFurniture.some(
            selectedItem => selectedItem.id === item.id,
          );
          return (
            <TouchableOpacity
              onPress={() => {
                if (isAlreadySelected) {
                  // 이미 선택된 가구는 선택 하고 지워 버립니다
                  setSelectedFurniture(prevFurniture => {
                    return prevFurniture.filter(
                      selectedItem => selectedItem.id !== item.id,
                    );
                  });
                } else {
                  setSelectedFurniture(prevFurniture => {
                    return [...prevFurniture, item];
                  });
                }
              }}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                backgroundColor: isAlreadySelected ? 'pink' : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 1,
              }}
              key={item.id}>
              <Image
                source={item.image}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Drawer;
