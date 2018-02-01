import React,{ Component } from 'react';
import { Text, View, Modal } from 'react-native';
import  Button  from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={styles.containerStyle1}>
          <Text style={textStyle}>
            {children}
          </Text>
        </View>

        <View style={styles.containerStyle1}>
          <Button onPress={onAccept}>Resume</Button>
          <Button onPress={onDecline}>exit</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    marginTop: 10
  },
  textStyle: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 60
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    marginTop: '60%'
  },
  containerStyle1: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
  }
};

export default Confirm ;
