import UnderlineButton from '@components/compound-components/button-underlind.compound';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type HeaderProps = {
  title: string;
  isGoBack?: boolean;
};

const Header = ({title, isGoBack}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {isGoBack && navigation && (
        <View style={styles.goBackButton}>
          <UnderlineButton onPress={() => navigation.goBack()}>
            <UnderlineButton.ButtonText>뒤로</UnderlineButton.ButtonText>
          </UnderlineButton>
        </View>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    marginTop: 15,
    marginBottom: 7,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  goBackButton: {
    position: 'absolute',
    left: 16,
    bottom: 0,
  },

  headerText: {
    color: '#171717',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: -0.2,
  },
});
