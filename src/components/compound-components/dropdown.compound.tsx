/**
 * Compound Components
 * <Dropdown/> 이름/인기 정렬 드롭다운
 * <Dropdown.ToggleContainer/> 드롭다운 토글 컨테이너
 * <Dropdown.ToggleButton/> 드롭다운 토글 버튼
 * <Dropdown.Placeholder/> 드롭다운 플레이스홀더 (선택 안됐을 때 placeholder text / 선택하면 placeholder text 대신 선택한 데이터의 value가 들어감)
 * <Dropdown.Preffix/> 드롭다운 플레이스홀더 앞에 붙는 arrowdown/up 아이콘
 * <Dropdown.Suffix/> 드롭다운 플레이스홀더 뒤에 붙는 arrowdown/up 아이콘
 * <Dropdown.ListContainer/> 드롭다운 리스트 컨테이너
 * <Dropdown.ListItem/> 드롭다운 리스트 아이템 (value, id)
 */

import React, {createContext, useContext, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

// Context를 통해 컴포넌트 내부에서 전역 변수 공유
const dropdownContext = createContext({});

export const Dropdown = ({children, onSelect, style, ...props}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleSelect = data => {
    setSelectedData(data);
    setIsActive(false);
    onSelect(data);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const contextValue = {
    isActive,
    setIsActive,
    selectedData,
    setSelectedData,
    handleSelect,
    handleToggle,
  };

  return (
    <dropdownContext.Provider value={contextValue}>
      <View style={[styles.dropdown, style]} {...props}>
        {children}
      </View>
    </dropdownContext.Provider>
  );
};

const ToggleContainer = ({children, style, ...props}) => {
  return (
    <View style={[styles.toggleContainer, style]} {...props}>
      {children}
    </View>
  );
};

const ToggleButton = ({children, style, ...props}) => {
  const {handleToggle} = useContext(dropdownContext);
  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[styles.toggleButton, style]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const Placeholder = ({children, placeholder, style, ...props}) => {
  const {selectedData} = useContext(dropdownContext);
  return (
    <View style={[styles.placeholderContainer, style]} {...props}>
      <Text style={styles.placeholder}>
        {selectedData ? selectedData.value : placeholder}
      </Text>
    </View>
  );
};

const Prefix = ({children, arrowdown, arrowup, style, ...props}) => {
  const {isActive} = useContext(dropdownContext);
  return (
    <View style={[styles.prefixContainer, style]} {...props}>
      {isActive ? arrowup : arrowdown}
    </View>
  );
};

const Suffix = ({children, arrowdown, arrowup, style, ...props}) => {
  const {isActive} = useContext(dropdownContext);
  return (
    <View style={[styles.suffixContainer, style]} {...props}>
      {isActive ? arrowup : arrowdown}
    </View>
  );
};

const ListContainer = ({children, style, data, ...props}) => {
  const {isActive} = useContext(dropdownContext);

  return isActive ? (
    <View style={[styles.listContainer, style]} {...props}>
      <ScrollView>{children}</ScrollView>
    </View>
  ) : null;
};

const ListItem = ({children, value, id, style, ...props}) => {
  const {handleSelect} = useContext(dropdownContext);
  return (
    <TouchableOpacity
      onPress={() => handleSelect({value, id})}
      style={[styles.listItem, style]}
      {...props}>
      {children ? children : <Text>{value}</Text>}
    </TouchableOpacity>
  );
};

// 여기에 컴포넌트에 대한 스타일을 정의합니다.
const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
    flex: 1,
  },
  toggleContainer: {
    borderWidth: 1.5,
    borderColor: '#323232',
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '400',
    color: '#323232',
    textAlign: 'center',
  },
  prefixContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderRightColor: '#323232',
    height: '100%',
    padding: 0,
    paddingLeft: 14,
    paddingRight: 12,
  },
  suffixContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: '#323232',
    height: '100%',
  },
  listContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: '110%',
    left: 0,
    borderWidth: 1.5,
    borderColor: '#323232',
    maxHeight: 100,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 12,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

// 해당 컴포넌트와 스타일을 연결
Dropdown.ToggleContainer = ToggleContainer;
Dropdown.ToggleButton = ToggleButton;
Dropdown.ListContainer = ListContainer;
Dropdown.ListItem = ListItem;
Dropdown.Placeholder = Placeholder;
Dropdown.Suffix = Suffix;
Dropdown.Prefix = Prefix;
