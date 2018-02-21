import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import TapWrongGridComponent from '../TapWrongGridComponent';

const window = Dimensions.get("window")

storiesOf('TapWrong', module)
  .add('with text', () => (
    <TapWrongGridComponent
      data={{
        word: ['D', 'O', 'G'],
        others:['R']
      }}
      style = {{
        width: window.width,
        height: window.height
      }}

      onScore={()=>{}}
      setProgress={()=>{}}
       onEnd={()=>{}}      
    />
  ));
