import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const context = React.createContext({});

export const Input = ({children, ...props}) => {
  const contextValue = {};
  return (
    <context.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </context.Provider>
  );
};

const Label = ({children, style}) => {
  return <Text style={[styles.label]}>{children}</Text>;
};

const TextFieldContainer = ({children, style, ...props}) => {
  return (
    <View style={[styles.TextFieldContainer, style]} {...props}>
      {children}
    </View>
  );
};

const Prefix = ({children, style, ...props}) => {
  return (
    <View style={[styles.prefix, style]} {...props}>
      {children}
    </View>
  );
};

const TextField = ({style, ...props}) => {
  return <TextInput style={[styles.textField, style]} {...props} />;
};

const Suffix = ({children, style, ...props}) => {
  return (
    <View style={[styles.suffix, style]} {...props}>
      {children}
    </View>
  );
};

const Message = ({children, style, ...props}) => {
  return (
    <Text style={[styles.message, style]} {...props}>
      {children}
    </Text>
  );
};

Input.Label = Label;
Input.TextFieldContainer = TextFieldContainer;
Input.Prefix = Prefix;
Input.TextField = TextField;
Input.Suffix = Suffix;
Input.Message = Message;

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    backgroundColor: '#F3F3F3',

    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontFamily: 'Galmuri11-Regular',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.16,
  },
  prefix: {
    marginRight: 10,
  },
  textField: {
    flex: 1,
    fontFamily: 'Galmuri11-Regular',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#2E2E2E',
    padding: 0,
  },
  suffix: {
    marginLeft: 10,
  },
  message: {
    fontFamily: 'Galmuri11-Regular',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: -0.13,
    color: '#F64A42',
    marginLeft: 16,
    marginTop: 2,
  },
});
