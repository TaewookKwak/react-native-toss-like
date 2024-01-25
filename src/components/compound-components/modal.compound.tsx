import React, {useState, useContext, createContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ModalContext = createContext();

const Modal = ({children, isOpen, setIsOpen}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <ModalContext.Provider value={{isOpen, handleOpen, handleClose}}>
      {isBrowser && isOpen ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#000',
              backgroundColor: '#fff',
              borderRadius: 8,
              minHeight: 100,
              minWidth: 200,
              flexDirection: 'column',
            }}>
            {children}
          </View>
        </View>
      ) : null}
    </ModalContext.Provider>
  );
};

const Header = ({children}) => {
  const {handleClose} = useContext(ModalContext);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
        fontSize: 18,
        color: '#000',
      }}>
      {children}
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 15,
          top: 15,
          color: '#fff',
        }}
        onPress={handleClose}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const Body = ({children}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        color: '#000',
        padding: 12,
        flex: 1,
      }}>
      {children}
    </View>
  );
};

const Footer = ({children}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderTopWidth: 1,
        borderTopColor: '#000',
        flexDirection: 'row',
        gap: 4,
      }}>
      {children}
    </View>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
