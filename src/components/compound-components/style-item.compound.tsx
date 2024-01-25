import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const StyleItem = ({children, style, ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const ItemImage = ({children, style, image, isActive, ...props}) => {
  return (
    <Image
      source={image}
      style={[
        styles.image,
        style,
        isActive && {
          borderWidth: 3,
          borderRadius: 2,
          borderColor: '#FFC0FB',
        },
      ]}
      {...props}>
      {children}
    </Image>
  );
};

const Name = ({children, style, ...props}) => {
  return (
    <Text style={[styles.name, style]} {...props}>
      {children}
    </Text>
  );
};

const Price = ({children, style, ...props}) => {
  return (
    <View style={[styles.price, style]} {...props}>
      {children}
    </View>
  );
};

const PriceText = ({children, style, ...props}) => {
  return (
    <Text style={[styles.priceText, style]} {...props}>
      {children}
    </Text>
  );
};

const PriceIcon = ({children, style, icon, ...props}) => {
  return (
    <Image source={icon} style={[styles.priceIcon, style]} {...props}>
      {children}
    </Image>
  );
};

StyleItem.Image = ItemImage;
StyleItem.Name = Name;
StyleItem.Price = Price;
StyleItem.Price.Text = PriceText;
StyleItem.Price.Icon = PriceIcon;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 140,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 8,
    color: '#323232',
    textAlign: 'center',
    fontFamily: 'Galmuri11-Regular',
  },
  price: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  priceText: {
    color: '#323232',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Galmuri9-Regular',
  },
});

export default StyleItem;
