import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './text';
import {calculateDday} from 'src_toss/utils/common';

type DdayTextProps = {
  date: string;
};

const DdayText = ({date}: DdayTextProps) => {
  return (
    <View style={styles.container}>
      <Text.Common style={styles.text}>
        {`D${calculateDday(new Date(date))}`}
      </Text.Common>
    </View>
  );
};

export default DdayText;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: '#9f9f9f',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
});
