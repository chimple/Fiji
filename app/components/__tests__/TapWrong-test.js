import 'react-native';
import React from 'react';
import { Dimensions } from 'react-native'
import TapWrongGridcomponent from '../games/TapWrongGridComponent';
//import { titles } from '../../../config/jest/mockData'
import renderer from 'react-test-renderer';
import { View, Animatable } from 'react-native-animatable';
const window = Dimensions.get("window")
it('renders correctly', () => {
  const todo = {id:1, view:true};
    const tree = renderer.create(
      <TapWrongGridcomponent 
      data={{
          word:['D','O','G'],
          others:['X']
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
      onScore={()=>{}}
      setProgress={()=>{}}
       onEnd={()=>{}}     
      
      />
      
      
    ).getInstance()
   
    tree.onButtonPress(1)
  
    expect(tree).toMatchSnapshot()
  })
  