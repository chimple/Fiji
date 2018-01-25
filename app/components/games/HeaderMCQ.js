// Import Libraries for making component
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

// Make the component
const HeaderMCQ = (props) => {
  const { viewStyle, leftStyle, centerStyle, rightStyle } = styles;


  
  return (
    <View style={viewStyle}>
      
        <Icon name={props.lefticon} color='#fff' iconStyle={leftStyle} />
      
        <Icon name={props.centericon} color='#fff' iconStyle={centerStyle} />
      
        <Icon name={props.righticon} color='#fff' size={24} iconStyle={rightStyle} />
      
    </View>
  );
};


const styles = {
  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    backgroundColor: '#483d8b',
    height: 80,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,  
    justifyContent: 'space-between',  
    flexDirection: 'row',
    position: 'relative'
  },
  leftStyle: {
    alignSelf: 'flex-start'
  },
  rightStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
};
// Make the component available to other parts of the App
export default HeaderMCQ ;
